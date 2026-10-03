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

export interface ResolvedEntities {
  fan: string;
  light?: string;
  timer?: string;
  sound?: string;
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

/**
 * Resolve the related light / timer / sound entities for a given fan.
 *
 * Explicit config overrides always win. Otherwise we look for entities in the
 * matching domain whose object_id starts with the fan's base name — this is
 * robust to language-specific suffixes (e.g. "_minuteur", "_son", "_timer").
 */
export function resolveEntities(
  hass: HomeAssistant | undefined,
  config: CustomFanCardConfig,
): ResolvedEntities {
  const base = fanBaseName(config.fan_entity);
  const states: Record<string, unknown> = hass?.states ?? {};

  const findInDomain = (domain: string): string | undefined => {
    if (!base) return undefined;
    const prefix = `${domain}.${base}`;
    // Exact match first, then any entity in the domain sharing the base name.
    if (states[prefix]) return prefix;
    return Object.keys(states).find((id) => id.startsWith(prefix));
  };

  return {
    fan: config.fan_entity,
    light: config.light_entity || findInDomain("light"),
    // "number" covers fans (e.g. CREATE Windcalm) whose timer is a free-form
    // number entity; "select" covers fans (e.g. Klassfan) that expose the
    // stop timer as a select with a predefined list.
    timer: config.timer_entity || findInDomain("number") || findInDomain("select"),
    sound: config.sound_entity || findInDomain("switch"),
  };
}
