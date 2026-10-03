import { describe, expect, it } from "vitest";
import {
  fanBaseName,
  percentageToSpeed,
  resolveEntities,
  speedToPercentage,
} from "../src/types";
import { entity, makeHass } from "./helpers";

describe("6-speed percentage mapping", () => {
  it.each([
    [0, 0],
    [17, 1],
    [33, 2],
    [50, 3],
    [67, 4],
    [83, 5],
    [100, 6],
  ])("%i %% is speed %i", (pct, speed) => {
    expect(percentageToSpeed(pct)).toBe(speed);
  });

  it.each([
    [1, 17],
    [2, 33],
    [3, 50],
    [4, 67],
    [5, 83],
    [6, 100],
  ])("speed %i is %i %%", (speed, pct) => {
    expect(speedToPercentage(speed)).toBe(pct);
  });
});

describe("fanBaseName", () => {
  it("strips the domain", () => {
    expect(fanBaseName("fan.ceiling_fan_with_light")).toBe("ceiling_fan_with_light");
  });
  it("returns null without an entity", () => {
    expect(fanBaseName(undefined)).toBeNull();
  });
});

describe("resolveEntities", () => {
  it("discovers the CREATE Windcalm entities", () => {
    const hass = makeHass([
      entity("fan.ceiling_fan_with_light", "on"),
      entity("light.ceiling_fan_with_light", "on"),
      entity("number.ceiling_fan_with_light_minuteur", "0"),
      entity("switch.ceiling_fan_with_light_son", "off"),
    ]);
    expect(resolveEntities(hass, { fan_entity: "fan.ceiling_fan_with_light" })).toMatchObject({
      fan: "fan.ceiling_fan_with_light",
      light: "light.ceiling_fan_with_light",
      timer: "number.ceiling_fan_with_light_minuteur",
      sound: "switch.ceiling_fan_with_light_son",
    });
  });

  it("falls back to a select timer (Klassfan)", () => {
    const hass = makeHass([
      entity("fan.klassfan_ceiling_fan", "on"),
      entity("select.klassfan_ceiling_fan_minuteur", "off"),
    ]);
    expect(resolveEntities(hass, { fan_entity: "fan.klassfan_ceiling_fan" }).timer).toBe(
      "select.klassfan_ceiling_fan_minuteur",
    );
  });

  it("lets explicit overrides win", () => {
    const hass = makeHass([
      entity("fan.f", "on"),
      entity("light.f", "on"),
      entity("light.other", "on"),
    ]);
    expect(resolveEntities(hass, { fan_entity: "fan.f", light_entity: "light.other" }).light).toBe(
      "light.other",
    );
  });
});
