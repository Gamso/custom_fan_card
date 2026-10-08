import { afterEach, describe, expect, it, vi } from "vitest";
import { $, entity, makeHass, mountCard } from "./helpers";

const FAN = "fan.f";
const fan = (attributes: Record<string, unknown> = {}) =>
  entity(FAN, "on", {
    supported_features: 1 | 8 | 16 | 32,
    percentage: 50,
    preset_modes: ["normal", "sleep"],
    preset_mode: "normal",
    ...attributes,
  });

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

const selected = (select: HTMLSelectElement) =>
  Array.from(select.options).filter((o) => o.selected).map((o) => o.value);

describe("selects (audit B5)", () => {
  it("selects the timer value on the first render", async () => {
    const el = await mountCard(
      { fan_entity: FAN },
      makeHass([fan(), entity("number.f_minuteur", "120.0")]),
    );
    const select = $(el, ".ctrl-select") as HTMLSelectElement;
    expect(select.value).toBe("120");
    expect(selected(select)).toEqual(["120"]);
  });

  it("shows a timer value outside the presets instead of 'None'", async () => {
    const el = await mountCard(
      { fan_entity: FAN },
      makeHass([fan(), entity("number.f_minuteur", "45")]),
    );
    const select = $(el, ".ctrl-select") as HTMLSelectElement;
    expect(select.value).toBe("45");
    expect(select.selectedOptions[0].textContent?.trim()).toBe("45 min");
    expect(Array.from(select.options).map((o) => o.value)).toEqual([
      "0", "15", "30", "45", "60", "120", "240", "480",
    ]);
    expect(select.classList.contains("active")).toBe(true);
  });

  it("uses the select entity's own options (Klassfan)", async () => {
    const el = await mountCard(
      { fan_entity: FAN },
      makeHass([fan(), entity("select.f_minuteur", "2h", { options: ["off", "1h", "2h"] })]),
    );
    const select = $(el, ".ctrl-select") as HTMLSelectElement;
    expect(select.value).toBe("2h");
  });

  it("selects the current preset on the first render", async () => {
    const el = await mountCard({ fan_entity: FAN }, makeHass([fan({ preset_mode: "sleep" })]));
    const select = $(el, ".preset-select") as HTMLSelectElement;
    expect(select.value).toBe("sleep");
    expect(selected(select)).toEqual(["sleep"]);
  });

  it("shows a placeholder when no preset is active", async () => {
    const el = await mountCard({ fan_entity: FAN }, makeHass([fan({ preset_mode: null })]));
    const select = $(el, ".preset-select") as HTMLSelectElement;
    expect(select.value).toBe("");
    expect(select.selectedOptions[0].textContent).toBe("—");
  });
});

describe("service calls (audit B6, B7)", () => {
  it("logs a failed call instead of leaving an unhandled rejection", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const hass = makeHass([fan()]);
    hass.callService.mockRejectedValue(new Error("boom"));
    const el = await mountCard({ fan_entity: FAN }, hass);
    ($(el, ".speed-seg") as HTMLButtonElement).click();
    await vi.waitFor(() => expect(error).toHaveBeenCalledTimes(1));
    expect(error.mock.calls[0][0]).toBe("custom-fan-card: fan.set_percentage failed");
  });

  it("catches a synchronous throw too", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const hass = makeHass([fan()]);
    hass.callService.mockImplementation(() => {
      throw new Error("sync");
    });
    const el = await mountCard({ fan_entity: FAN }, hass);
    ($(el, ".speed-seg") as HTMLButtonElement).click();
    expect(error).toHaveBeenCalledTimes(1);
  });

  it("puts the colour-temperature slider back when light.turn_on fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const hass = makeHass([
      fan(),
      entity("light.f", "on", {
        supported_color_modes: ["color_temp"],
        min_color_temp_kelvin: 2700,
        max_color_temp_kelvin: 6500,
        color_temp_kelvin: 3000,
      }),
    ]);
    hass.callService.mockRejectedValue(new Error("offline"));
    const el = await mountCard({ fan_entity: FAN }, hass);
    const slider = $(el, ".temp-slider") as HTMLInputElement;
    expect(slider.value).toBe("3000");
    slider.value = "5000";
    slider.dispatchEvent(new Event("change"));
    expect(hass.callService).toHaveBeenCalledWith("light", "turn_on", {
      entity_id: "light.f",
      color_temp_kelvin: 5000,
    });
    await vi.waitFor(() => expect(slider.value).toBe("3000"));
  });
});
