# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [1.1.0] - 2026-10-03

### Added

- Speed bar sized from the fan's `percentage_step` (3, 4, 5 … speeds), with
  "Speed N" labels outside 6-speed fans.
- Oscillation toggle for fans supporting `OSCILLATE`.
- `light_independent` option for lights that work while the fan is off.
- Light, timer and beep entity pickers in the visual editor, pre-filled by
  auto-discovery; ambiguous matches are listed in the editor.
- Sections-view grid options and a card size that follows the content.
- Version banner in the browser console.
- `--custom-fan-card-accent` and `--custom-fan-card-summer` theme variables.
- Vitest test suite, ESLint, typecheck, GitHub Actions CI (including a check
  that `dist/` matches the sources, and HACS validation), MIT LICENSE file.

### Changed

- Speed commands send `floor(n × 100 / speeds)` %, like the Home Assistant UI
  (16 / 33 / 50 / 66 / 83 / 100 on 6 speeds); displayed percentages are
  unchanged.
- Every control is gated on its `supported_features` bit: no speed bar without
  `SET_SPEED`, no power button without `TURN_ON` / `TURN_OFF`.
- Auto-discovery requires the `<fan>_` separator, ignores the entities of
  another fan whose name extends this one, prefers known suffixes and never
  guesses between equally good candidates.
- Colours derive from the Home Assistant theme and render correctly on dark
  themes; the spin animation honours `prefers-reduced-motion`; buttons and the
  slider show a focus ring.
- A missing fan entity reads "Entity fan.x not found" instead of asking to
  configure the card.
- Requires Home Assistant 2024.8 or newer.
- The published bundle no longer references a sourcemap.
- `custom-card-helpers` dropped (it was never imported); minimal local typings
  replace it.

### Fixed

- A fan in `unknown` state was shown and driven as on.
- Timer and preset selects showed their first option until the next update;
  a timer value outside the presets showed "None".
- The colour-temperature slider kept the dragged value when the call failed.
- Failed service calls ended as "Uncaught (in promise)" errors.
- The card picker preview pointed at a non-existent fan.
- Entity resolution ran dozens of times per render, and every Home Assistant
  state change re-rendered the card.

## [1.0.0]

- Initial release.
