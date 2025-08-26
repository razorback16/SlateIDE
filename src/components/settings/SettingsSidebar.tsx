import { Component, For } from 'solid-js'
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

const SettingsSidebar: Component<SettingsSidebarProps> = (props) => {
  return (
    <div class="settings-sidebar">
      <div class="settings-sidebar-header">
        <h1 class="settings-title">Settings</h1>
      </div>

      <nav class="settings-nav">
        <div class="settings-nav-group">
          <For each={sidebarItems.slice(0, 3)}>
            {(item) => (
              <button
                type="button"
                class={`settings-nav-item ${props.activePanel === item.id ? 'active' : ''}`}
                onClick={() => props.onPanelChange(item.id)}
              >
                <span class="settings-nav-icon">{item.icon}</span>
                <span class="settings-nav-label">{item.label}</span>
              </button>
            )}
          </For>
        </div>

        <div class="settings-nav-group">
          <For each={sidebarItems.slice(3, 5)}>
            {(item) => (
              <button
                type="button"
                class={`settings-nav-item ${props.activePanel === item.id ? 'active' : ''}`}
                onClick={() => props.onPanelChange(item.id)}
              >
                <span class="settings-nav-icon">{item.icon}</span>
                <span class="settings-nav-label">{item.label}</span>
              </button>
            )}
          </For>
        </div>

        <div class="settings-nav-group">
          <For each={sidebarItems.slice(5)}>
            {(item) => (
              <button
                type="button"
                class={`settings-nav-item ${props.activePanel === item.id ? 'active' : ''}`}
                onClick={() => props.onPanelChange(item.id)}
              >
                <span class="settings-nav-icon">{item.icon}</span>
                <span class="settings-nav-label">{item.label}</span>
              </button>
            )}
          </For>
        </div>
      </nav>
    </div>
  )
}

export default SettingsSidebar
