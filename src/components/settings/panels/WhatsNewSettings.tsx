import { Component } from 'solid-js'

const WhatsNewSettings: Component = () => {
  return (
    <div class="settings-panel">
      <div class="settings-panel-header">
        <h2 class="settings-panel-title">What's New?</h2>
      </div>

      <div class="settings-panel-content">
        <div class="settings-section">
          <h3 class="settings-section-title">Latest Updates</h3>

          <div class="whats-new-content">
            <div class="update-item">
              <div class="update-version">Version 1.0.0</div>
              <div class="update-date">Released today</div>
              <div class="update-features">
                <h4>New Features:</h4>
                <ul>
                  <li>Settings window redesigned with macOS native styling</li>
                  <li>Improved window management</li>
                  <li>Enhanced theme system</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatsNewSettings
