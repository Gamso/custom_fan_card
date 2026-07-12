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

export const SPEED_COUNT = 6;

export function percentageToSpeed(pct: number | null | undefined): number {
  if (!pct || pct <= 0) return 0;
  return Math.min(SPEED_COUNT, Math.max(1, Math.round(pct / (100 / SPEED_COUNT))));
}

export function speedToPercentage(speed: number): number {
  if (speed <= 0) return 0;
  return Math.round((speed / SPEED_COUNT) * 100);
}

// FanEntityFeature.DIRECTION = 4
export function fanSupportsDirection(fanState: any): boolean {
  const features = Number(fanState?.attributes?.supported_features ?? 0);
  return (features & 4) !== 0;
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
  hass: any,
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
