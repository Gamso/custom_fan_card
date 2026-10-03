import type { HassEntity, HomeAssistant } from "./ha-types";

export interface CustomFanCardConfig {
  name?: string;
  show_name?: boolean;
  fan_entity: string;
  // Which physical rotation direction ("forward"/"reverse", as reported by the
  // fan entity) corresponds to summer mode. Not every fan spins counter-clockwise
  // for summer, so this lets the user match the card's Été/Hiver buttons to the
  // fan's actual rotation. Defaults to "forward".
  summer_direction?: "forward" | "reverse";
  // Optional overrides — auto-discovered from fan_entity base name when omitted.
  light_entity?: string;
  timer_entity?: string;
  sound_entity?: string;
}

export type EntityRole = "light" | "timer" | "sound";

export const ENTITY_ROLES: readonly EntityRole[] = ["light", "timer", "sound"];

export interface ResolvedEntities {
  fan: string;
  light?: string;
  timer?: string;
  sound?: string;
  // Roles for which auto-discovery found several equally good candidates and
  // therefore picked none; the editor lists them so the user can choose.
  ambiguous: Partial<Record<EntityRole, string[]>>;
}

export const TIMER_OPTIONS_MIN = [0, 15, 30, 60, 120, 240, 480] as const;

// Speed count used when the fan does not report a usable percentage_step
// (and the count the named speed labels were written for).
export const DEFAULT_SPEED_COUNT = 6;

// Above this many steps the fan is effectively continuous (HA defaults
// speed_count to 100): a segmented bar would be unusable, so the card falls
// back to DEFAULT_SPEED_COUNT segments, which still map to valid percentages.
export const MAX_SPEED_SEGMENTS = 10;

/**
 * Number of discrete speeds of a fan, derived from the `percentage_step`
 * attribute HA publishes (100 / speed_count).
 */
export function speedCount(fanState: HassEntity | undefined): number {
  const step = Number(fanState?.attributes?.percentage_step);
  if (!Number.isFinite(step) || step <= 0) return DEFAULT_SPEED_COUNT;
  const count = Math.round(100 / step);
  return count >= 1 && count <= MAX_SPEED_SEGMENTS ? count : DEFAULT_SPEED_COUNT;
}

export function percentageToSpeed(
  pct: number | null | undefined,
  count: number = DEFAULT_SPEED_COUNT,
): number {
  if (!pct || pct <= 0) return 0;
  return Math.min(count, Math.max(1, Math.round(pct / (100 / count))));
}

/** Percentage shown to the user for a speed (17 / 33 / 50 / 67 / 83 / 100 on 6 speeds). */
export function speedToPercentage(speed: number, count: number = DEFAULT_SPEED_COUNT): number {
  if (speed <= 0) return 0;
  return Math.round((speed / count) * 100);
}

/**
 * Percentage sent to fan.set_percentage for a speed. Rounded down, like the HA
 * frontend and HA's own ordered-list helper (upper bound of each speed is
 * floor(n * 100 / count)): 67 % on a 3-speed fan would otherwise be read as
 * speed 3 by integrations that bucket with ceil or ordered lists.
 */
export function speedToCommandPercentage(
  speed: number,
  count: number = DEFAULT_SPEED_COUNT,
): number {
  if (speed <= 0) return 0;
  return Math.min(100, Math.floor((speed * 100) / count));
}

// States in which the fan must not be treated as running: "unknown" (e.g.
// right after a restart, or a template fan whose source is missing) is as
// little "on" as "off" is.
export const OFF_LIKE_STATES: ReadonlySet<string> = new Set(["off", "unavailable", "unknown"]);

// States in which the fan cannot be controlled at all.
export const UNAVAILABLE_STATES: ReadonlySet<string> = new Set(["unavailable", "unknown"]);

export function isFanOn(fanState: HassEntity | undefined): fanState is HassEntity {
  return fanState !== undefined && !OFF_LIKE_STATES.has(fanState.state);
}

export function isFanUnavailable(fanState: HassEntity | undefined): boolean {
  return fanState !== undefined && UNAVAILABLE_STATES.has(fanState.state);
}

// homeassistant/components/fan/const.py — class FanEntityFeature(IntFlag).
export const FanFeature = {
  SET_SPEED: 1,
  OSCILLATE: 2,
  DIRECTION: 4,
  PRESET_MODE: 8,
  TURN_OFF: 16,
  TURN_ON: 32,
} as const;

export function fanSupports(fanState: HassEntity | undefined, feature: number): boolean {
  const features = Number(fanState?.attributes?.supported_features ?? 0);
  return (features & feature) !== 0;
}

export function fanSupportsDirection(fanState: HassEntity | undefined): boolean {
  return fanSupports(fanState, FanFeature.DIRECTION);
}

/**
 * Extract the base object_id from a fan entity (e.g. "fan.ceiling_fan_with_light"
 * → "ceiling_fan_with_light").
 */
export function fanBaseName(fanEntity: string | undefined): string | null {
  if (!fanEntity) return null;
  const dot = fanEntity.indexOf(".");
  return dot >= 0 ? fanEntity.slice(dot + 1) : fanEntity;
}

