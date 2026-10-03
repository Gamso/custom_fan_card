import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import "./custom-fan-card-editor";
import type { HassEntity, HomeAssistant } from "./ha-types";
import { localize } from "./localize/localize";
import {
  CustomFanCardConfig,
  ResolvedEntities,
  TIMER_OPTIONS_MIN,
  DEFAULT_SPEED_COUNT,
  percentageToSpeed,
  speedCount,
  speedToCommandPercentage,
  speedToPercentage,
  resolveEntities,
  fanSupports,
  fanSupportsDirection,
  FanFeature,
  isFanOn,
  isFanUnavailable,
} from "./types";

class CustomFanCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: CustomFanCardConfig;

  // ── Static HA card registration ─────────────────────────────────────────────

  public static getStubConfig(): CustomFanCardConfig {
    return {
      fan_entity: "fan.ceiling_fan_with_light",
      show_name: true,
    };
  }

  public static getConfigElement() {
    return document.createElement("custom-fan-card-editor");
  }

  public getCardSize(): number {
    return 4;
  }

  // ── Config ──────────────────────────────────────────────────────────────────

  public setConfig(config: CustomFanCardConfig): void {
    if (!config?.fan_entity) throw new Error("fan_entity is required.");
    this._config = {
      show_name: true,
      summer_direction: "forward",
      ...config,
    };
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  private _t(
    key: Parameters<typeof localize>[1],
    params?: Parameters<typeof localize>[2],
  ): string {
    return localize(this.hass, key, params);
  }

  // ── Entity resolution (memoized) ────────────────────────────────────────────
  //
  // Discovery scans every entity id, so it runs once per config change or
  // entity-registry change (number of entities, or a resolved entity gone) —
  // not on each of the dozens of getter reads of a render.

  private _resolved?: ResolvedEntities;
  private _resolvedFor?: HomeAssistant["states"];
  private _resolvedEntityCount = -1;

  private get _entities(): ResolvedEntities {
    return this._resolved ?? resolveEntities(this.hass, this._config);
  }

  private _trackedIds(resolved: ResolvedEntities): string[] {
    return [resolved.fan, resolved.light, resolved.timer, resolved.sound].filter(
      (id): id is string => !!id,
    );
  }

  private _needsResolve(): boolean {
    if (!this._resolved) return true;
    const states = this.hass?.states;
    if (!states) return false;
    if (states === this._resolvedFor) return false;
    if (Object.keys(states).length !== this._resolvedEntityCount) return true;
    return this._trackedIds(this._resolved).some((id) => !(id in states));
  }

  private _resolve(): void {
    const states = this.hass?.states;
    this._resolved = resolveEntities(this.hass, this._config);
    this._resolvedFor = states;
    this._resolvedEntityCount = states ? Object.keys(states).length : -1;
  }

  // Only re-render when something the card displays changed: the config, the
  // language, the set of entities, or the state of one of the tracked ones.
  protected shouldUpdate(changed: PropertyValues): boolean {
    if (!this._config) return false;
    if ([...changed.keys()].some((k) => k !== "hass")) return true;
    const old = changed.get("hass") as HomeAssistant | undefined;
    if (!old || !this.hass || !this._resolved) return true;
    if (
      old.language !== this.hass.language ||
      old.locale?.language !== this.hass.locale?.language
    ) {
      return true;
    }
    if (this._needsResolve()) return true;
    return this._trackedIds(this._resolved).some(
      (id) => old.states?.[id] !== this.hass.states?.[id],
    );
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("_config") || this._needsResolve()) {
      this._resolve();
    } else {
      this._resolvedFor = this.hass?.states;
    }
  }

  private get _fanState(): HassEntity | undefined {
    return this.hass?.states?.[this._entities.fan];
  }
  private get _lightState(): HassEntity | undefined {
    const id = this._entities.light;
    return id ? this.hass?.states?.[id] : undefined;
  }
  private get _timerState(): HassEntity | undefined {
    const id = this._entities.timer;
    return id ? this.hass?.states?.[id] : undefined;
  }
  private get _soundState(): HassEntity | undefined {
    const id = this._entities.sound;
    return id ? this.hass?.states?.[id] : undefined;
  }

  private get _currentSpeed(): number {
    const fan = this._fanState;
    if (!isFanOn(fan)) return 0;
    return percentageToSpeed(Number(fan.attributes?.percentage ?? 0), this._speedCount);
  }

  // Number of segments of the speed bar, derived from percentage_step.
  private get _speedCount(): number {
    return speedCount(this._fanState);
  }

  private get _fanSupportsDirection(): boolean {
    return fanSupportsDirection(this._fanState);
  }

  private get _fanSupportsSpeed(): boolean {
    return fanSupports(this._fanState, FanFeature.SET_SPEED);
  }

  private get _fanSupportsOscillate(): boolean {
    return fanSupports(this._fanState, FanFeature.OSCILLATE);
  }

  private get _isOscillating(): boolean {
    return this._fanState?.attributes?.oscillating === true;
  }

  private get _canTurnOn(): boolean {
    return fanSupports(this._fanState, FanFeature.TURN_ON);
  }

  private get _canTurnOff(): boolean {
    return fanSupports(this._fanState, FanFeature.TURN_OFF);
  }

  private get _fanDirection(): "forward" | "reverse" {
    return this._fanState?.attributes?.direction === "reverse"
      ? "reverse"
      : "forward";
  }

  // Which raw direction ("forward"/"reverse") corresponds to summer mode —
  // configurable since not every fan spins the same way for summer.
  private get _summerDirection(): "forward" | "reverse" {
    return this._config.summer_direction === "reverse" ? "reverse" : "forward";
  }

  private get _winterDirection(): "forward" | "reverse" {
    return this._summerDirection === "forward" ? "reverse" : "forward";
  }

  private get _isSummerMode(): boolean {
    return this._fanDirection === this._summerDirection;
  }

  private get _isLightOn(): boolean {
    return this._lightState?.state === "on";
  }

  private get _lightSupportsColorTemp(): boolean {
    const modes: string[] = this._lightState?.attributes?.supported_color_modes ?? [];
    return modes.includes("color_temp");
  }

  private get _minKelvin(): number {
    return Number(this._lightState?.attributes?.min_color_temp_kelvin ?? 2700);
  }
  private get _maxKelvin(): number {
    return Number(this._lightState?.attributes?.max_color_temp_kelvin ?? 6500);
  }
  private get _currentKelvin(): number {
    return Number(
      this._lightState?.attributes?.color_temp_kelvin ?? this._minKelvin
    );
  }

  private get _isSoundOn(): boolean {
    return this._soundState?.state === "on";
  }

  // The fan is "on" whenever HA reports it on — this includes preset modes that
  // may report percentage 0. Controls that the hardware ignores while powered
  // off (light, timer, sound, direction, preset) key off this.
  private get _isOn(): boolean {
    return isFanOn(this._fanState);
  }

  private get _fanSupportsPreset(): boolean {
    return fanSupports(this._fanState, FanFeature.PRESET_MODE) && this._presetModes.length > 0;
  }
  private get _presetModes(): string[] {
    return this._fanState?.attributes?.preset_modes ?? [];
  }
  private get _presetMode(): string {
    return this._fanState?.attributes?.preset_mode ?? "";
  }
  // "normal" is the neutral/manual preset — the fan simply follows its speed,
  // so it is not treated as an active special mode for the header display.
  private get _activePreset(): string {
    const p = this._presetMode;
    return !p || p.toLowerCase() === "normal" ? "" : p;
  }
  private _formatPreset(p: string): string {
    return p ? p.charAt(0).toUpperCase() + p.slice(1) : p;
  }

  // "select" domain covers fans (e.g. Klassfan) whose timer is a predefined
  // list of options rather than a free-form "number" entity.
  private get _timerDomain(): "number" | "select" {
    return this._entities.timer?.startsWith("select.") ? "select" : "number";
  }

  // Normalize so the value matches an option string exactly. A "number" entity
  // may report "30.0" while the options are "30" — compare numerically there;
  // a "select" entity's state is already one of its literal option strings.
  private get _timerValue(): string {
    const raw = this._timerState?.state;
    if (raw === undefined || raw === null || raw === "") return "";
    if (this._timerDomain === "select") return String(raw);
    const n = Number(raw);
    return Number.isNaN(n) ? String(raw) : String(n);
  }

  private get _timerOptions(): string[] {
    if (this._timerDomain === "select") {
      return this._timerState?.attributes?.options ?? [];
    }
    return TIMER_OPTIONS_MIN.map(String);
  }

  private _formatTimerOption(raw: string): string {
    const n = Number(raw);
    if (raw.trim() === "" || Number.isNaN(n)) return raw;
    if (n === 0) return this._t("controls.timer_none");
    return n < 60 ? `${n} min` : `${n / 60} h`;
  }

  // The first option is the "no timer" sentinel (0 minutes, or a fan's own
  // "off" select option) — anything else counts as an active countdown.
  private get _isTimerActive(): boolean {
    const [none] = this._timerOptions;
    return this._timerValue !== "" && this._timerValue !== none;
  }

  // The named labels (Gentle … Turbo) were written for 6-speed fans; any other
  // speed count gets a plain numbered label.
  private _speedStateLabel(speed: number): string {
    // A fan without SET_SPEED has no speed to name: plain on / off.
    if (!this._fanSupportsSpeed) {
      return this._t(this._isOn ? "speed.state_on" : "speed.state_off");
    }
    if (speed === 0) return this._t("speed.state_off");
    if (this._speedCount !== DEFAULT_SPEED_COUNT) {
      return this._t("speed.state_generic", { speed });
    }
    return this._t(`speed.state_s${speed}` as Parameters<typeof localize>[1]);
  }

  private _speedLabel(speed: number): string {
    if (this._speedCount !== DEFAULT_SPEED_COUNT) {
      return this._t("speed.generic", { speed });
    }
    return this._t(`speed.s${speed}` as Parameters<typeof localize>[1]);
  }

  // ── Actions ─────────────────────────────────────────────────────────────────

  private _setSpeed(speed: number): void {
    if (speed === 0) {
      this.hass.callService("fan", "turn_off", { entity_id: this._entities.fan });
    } else {
      this.hass.callService("fan", "set_percentage", {
        entity_id: this._entities.fan,
        percentage: speedToCommandPercentage(speed, this._speedCount),
      });
    }
  }

  private _togglePower(): void {
    this.hass.callService("fan", this._isOn ? "turn_off" : "turn_on", {
      entity_id: this._entities.fan,
    });
  }

  private _toggleOscillate(): void {
    this.hass.callService("fan", "oscillate", {
      entity_id: this._entities.fan,
      oscillating: !this._isOscillating,
    });
  }

  private _setPreset(ev: Event): void {
    this.hass.callService("fan", "set_preset_mode", {
      entity_id: this._entities.fan,
      preset_mode: (ev.target as HTMLSelectElement).value,
    });
  }

  private _setDirection(direction: "forward" | "reverse"): void {
    this.hass.callService("fan", "set_direction", {
      entity_id: this._entities.fan,
      direction,
    });
  }

  private _setSeason(season: "summer" | "winter"): void {
    this._setDirection(season === "summer" ? this._summerDirection : this._winterDirection);
  }

  private _toggleLight(): void {
    if (!this._entities.light) return;
    this.hass.callService("light", "toggle", { entity_id: this._entities.light });
  }

  private _setColorTemp(ev: Event): void {
    if (!this._entities.light) return;
    const kelvin = Number((ev.target as HTMLInputElement).value);
    this.hass.callService("light", "turn_on", {
      entity_id: this._entities.light,
      color_temp_kelvin: kelvin,
    });
  }

  private _setTimer(ev: Event): void {
    if (!this._entities.timer) return;
    const value = (ev.target as HTMLSelectElement).value;
    if (this._timerDomain === "select") {
      this.hass.callService("select", "select_option", {
        entity_id: this._entities.timer,
        option: value,
      });
    } else {
      this.hass.callService("number", "set_value", {
        entity_id: this._entities.timer,
        value: Number(value),
      });
    }
  }

  private _toggleSound(): void {
    if (!this._entities.sound) return;
    this.hass.callService("switch", "toggle", { entity_id: this._entities.sound });
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  private _renderSpeedIcon(speed: number) {
    const animDurations = ["none", "2.5s", "1.5s", "0.9s", "0.6s", "0.35s", "0.15s"];
    // A fan without SET_SPEED has no percentage: spin at a medium pace when on.
    const onOffOnly = !this._fanSupportsSpeed && this._isOn;
    const isOff = speed === 0 && !onOffOnly;
    // Scale the speed onto the 6-step animation table so any speed count spins
    // from slow to fast (identity mapping on 6-speed fans).
    const step = onOffOnly
      ? 3
      : Math.max(1, Math.round((speed * DEFAULT_SPEED_COUNT) / this._speedCount));
    const iconStyle = isOff
      ? ""
      : `animation: spin ${animDurations[step]} linear infinite;`;
    return html`
      <div class="fan-icon-wrap ${isOff ? "off" : ""}">
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          class="fan-svg ${isOff ? "off" : ""}"
          style="${iconStyle}"
          aria-hidden="true"
        >
          <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.69 9.22,10.88C9.41,10.4 9.73,9.97 10.13,9.65C8.14,5.96 8.92,2 12.5,2Z" />
        </svg>
      </div>
    `;
  }

  protected render() {
    if (!this._config) return nothing;
    if (!this.hass) return nothing;

    const fan = this._fanState;
    if (!fan) {
      return html`<ha-card><div class="error">${this._t("card.config_required")}</div></ha-card>`;
    }

    const speed = this._currentSpeed;
    const isUnavailable = isFanUnavailable(fan);
    const cardName =
      this._config.name ||
      fan.attributes?.friendly_name ||
      this._t("card.name_default");

    return html`
      <ha-card>
        <div class="card-content ${isUnavailable ? "unavailable" : ""}">

          ${this._config.show_name !== false
            ? html`
              <div class="card-header">
                <div class="card-title">${cardName}</div>
              </div>
            `
            : nothing}

          ${isUnavailable
            ? html`<div class="unavailable-msg">${this._t("card.unavailable")}</div>`
            : nothing}

          <div class="fan-status-row">
            <div class="fan-status-main">
              ${this._renderSpeedIcon(speed)}
              <div class="fan-info">
                <div class="fan-state">
                  ${this._activePreset
                    ? this._formatPreset(this._activePreset)
                    : this._speedStateLabel(speed)}
                </div>
                <div class="fan-pct">
                  ${!this._isOn || !this._fanSupportsSpeed
                    ? "—"
                    : this._activePreset
                    ? this._t("controls.preset")
                    : `${speedToPercentage(speed, this._speedCount)}%`}
                </div>
              </div>
            </div>

            ${this._fanSupportsDirection || this._fanSupportsPreset
              ? html`
                <div class="header-controls">
                  ${this._fanSupportsDirection
                    ? html`
                      <div class="season-toggle">
                        <button
                          class="season-btn summer ${this._isSummerMode ? "active" : ""}"
                          @click=${() => this._setSeason("summer")}
                          ?disabled=${!this._isOn}
                          aria-label="${this._t("controls.dir_summer")}"
                          title="${this._t("controls.dir_summer")}"
                        >
                          <ha-icon icon="mdi:weather-sunny"></ha-icon>
                        </button>
                        <button
                          class="season-btn winter ${!this._isSummerMode ? "active" : ""}"
                          @click=${() => this._setSeason("winter")}
                          ?disabled=${!this._isOn}
                          aria-label="${this._t("controls.dir_winter")}"
                          title="${this._t("controls.dir_winter")}"
                        >
                          <ha-icon icon="mdi:snowflake"></ha-icon>
                        </button>
                      </div>
                    `
                    : nothing}

                  ${this._fanSupportsPreset
                    ? html`
                      <select
                        class="preset-select ${this._activePreset ? "active" : ""}"
                        .value=${live(this._presetMode)}
                        @change=${this._setPreset}
                        ?disabled=${!this._isOn}
                        aria-label="${this._t("controls.preset")}"
                        title="${this._t("controls.preset")}"
                      >
                        ${this._presetModes.map(
                          (p) => html`<option value="${p}">${this._formatPreset(p)}</option>`
                        )}
                      </select>
                    `
                    : nothing}
                </div>
              `
              : nothing}
          </div>

          ${this._fanSupportsSpeed
            ? html`
              <div class="speed-bar">
                ${Array.from({ length: this._speedCount }, (_, i) => i + 1).map(
                  (s) => html`
                    <button
                      class="speed-seg ${speed >= s && speed > 0 ? "filled" : ""} ${speed === s ? "active" : ""}"
                      @click=${() => this._setSpeed(s)}
                      ?disabled=${isUnavailable}
                      aria-label="${this._speedLabel(s)}"
                      aria-pressed=${speed === s}
                    >
                      <span class="speed-seg-fill"></span>
                      <span class="speed-seg-num">${s}</span>
                    </button>
                  `
                )}
              </div>
            `
            : nothing}

          <div class="control-bar">
            ${this._canTurnOn || this._canTurnOff
              ? html`
                <button
                  class="ctrl-btn power ${this._isOn ? "on" : ""}"
                  @click=${this._togglePower}
                  ?disabled=${isUnavailable || (this._isOn ? !this._canTurnOff : !this._canTurnOn)}
                  aria-label="${this._t("controls.power")}"
                  title="${this._t("controls.power")}"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                    <path d="M12 4v8"/>
                    <path d="M7.8 6.8a6 6 0 1 0 8.4 0"/>
                  </svg>
                </button>
              `
              : nothing}

            ${this._fanSupportsOscillate
              ? html`
                <button
                  class="ctrl-btn oscillate ${this._isOscillating ? "on" : ""}"
                  @click=${this._toggleOscillate}
                  ?disabled=${isUnavailable || !this._isOn}
                  aria-label="${this._t("controls.oscillate")}"
                  aria-pressed=${this._isOscillating}
                  title="${this._t("controls.oscillate")}"
                >
                  <ha-icon icon="${this._isOscillating ? "mdi:arrow-oscillating" : "mdi:arrow-oscillating-off"}"></ha-icon>
                </button>
              `
              : nothing}

            ${this._lightState
              ? html`
                <button
                  class="ctrl-btn light ${this._isLightOn ? "on" : ""}"
                  @click=${this._toggleLight}
                  ?disabled=${isUnavailable || !this._isOn}
                  aria-label="${this._t("controls.light")}"
                  title="${this._t("controls.light")}"
                >
                  <ha-icon icon="${this._isLightOn ? "mdi:lightbulb-outline" : "mdi:lightbulb-off-outline"}"></ha-icon>
                </button>
              `
              : nothing}

            ${this._soundState || this._timerState
              ? html`<div class="ctrl-sep"></div>`
              : nothing}

            ${this._soundState
              ? html`
                <button
                  class="ctrl-btn sound ${this._isSoundOn ? "on" : ""}"
                  @click=${this._toggleSound}
                  ?disabled=${isUnavailable || !this._isOn}
                  aria-label="${this._t("controls.sound")}"
                  title="${this._t("controls.sound")}"
                >
                  <ha-icon icon="${this._isSoundOn ? "mdi:volume-high" : "mdi:volume-off"}"></ha-icon>
                </button>
              `
              : nothing}

            ${this._timerState
              ? html`
                <select
                  class="ctrl-select ${this._isTimerActive ? "active" : ""}"
                  .value=${live(String(this._timerValue))}
                  @change=${this._setTimer}
                  ?disabled=${isUnavailable || !this._isOn}
                  aria-label="${this._t("controls.timer")}"
                  title="${this._t("controls.timer")}"
                >
                  ${this._timerOptions.map(
                    (opt) => html`
                      <option value="${opt}">${this._formatTimerOption(opt)}</option>
                    `
                  )}
                </select>
              `
              : nothing}
          </div>

          ${this._lightState && this._isLightOn && this._lightSupportsColorTemp
            ? html`
              <div class="temp-row">
                <div class="temp-divider"></div>
                <div class="temp-controls">
                  <span class="temp-label warm">${this._t("controls.temp_warm")}</span>
                  <input
                    class="temp-slider"
                    type="range"
                    min="${this._minKelvin}"
                    max="${this._maxKelvin}"
                    step="100"
                    .value=${String(this._currentKelvin)}
                    @change=${this._setColorTemp}
                    ?disabled=${isUnavailable}
                    aria-label="${this._t("controls.color_temp")}"
                  />
                  <span class="temp-label cool">${this._t("controls.temp_cool")}</span>
                  <span class="temp-value">${this._currentKelvin}K</span>
                </div>
              </div>
            `
            : nothing}

        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      --wc-accent: #378add;
      --wc-accent-light: #e6f1fb;
      --wc-accent-dark: #0c447c;
      --wc-accent-mid: #185fa5;
      --wc-red-light: #fcebeb;
      --wc-red: #e24b4a;
      --wc-red-dark: #a32d2d;
    }

    ha-card {
      overflow: hidden;
    }

    .card-content {
      padding: 16px;
    }
    .card-content.unavailable {
      opacity: 0.6;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    .card-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
      text-align: center;
    }

    .unavailable-msg {
      font-size: 13px;
      color: var(--secondary-text-color);
      text-align: center;
      padding: 8px 0;
    }

    .fan-status-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
      padding: 12px;
      background: var(--secondary-background-color);
      border-radius: 8px;
    }
    .fan-status-main {
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 0;
    }

    .header-controls {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
      flex-shrink: 0;
    }

    .season-toggle {
      display: flex;
      gap: 1px;
      flex-shrink: 0;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      overflow: hidden;
    }
    .season-btn {
      width: 64px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 0;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      padding: 0;
      transition: background 0.15s, color 0.15s;
    }
    .season-btn:hover:not(:disabled):not(.active) {
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
    .season-btn.summer.active {
      background: #e0912f;
      color: #fff;
    }
    .season-btn.winter.active {
      background: var(--wc-accent);
      color: #fff;
    }
    .season-btn ha-icon {
      --mdc-icon-size: 20px;
      display: flex;
    }

    .preset-select {
      width: 131px;
      height: 36px;
      font-size: 13px;
      padding: 0 20px 0 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      cursor: pointer;
      outline: none;
      transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
    }
    .preset-select:hover:not(:disabled) {
      border-color: var(--wc-accent);
    }
    .preset-select:focus-visible {
      box-shadow: 0 0 0 2px var(--wc-accent-light);
    }
    .preset-select.active {
      border-color: var(--wc-accent);
      background: var(--wc-accent);
      color: #fff;
    }
    .preset-select:disabled {
      cursor: default;
      opacity: 0.4;
    }
    .season-btn:disabled {
      cursor: default;
      opacity: 0.4;
    }

    .fan-icon-wrap {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--wc-accent-light);
      border: 1.5px solid var(--wc-accent);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.3s, border-color 0.3s;
    }
    .fan-icon-wrap.off {
      background: var(--secondary-background-color);
      border-color: var(--divider-color);
    }

    .fan-svg {
      color: var(--wc-accent);
      transition: color 0.3s;
      transform-origin: center;
    }
    .fan-svg.off {
      color: var(--secondary-text-color);
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .fan-info { min-width: 0; }
    .fan-state {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
    }
    .fan-pct {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .speed-bar {
      display: flex;
      gap: 4px;
      margin-bottom: 16px;
    }

    .speed-seg {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
    }
    .speed-seg:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .speed-seg-fill {
      height: 20px;
      border-radius: 5px;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      transition: background 0.15s, border-color 0.15s;
    }
    .speed-seg:hover:not(:disabled) .speed-seg-fill {
      border-color: var(--wc-accent);
    }
    .speed-seg.filled .speed-seg-fill {
      background: var(--wc-accent);
      border-color: var(--wc-accent);
    }

    .speed-seg-num {
      font-size: 13px;
      text-align: center;
      color: var(--secondary-text-color);
      padding: 2px 0;
      border-radius: 5px;
      transition: color 0.15s, background 0.15s;
    }
    .speed-seg.active .speed-seg-num {
      color: var(--wc-accent-dark);
      background: var(--wc-accent-light);
      font-weight: 500;
    }

    .control-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .ctrl-btn {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid transparent;
      border-radius: 50%;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      padding: 0;
      transition: color 0.15s, border-color 0.15s;
    }
    .ctrl-btn:hover:not(:disabled) {
      border-color: var(--divider-color);
      color: var(--primary-text-color);
    }
    .ctrl-btn.on {
      color: var(--wc-accent);
    }
    .ctrl-btn.on:hover:not(:disabled) {
      border-color: var(--wc-accent);
      color: var(--wc-accent);
    }
    .ctrl-btn:disabled {
      cursor: default;
      opacity: 0.4;
    }
    .ctrl-btn ha-icon {
      --mdc-icon-size: 22px;
      display: flex;
    }

    .ctrl-sep {
      width: 1px;
      align-self: stretch;
      margin: 4px 2px;
      background: var(--divider-color);
      flex-shrink: 0;
    }

    .ctrl-select {
      height: 40px;
      width: 140px;
      flex: none;
      font-size: 13px;
      padding: 0 20px 0 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      cursor: pointer;
      outline: none;
      transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
    }
    .ctrl-select:hover:not(:disabled) {
      border-color: var(--wc-accent);
    }
    .ctrl-select:focus-visible {
      box-shadow: 0 0 0 2px var(--wc-accent-light);
    }
    .ctrl-select.active {
      border-color: var(--wc-accent);
      background: var(--wc-accent);
      color: #fff;
    }
    .ctrl-select:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .temp-row {
      padding-top: 12px;
    }
    .temp-divider {
      height: 1px;
      background: var(--divider-color);
      margin-bottom: 12px;
    }
    .temp-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .temp-label {
      font-size: 11px;
      flex-shrink: 0;
    }
    .temp-label.warm {
      color: #ba7517;
    }
    .temp-label.cool {
      color: #378add;
    }
    .temp-value {
      font-size: 11px;
      color: var(--secondary-text-color);
      min-width: 42px;
      text-align: right;
      flex-shrink: 0;
    }
    .temp-slider {
      flex: 1;
      -webkit-appearance: none;
      appearance: none;
      height: 8px;
      border-radius: 4px;
      background: linear-gradient(to right, #ffb46e, #fff6e8 50%, #cfe4ff);
      outline: none;
      cursor: pointer;
    }
    .temp-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--card-background-color, #fff);
      border: 2px solid var(--primary-text-color);
      cursor: pointer;
    }
    .temp-slider::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--card-background-color, #fff);
      border: 2px solid var(--primary-text-color);
      cursor: pointer;
    }
    .temp-slider:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .error {
      padding: 16px;
      font-size: 13px;
      color: var(--error-color, var(--wc-red));
    }
  `;
}

customElements.define("custom-fan-card", CustomFanCard);

declare global {
  interface Window {
    customCards?: { type: string; name: string; description: string; preview?: boolean }[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "custom-fan-card",
  name: "Custom Fan Card",
  description: "Custom card for smart ceiling fans (CREATE Windcalm, Klassfan, …)",
  preview: true,
});
