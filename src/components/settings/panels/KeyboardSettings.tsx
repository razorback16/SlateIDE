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

const KeyboardSettings = () => {
  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2 className="settings-panel-title">Keyboard Shortcuts</h2>
      </div>

      <div className="settings-panel-content">
        <div className="settings-section">
          <h3 className="settings-section-title">Application Shortcuts</h3>

          <div className="shortcuts-list">
            {shortcuts.map((shortcut) => (
              <div key={shortcut.action} className="shortcut-row">
                <div className="shortcut-info">
                  <span className="shortcut-action">{shortcut.action}</span>
                  <span className="shortcut-description">{shortcut.description}</span>
                </div>
                <div className="shortcut-key">
                  <kbd className="kbd">{shortcut.key}</kbd>
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