// Domains searched for each role, in order. "number" covers fans (e.g. CREATE
// Windcalm) whose timer is a free-form number entity; "select" covers fans
// (e.g. Klassfan) that expose the stop timer as a select with fixed options.
const ROLE_DOMAINS: Record<EntityRole, readonly string[]> = {
  light: ["light"],
  timer: ["number", "select"],
  sound: ["switch"],
};

// Object-id suffixes (after "<fan base>_") that identify each role, in the
// languages the target integrations name their entities in.
export const ROLE_SUFFIXES: Record<EntityRole, readonly string[]> = {
  light: ["light", "lumiere", "lamp", "lampe"],
  timer: ["timer", "minuteur", "countdown", "stop_timer", "off_timer", "sleep_timer"],
  sound: ["sound", "son", "beep", "bip", "buzzer", "tone"],
};

// Suffixes of other features of the same device: never picked for a role just
// because they are the only remaining candidate (e.g. an oscillation switch
// must not become the "beep" switch).
const FOREIGN_SUFFIXES: readonly string[] = [
  "oscillation",
  "oscillate",
  "swing",
  "power",
  "child_lock",
  "led",
  "display",
  "indicator",
  "direction",
];

// A switch named exactly like the fan is its power switch, not the beep.
const EXACT_MATCH_ROLES: ReadonlySet<EntityRole> = new Set<EntityRole>(["light", "timer"]);

function objectId(entityId: string): string {
  return entityId.slice(entityId.indexOf(".") + 1);
}

function suffixMatches(suffix: string, known: readonly string[]): boolean {
  return known.some((k) => suffix === k || suffix.endsWith(`_${k}`));
}

type RoleResult = { id?: string; ambiguous?: string[] };

function discoverRole(
  ids: readonly string[],
  base: string,
  otherFanBases: readonly string[],
  role: EntityRole,
): RoleResult {
  const prefix = `${base}_`;
  // Entities of another fan whose name extends ours (fan.ceiling_fan_2 vs
  // fan.ceiling_fan) belong to that fan, not to this one.
  const ownedByOtherFan = (oid: string) =>
    otherFanBases.some((b) => b.startsWith(prefix) && (oid === b || oid.startsWith(`${b}_`)));
  const otherRoleSuffixes = ENTITY_ROLES.filter((r) => r !== role).flatMap(
    (r) => ROLE_SUFFIXES[r],
  );

  for (const domain of ROLE_DOMAINS[role]) {
    const exact = `${domain}.${base}`;
    if (EXACT_MATCH_ROLES.has(role) && ids.includes(exact)) return { id: exact };

    const candidates = ids.filter((id) => {
      if (!id.startsWith(`${domain}.`)) return false;
      const oid = objectId(id);
      return oid.startsWith(prefix) && !ownedByOtherFan(oid);
    });
    if (candidates.length === 0) continue;

    const suffixOf = (id: string) => objectId(id).slice(prefix.length);
    const known = candidates.filter((id) => suffixMatches(suffixOf(id), ROLE_SUFFIXES[role]));
    if (known.length === 1) return { id: known[0] };
    if (known.length > 1) return { ambiguous: known };

    // No known suffix: accept a single unrecognised candidate (keeps
    // discovery working for suffixes in other languages), but never one that
    // names another feature or another role.
    const rest = candidates.filter(
      (id) =>
        !suffixMatches(suffixOf(id), FOREIGN_SUFFIXES) &&
        !suffixMatches(suffixOf(id), otherRoleSuffixes),
    );
    if (rest.length === 1) return { id: rest[0] };
    if (rest.length > 1) return { ambiguous: rest };
  }
  return {};
}

/**
 * Resolve the related light / timer / sound entities for a given fan.
 *
 * Explicit config overrides always win. Otherwise, per role and domain:
 * 1. an entity named exactly like the fan (light, timer only);
 * 2. among entities named "<fan base>_…" (excluding those of another fan
 *    whose name extends this one), the single one with a known suffix;
 * 3. failing that, the single remaining candidate that does not name
 *    another feature.
 * Several equally good candidates → nothing is picked and the candidates are
 * reported in `ambiguous`, so a wrong entity is never controlled silently.
 */
export function resolveEntities(
  hass: HomeAssistant | undefined,
  config: CustomFanCardConfig,
): ResolvedEntities {
  const base = fanBaseName(config.fan_entity);
  const ids = Object.keys(hass?.states ?? {});
  const otherFanBases = ids
    .filter((id) => id.startsWith("fan.") && id !== config.fan_entity)
    .map(objectId);

  const resolved: ResolvedEntities = { fan: config.fan_entity, ambiguous: {} };
  const overrides: Record<EntityRole, string | undefined> = {
    light: config.light_entity,
    timer: config.timer_entity,
    sound: config.sound_entity,
  };
  for (const role of ENTITY_ROLES) {
    if (overrides[role]) {
      resolved[role] = overrides[role];
      continue;
    }
    if (!base) continue;
    const { id, ambiguous } = discoverRole(ids, base, otherFanBases, role);
    if (id) resolved[role] = id;
    if (ambiguous) resolved.ambiguous[role] = ambiguous;
  }
  return resolved;
}
