import { Component, createSignal } from 'solid-js'

const UpdatesSettings: Component = () => {
  const [autoUpdate, setAutoUpdate] = createSignal(true)
  const [updateChannel, setUpdateChannel] = createSignal('stable')

  const checkForUpdates = () => {
    // This would trigger the update check
    // TODO: Implement update checking functionality
  }

  return (
    <div class="settings-panel">
      <div class="settings-panel-header">
        <h2 class="settings-panel-title">Updates</h2>
      </div>

      <div class="settings-panel-content">
        <div class="settings-section">
          <h3 class="settings-section-title">Automatic Updates</h3>

          <div class="settings-row">
            <div class="settings-row-content">
              <span class="settings-label">Check for updates automatically</span>
              <p class="settings-description">
                Automatically download and install updates when available.
              </p>
            </div>
            <div class="settings-row-control">
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  checked={autoUpdate()}
                  onChange={(e) => setAutoUpdate(e.currentTarget.checked)}
                />
                <span class="toggle-slider" />
              </label>
            </div>
          </div>

          <div class="settings-row">
            <div class="settings-row-content">
              <span class="settings-label">Update Channel</span>
              <p class="settings-description">Choose which updates to receive.</p>
            </div>
            <div class="settings-row-control">
              <select
                class="settings-select"
                value={updateChannel()}
                onChange={(e) => setUpdateChannel(e.currentTarget.value)}
              >
                <option value="stable">Stable</option>
                <option value="beta">Beta</option>
                <option value="dev">Development</option>
              </select>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3 class="settings-section-title">Manual Update</h3>
          <div class="settings-row">
            <div class="settings-row-content">
              <span class="settings-label">Check for updates now</span>
              <p class="settings-description">Manually check for available updates.</p>
            </div>
            <div class="settings-row-control">
              <button type="button" class="btn-primary" onClick={checkForUpdates}>
                Check for Updates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdatesSettings
