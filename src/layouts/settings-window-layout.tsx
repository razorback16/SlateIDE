import { Component, createSignal, Show } from 'solid-js'
import SettingsSidebar from '#/components/settings/SettingsSidebar'
import GeneralSettings from '#/components/settings/panels/GeneralSettings'
import AppearanceSettings from '#/components/settings/panels/AppearanceSettings'
import UpdatesSettings from '#/components/settings/panels/UpdatesSettings'
import KeyboardSettings from '#/components/settings/panels/KeyboardSettings'
import WhatsNewSettings from '#/components/settings/panels/WhatsNewSettings'
import AboutSettings from '#/components/settings/panels/AboutSettings'
import HelpSettings from '#/components/settings/panels/HelpSettings'

export type SettingsPanel =
  | 'general'
  | 'appearance'
  | 'updates'
  | 'keyboard'
  | 'whats-new'
  | 'about'
  | 'help'

const SettingsWindowLayout: Component = () => {
  const [activePanel, setActivePanel] = createSignal<SettingsPanel>('general')

  return (
    <div class="settings-window">
      <div class="settings-container">
        <SettingsSidebar activePanel={activePanel()} onPanelChange={setActivePanel} />

        <div class="settings-content">
          <Show when={activePanel() === 'general'}>
            <GeneralSettings />
          </Show>
          <Show when={activePanel() === 'appearance'}>
            <AppearanceSettings />
          </Show>
          <Show when={activePanel() === 'updates'}>
            <UpdatesSettings />
          </Show>
          <Show when={activePanel() === 'keyboard'}>
            <KeyboardSettings />
          </Show>
          <Show when={activePanel() === 'whats-new'}>
            <WhatsNewSettings />
          </Show>
          <Show when={activePanel() === 'about'}>
            <AboutSettings />
          </Show>
          <Show when={activePanel() === 'help'}>
            <HelpSettings />
          </Show>
        </div>
      </div>
    </div>
  )
}

export default SettingsWindowLayout
