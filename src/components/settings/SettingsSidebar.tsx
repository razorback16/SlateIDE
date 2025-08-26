import type { SettingsPanel } from '#/layouts/settings-window-layout'

interface SettingsSidebarProps {
  activePanel: SettingsPanel
  onPanelChange: (panel: SettingsPanel) => void
}

interface SidebarItem {
  id: SettingsPanel
  label: string
  icon: string
}

const sidebarItems: SidebarItem[] = [
  { id: 'general', label: 'General', icon: '⚙️' },
  { id: 'appearance', label: 'Appearance', icon: '🎨' },
  { id: 'updates', label: 'Updates', icon: '🔄' },
  { id: 'keyboard', label: 'Keyboard Shortcuts', icon: '⌨️' },
  { id: 'whats-new', label: "What's new?", icon: '✨' },
  { id: 'about', label: 'About', icon: 'ℹ️' },
  { id: 'help', label: 'Help & Support', icon: '❓' },
]

const SettingsSidebar = (props: SettingsSidebarProps) => {
  return (
    <div className="settings-sidebar">
      <div className="settings-sidebar-header">
        <h1 className="settings-title">Settings</h1>
      </div>

      <nav className="settings-nav">
        <div className="settings-nav-group">
          {sidebarItems.slice(0, 3).map((item) => (
            <button
              key={item.id}
              type="button"
              className={`settings-nav-item ${props.activePanel === item.id ? 'active' : ''}`}
              onClick={() => props.onPanelChange(item.id)}
            >
              <span className="settings-nav-icon">{item.icon}</span>
              <span className="settings-nav-label">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-nav-group">
          {sidebarItems.slice(3, 5).map((item) => (
            <button
              key={item.id}
              type="button"
              className={`settings-nav-item ${props.activePanel === item.id ? 'active' : ''}`}
              onClick={() => props.onPanelChange(item.id)}
            >
              <span className="settings-nav-icon">{item.icon}</span>
              <span className="settings-nav-label">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-nav-group">
          {sidebarItems.slice(5).map((item) => (
            <button
              key={item.id}
              type="button"
              className={`settings-nav-item ${props.activePanel === item.id ? 'active' : ''}`}
              onClick={() => props.onPanelChange(item.id)}
            >
              <span className="settings-nav-icon">{item.icon}</span>
              <span className="settings-nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default SettingsSidebar
