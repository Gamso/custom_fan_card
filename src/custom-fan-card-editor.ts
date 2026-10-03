import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { localize, TranslationKey } from "./localize/localize";
import {
  CustomFanCardConfig,
  ENTITY_ROLES,
  EntityRole,
  ResolvedEntities,
  resolveEntities,
  fanSupportsDirection,
} from "./types";
import { fireEvent, HomeAssistant } from "./ha-types";

// Ensure the HA form components are registered (they ship with the frontend
// but are only loaded on demand via other cards' config elements).
const loadHaComponents = () => {
  if (!customElements.get("ha-form")) {
    (customElements.get("hui-button-card") as any)?.getConfigElement?.();
  }
  if (!customElements.get("ha-entity-picker")) {
    (customElements.get("hui-entities-card") as any)?.getConfigElement?.();
  }
};

class CustomFanCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: CustomFanCardConfig;

  public connectedCallback(): void {
    super.connectedCallback();
    if (this.hass) loadHaComponents();
  }

  public setConfig(config: CustomFanCardConfig): void {
    this._config = { ...config };
  }

  // Config key holding the explicit override of each discovered role.
  private static readonly _ROLE_KEYS: Record<EntityRole, "light_entity" | "timer_entity" | "sound_entity"> = {
    light: "light_entity",
    timer: "timer_entity",
    sound: "sound_entity",
  };

  // What auto-discovery alone would pick, ignoring the YAML overrides.
  private get _discovered(): ResolvedEntities {
    return resolveEntities(this.hass, {
      ...this._config,
      light_entity: undefined,
      timer_entity: undefined,
      sound_entity: undefined,
    });
  }

  // The form shows the discovered entities pre-filled in the pickers; they are
  // only written to the config when the user picks something else.
  private _formData(discovered: ResolvedEntities): CustomFanCardConfig {
    const data: CustomFanCardConfig = { ...this._config };
    for (const role of ENTITY_ROLES) {
      const key = CustomFanCardEditor._ROLE_KEYS[role];
      if (!data[key] && discovered[role]) data[key] = discovered[role];
    }
    return data;
  }

  private get _schema() {
    const schema: Record<string, unknown>[] = [
      {
        name: "fan_entity",
        required: true,
        selector: { entity: { domain: "fan" } },
      },
      { name: "name", selector: { text: {} } },
      { name: "show_name", selector: { boolean: {} } },
      { name: "light_entity", selector: { entity: { domain: "light" } } },
      { name: "timer_entity", selector: { entity: { domain: ["number", "select"] } } },
      { name: "sound_entity", selector: { entity: { domain: "switch" } } },
    ];

    const fanState = this.hass?.states?.[this._config?.fan_entity];
    if (fanSupportsDirection(fanState)) {
      schema.push({
        name: "summer_direction",
        selector: {
          select: {
            mode: "list",
            options: [
              { value: "forward", label: this._t("editor.dir_forward") },
              { value: "reverse", label: this._t("editor.dir_reverse") },
            ],
          },
        },
      });
    }

    return schema;
  }

  private _t(key: TranslationKey): string {
    return localize(this.hass, key);
  }

  private _computeLabel = (schema: { name: string }): string => {
    const map: Record<string, TranslationKey> = {
      fan_entity: "editor.fan_entity",
      name: "editor.name",
      show_name: "editor.show_name",
      summer_direction: "editor.summer_direction",
      light_entity: "editor.light_entity",
      timer_entity: "editor.timer_entity",
      sound_entity: "editor.sound_entity",
    };
    return map[schema.name] ? this._t(map[schema.name]) : schema.name;
  };

  private _valueChanged(ev: CustomEvent): void {
    const config: CustomFanCardConfig = { ...ev.detail.value };
    const discovered = this._discovered;
    for (const role of ENTITY_ROLES) {
      const key = CustomFanCardEditor._ROLE_KEYS[role];
      // Keep auto-discovery (rather than freezing today's match) when the
      // picker still shows the discovered entity or was cleared.
      if (!config[key] || (!this._config[key] && config[key] === discovered[role])) {
        delete config[key];
      }
    }
    fireEvent(this, "config-changed", { config });
  }

  private _renderDiscovered(discovered: ResolvedEntities) {
    if (!this._config?.fan_entity) return nothing;
    const labels: Record<EntityRole, TranslationKey> = {
      light: "controls.light",
      timer: "controls.timer",
      sound: "controls.sound",
    };
    const rows = ENTITY_ROLES.map((role) => ({
      key: labels[role],
      id: discovered[role],
      ambiguous: discovered.ambiguous[role],
    }));
    return html`
      <div class="discovered">
        <div class="discovered-title">${this._t("editor.discovered")}</div>
        ${rows.map(
          (r) => html`
            <div class="discovered-row">
              <span class="dr-label">${this._t(r.key)}</span>
              ${r.id
                ? html`<span class="dr-id found">${r.id}</span>`
                : r.ambiguous
                ? html`<span class="dr-id ambiguous">${this._t("editor.ambiguous")}</span>`
                : html`<span class="dr-id missing">${this._t("editor.not_found")}</span>`}
            </div>
            ${r.ambiguous
              ? html`<div class="dr-candidates">${r.ambiguous.join(", ")}</div>`
              : nothing}
          `
        )}
      </div>
    `;
  }

  protected render() {
    if (!this.hass || !this._config) return html``;
    const discovered = this._discovered;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._formData(discovered)}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${this._renderDiscovered(discovered)}
    `;
  }

  static styles = css`
    ha-form {
      width: 100%;
    }
    .discovered {
      margin-top: 16px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--secondary-background-color);
    }
    .discovered-title {
      font-size: 11px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }
    .discovered-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 3px 0;
      font-size: 13px;
    }
    .dr-label {
      color: var(--primary-text-color);
    }
    .dr-id {
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .dr-id.found {
      color: var(--primary-text-color);
    }
    .dr-id.missing {
      color: var(--secondary-text-color);
      font-style: italic;
    }
    .dr-id.ambiguous {
      color: var(--warning-color, #ffa600);
      font-style: italic;
    }
    .dr-candidates {
      padding: 0 0 4px;
      font-family: var(--code-font-family, monospace);
      font-size: 11px;
      color: var(--secondary-text-color);
      overflow-wrap: anywhere;
    }
  `;
}

customElements.define("custom-fan-card-editor", CustomFanCardEditor);
