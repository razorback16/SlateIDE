import { useState } from 'react'
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

const SettingsWindowLayout = () => {
  const [activePanel, setActivePanel] = useState<SettingsPanel>('general')

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'general':
        return <GeneralSettings />
      case 'appearance':
        return <AppearanceSettings />
      case 'updates':
        return <UpdatesSettings />
      case 'keyboard':
        return <KeyboardSettings />
      case 'whats-new':
        return <WhatsNewSettings />
      case 'about':
        return <AboutSettings />
      case 'help':
        return <HelpSettings />
      default:
        return <GeneralSettings />
    }
  }

  return (
    <div className="settings-window">
      <div className="settings-container">
        <SettingsSidebar activePanel={activePanel} onPanelChange={setActivePanel} />

        <div className="settings-content">
          {renderActivePanel()}
        </div>
      </div>
    </div>
  )
}

export default SettingsWindowLayout
