import { Component } from 'solid-js'

interface Shortcut {
  action: string
  key: string
  description: string
}

const shortcuts: Shortcut[] = [
  { action: 'Command Palette', key: '⌘K', description: 'Open command palette' },
  { action: 'Switch Views', key: '⌘1-7', description: 'Switch between different views' },
  { action: 'Quick File Search', key: '⌘⇧P', description: 'Search for files in project' },
  { action: 'Global Search', key: '⌘⇧F', description: 'Search across all files' },
  { action: 'Settings', key: '⌘,', description: 'Open settings window' },
  { action: 'Toggle Developer Tools', key: '⌘⌥I', description: 'Open/close developer tools' },
  { action: 'Force Reload', key: '⌘⇧R', description: 'Force reload the application' },
]

const KeyboardSettings: Component = () => {
  return (
    <div class="settings-panel">
      <div class="settings-panel-header">
        <h2 class="settings-panel-title">Keyboard Shortcuts</h2>
      </div>

      <div class="settings-panel-content">
        <div class="settings-section">
          <h3 class="settings-section-title">Application Shortcuts</h3>

          <div class="shortcuts-list">
            {shortcuts.map((shortcut) => (
              <div key={shortcut.action} class="shortcut-row">
                <div class="shortcut-info">
                  <span class="shortcut-action">{shortcut.action}</span>
                  <span class="shortcut-description">{shortcut.description}</span>
                </div>
                <div class="shortcut-key">
                  <kbd class="kbd">{shortcut.key}</kbd>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeyboardSettings
