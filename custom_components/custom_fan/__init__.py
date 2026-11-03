"""The Custom Fan integration: one fan from a main and a backup entity."""
from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from .frontend import async_register_card
from .group import FanGroup
from .remotes import RemoteManager

PLATFORMS: list[Platform] = [Platform.FAN, Platform.LIGHT, Platform.SELECT, Platform.SWITCH]

type CustomFanConfigEntry = ConfigEntry[FanGroup]


async def async_setup_entry(hass: HomeAssistant, entry: CustomFanConfigEntry) -> bool:
    """Set up the merged entities, the remotes and the bundled card."""
    await async_register_card(hass)

    entry.runtime_data = FanGroup(hass, entry)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    for unsubscribe in await RemoteManager(hass, entry.runtime_data).async_start():
        entry.async_on_unload(unsubscribe)

    # The options flow rewrites the entry: rebuild everything from it.
    entry.async_on_unload(entry.add_update_listener(_async_reload))
    return True


async def _async_reload(hass: HomeAssistant, entry: CustomFanConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: CustomFanConfigEntry) -> bool:
    """Unload the entities and stop listening to the remotes."""
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
