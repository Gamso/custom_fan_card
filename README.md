# Custom Fan Card

A custom Home Assistant card to control smart ceiling fans (6 speeds).

![Card Preview](assets/card_preview.png)

## Features

- 6-speed control shown as a horizontal speed bar with numbered steps
- Animated fan icon that spins faster with speed
- Summer/winter toggle in the status header, with configurable mapping to the fan's actual rotation direction
- Preset mode selector (e.g. Sleep, Nature) in the header, for fans that support it
- Compact control bar: power, light, sound beep, and stop timer
- Light color-temperature slider, shown when the light is on and supports it
- Controls that don't apply while the fan is off (light, sound, preset, timer, direction) are disabled automatically
- Language auto-detected from Home Assistant (`fr` / `en`)
- Visual editor in the HA dashboard UI

## Installation

### Manual Installation

### HACS (recommended)

1. Add this repository to HACS as a custom **Frontend** repository.
2. Search for **Custom Fan Card** and install it.
3. HACS automatically registers the JS resource.

## Configuration

Only `fan_entity` is required. The light, timer, and sound entities are
auto-discovered from the fan's base object id, so you can drop one card per fan
with a single line of config. Add a second card for a second fan, etc.

### Minimal

```yaml
type: custom:custom-fan-card
fan_entity: fan.ceiling_fan_with_light
```

### Full

```yaml
type: custom:custom-fan-card
fan_entity: fan.ceiling_fan_with_light
name: Ventilateur salon # optional — defaults to the fan's friendly name
show_name: true # optional — default: true
summer_direction: forward # optional — default: forward. Set to "reverse" if the fan's "reverse" direction is what actually cools the room in summer.
```

The visual editor asks for the fan entity, the card name, the "show name"
toggle, and — only when the fan entity supports the `direction` feature — the
summer rotation direction. The related entities are derived automatically and
shown read-only under "Auto-discovered entities". If auto-discovery ever picks
the wrong entity you can still override it in YAML with `light_entity`,
`timer_entity`, or `sound_entity`.

### Summer / winter mode

Instead of raw "Normal / Reverse" labels, the card shows a sun/snowflake
toggle in the status header for fans that support the `direction` feature.
Since not every fan spins counter-clockwise for summer, `summer_direction`
lets you tell the card which of the fan's two raw directions (`forward` or
`reverse`) corresponds to summer mode — the card then maps the toggle to
the right one and calls `fan.set_direction` accordingly.

### Preset mode

If the fan entity declares `preset_modes` and supports the `PRESET_MODE`
feature, a preset dropdown appears in the header, below the summer/winter
toggle — no extra config needed. Picking a preset calls `fan.set_preset_mode`;
picking a speed on the speed bar hands control back to `fan.set_percentage`.

A preset literally named `normal` (case-insensitive) is treated as "no active
preset" — the header shows the current speed instead of the preset name. This
matches fans (e.g. Klassfan) that expose their default manual mode as a
`normal` preset alongside real presets like `sleep` or `nature`.

### Auto-discovery

From `fan.ceiling_fan_with_light` the card extracts the base id
`ceiling_fan_with_light` and looks for entities in each domain whose object id
starts with that base — e.g. `light.ceiling_fan_with_light`,
`number.ceiling_fan_with_light_minuteur`, `switch.ceiling_fan_with_light_son`.
This is robust to language-specific suffixes (`_minuteur`, `_son`, `_timer`, …).
Rows for entities that aren't found are simply hidden.

The stop timer is looked up first in the `number` domain (used by the CREATE
Windcalm fan), then in the `select` domain — some fans (e.g. Klassfan via
`select.klassfan_ceiling_fan_minuteur`) expose the timer as a select entity
with its own predefined list of options instead of a free-form number. The
card detects which domain the resolved timer entity belongs to and calls
`number.set_value` or `select.select_option` accordingly, rendering whatever
options the select entity itself reports.

## Entities

| Entity                                   | Role                         |
| ---------------------------------------- | ---------------------------- |
| `fan.ceiling_fan_with_light`             | Fan on/off + speed (0–100 %) |
| `light.ceiling_fan_with_light`           | Ceiling light on/off         |
| `number.ceiling_fan_with_light_minuteur` | Stop timer (minutes)         |
| `switch.ceiling_fan_with_light_son`      | Audible beep on action       |

Preset mode isn't a separate entity — it's read from the `fan` entity's own
`preset_modes` attribute and `PRESET_MODE` supported feature, so there's
nothing to auto-discover or override for it.

### Speed mapping

The fan entity uses a 0–100 % percentage. The card maps it to 6 named speeds:

| Speed | Percentage | FR label  | EN label |
| ----- | ---------- | --------- | -------- |
| Off   | 0 %        | Arrêt     | Off      |
| 1     | 17 %       | Très doux | Gentle   |
| 2     | 33 %       | Doux      | Soft     |
| 3     | 50 %       | Modéré    | Moderate |
| 4     | 67 %       | Moyen     | Normal   |
| 5     | 83 %       | Fort      | Strong   |
| 6     | 100 %      | Turbo     | Turbo    |

## Development

### DevContainer (Recommended)

To test the card in an isolated Home Assistant environment:

1. Open the project in VS Code
2. Install the **Dev Containers** extension
3. Build the card on your host first: `npm install && npm run build`
4. Click **"Reopen in Container"**
5. Home Assistant will be available at `http://localhost:8123`

See [.devcontainer/README.md](.devcontainer/README.md) for full details.

## License

MIT
