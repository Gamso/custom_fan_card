import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { localize, TranslationKey } from "./localize/localize";
import { CustomFanCardConfig, resolveEntities, fanSupportsDirection } from "./types";
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

  private get _schema() {
    const schema: Record<string, unknown>[] = [
      {
        name: "fan_entity",
        required: true,
        selector: { entity: { domain: "fan" } },
      },
      { name: "name", selector: { text: {} } },
      { name: "show_name", selector: { boolean: {} } },
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
    };
    return map[schema.name] ? this._t(map[schema.name]) : schema.name;
  };

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value;
    fireEvent(this, "config-changed", { config });
  }

  private _renderDiscovered() {
    if (!this._config?.fan_entity) return nothing;
    const resolved = resolveEntities(this.hass, this._config);
    const rows: { key: TranslationKey; id?: string }[] = [
      { key: "controls.light", id: resolved.light },
      { key: "controls.timer", id: resolved.timer },
      { key: "controls.sound", id: resolved.sound },
    ];
    return html`
      <div class="discovered">
        <div class="discovered-title">${this._t("editor.discovered")}</div>
        ${rows.map(
          (r) => html`
            <div class="discovered-row">
              <span class="dr-label">${this._t(r.key)}</span>
              ${r.id
                ? html`<span class="dr-id found">${r.id}</span>`
                : html`<span class="dr-id missing">${this._t("editor.not_found")}</span>`}
            </div>
          `
        )}
      </div>
    `;
  }

  protected render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${this._renderDiscovered()}
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
  `;
}

customElements.define("custom-fan-card-editor", CustomFanCardEditor);
