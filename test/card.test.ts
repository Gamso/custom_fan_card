import { afterEach, describe, expect, it } from "vitest";
import { $, $$, entity, makeHass, mountCard } from "./helpers";

const FAN = "fan.ceiling_fan_with_light";

function windcalm(state = "on", attributes: Record<string, unknown> = {}) {
  return entity(FAN, state, {
    friendly_name: "Windcalm",
    percentage: 50,
    percentage_step: 100 / 6,
    supported_features: 1 | 4 | 16 | 32,
    direction: "forward",
    ...attributes,
  });
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("custom-fan-card render", () => {
  it("renders six speed segments for a 6-speed fan", async () => {
    const el = await mountCard({ fan_entity: FAN }, makeHass([windcalm()]));
    expect($$(el, ".speed-seg")).toHaveLength(6);
    expect($(el, ".speed-seg.active")?.textContent?.trim()).toBe("3");
    expect($(el, ".fan-state")?.textContent?.trim()).toBe("Speed 3 — Moderate");
    expect($(el, ".fan-pct")?.textContent?.trim()).toBe("50%");
  });

  it("sends the 6-speed percentage when a segment is clicked", async () => {
    const hass = makeHass([windcalm()]);
    const el = await mountCard({ fan_entity: FAN }, hass);
    $$(el, ".speed-seg")[3].click();
    expect(hass.callService).toHaveBeenCalledWith("fan", "set_percentage", {
      entity_id: FAN,
      percentage: 67,
    });
  });
});
