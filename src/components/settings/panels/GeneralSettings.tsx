import { Component, createSignal } from 'solid-js'

const GeneralSettings: Component = () => {
  const [minimizeToTray, setMinimizeToTray] = createSignal(false)
  const [closeToTray, setCloseToTray] = createSignal(true)

  const handleReset = () => {
    if (confirm('Reset all settings to their default values?\nThis action is not reversible.')) {
      // Reset logic would go here
      // TODO: Implement settings reset functionality
    }
  }

  return (
    <div class="settings-panel">
      <div class="settings-panel-header">
        <h2 class="settings-panel-title">General</h2>
      </div>

      <div class="settings-panel-content">
        <div class="settings-section">
          <h3 class="settings-section-title">Behavior</h3>

          <div class="settings-row">
            <div class="settings-row-content">
              <span class="settings-label">Minimize to Tray Menu</span>
              <p class="settings-description">Minimize the application to the tray menu.</p>
            </div>
            <div class="settings-row-control">
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  checked={minimizeToTray()}
                  onChange={(e) => setMinimizeToTray(e.currentTarget.checked)}
                />
                <span class="toggle-slider" />
              </label>
            </div>
          </div>

          <div class="settings-row">
            <div class="settings-row-content">
              <span class="settings-label">Close to Tray Menu</span>
              <p class="settings-description">Close the application to the tray menu.</p>
            </div>
            <div class="settings-row-control">
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  checked={closeToTray()}
                  onChange={(e) => setCloseToTray(e.currentTarget.checked)}
                />
                <span class="toggle-slider" />
              </label>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3 class="settings-section-title">Reset Settings</h3>
          <div class="settings-row">
            <div class="settings-row-content">
              <span class="settings-label">Reset all settings to their default values.</span>
              <p class="settings-description">This action is not reversible.</p>
            </div>
            <div class="settings-row-control">
              <button type="button" class="btn-reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralSettings
