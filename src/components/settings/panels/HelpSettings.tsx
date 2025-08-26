import { Component } from 'solid-js'

const HelpSettings: Component = () => {
  const openDocumentation = () => {
    // This would open documentation in browser
    window.open('https://docs.example.com', '_blank')
  }

  const sendFeedback = () => {
    // This would open feedback form or email
    window.open('mailto:feedback@example.com', '_blank')
  }

  const openDataDirectory = () => {
    // This would open the app's data directory
    // TODO: Implement data directory opening functionality
  }

  return (
    <div class="settings-panel">
      <div class="settings-panel-header">
        <h2 class="settings-panel-title">Help & Support</h2>
      </div>

      <div class="settings-panel-content">
        <div class="settings-section">
          <h3 class="settings-section-title">Documentation & Support</h3>

          <div class="help-actions">
            <div class="help-item">
              <div class="help-info">
                <h4 class="help-title">Documentation</h4>
                <p class="help-description">View the complete user guide and API documentation.</p>
              </div>
              <button type="button" class="btn-secondary" onClick={openDocumentation}>
                Open Docs
              </button>
            </div>

            <div class="help-item">
              <div class="help-info">
                <h4 class="help-title">Send Feedback</h4>
                <p class="help-description">Report bugs or suggest new features.</p>
              </div>
              <button type="button" class="btn-secondary" onClick={sendFeedback}>
                Send Feedback
              </button>
            </div>

            <div class="help-item">
              <div class="help-info">
                <h4 class="help-title">Data Directory</h4>
                <p class="help-description">Open the folder where app data is stored.</p>
              </div>
              <button type="button" class="btn-secondary" onClick={openDataDirectory}>
                Open Folder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpSettings
