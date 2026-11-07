# Changelog

## 1.2.0 (pre-release)

### Added
- **FanBridge integration** (`fan_bridge`) bundling the card: merges a main and a backup entity for each role (fan, light, stop timer, beep) into one `fan`, `light`, `select` and `switch` entity set, with a config flow and an options dialog. See [Main and backup fans](docs/en/fans.md).
- **Remote buttons**: map MQTT topics (Zigbee2MQTT) or action/event entities to 15 actions from the options dialog. See [Remotes](docs/en/remotes.md).
- **Card, backup fan**: `fallback_fan_entity` with `fallback_light_entity`, `fallback_timer_entity` and `fallback_sound_entity`, and a badge while the backup is in charge.
- **Card, speed percentages**: `speed_percentages` and `fallback_speed_percentages` for fans whose reported steps do not match their real speeds.
- Cache busting: the card is loaded as `?v=<version>-<hash>`, so an update never serves a stale bundle.
- **Reload the main integration** (opt-in): while the backup fan is in charge, reload the config entry that provides the main fan, with a growing delay, optionally gated by a ping or device tracker entity. See [Main and backup fans](docs/en/fans.md#reloading-the-main-integration).
- Documentation in English and French (`docs/`).

### Changed
- New design: dark glass, a 270° speed dial with the power button in its opening, a summer/winter row with a different background effect for each, and chips for the preset, oscillation, light, timer and beep. The accent follows `--fan-bridge-card-accent` (default `#2fd1a0`).
- The stop timer always offers presets, also for fans with a free-form `number` entity.
- The light colour temperature moves behind a button next to the light chip.
- The card editor leaves the backup, entities and speeds to the integration for a merged fan.
- The repository is now an **Integration** for HACS (it was a Dashboard plugin).

### Renamed
- The project is now **FanBridge**: integration domain `fan_bridge`, card `custom:fan-bridge-card`, CSS variable `--fan-bridge-card-accent`, repository `Gamso/fan_bridge`. Dashboards that still use `custom:custom-fan-card` keep working, but switch to the new name when you can.

### Removed
- The `--custom-fan-card-summer` CSS variable.

## 1.1.0

Card only, see the [release](https://github.com/Gamso/fan_bridge/releases/tag/1.1.0).
