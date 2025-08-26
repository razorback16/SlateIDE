import { Button } from '@/components/ui/button'

const HelpSettings = () => {
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
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2 className="settings-panel-title">Help & Support</h2>
      </div>

      <div className="settings-panel-content">
        <div className="settings-section">
          <h3 className="settings-section-title">Documentation & Support</h3>

          <div className="help-actions">
            <div className="help-item">
              <div className="help-info">
                <h4 className="help-title">Documentation</h4>
                <p className="help-description">View the complete user guide and API documentation.</p>
              </div>
              <Button variant="secondary" onClick={openDocumentation}>
                Open Docs
              </Button>
            </div>

            <div className="help-item">
              <div className="help-info">
                <h4 className="help-title">Send Feedback</h4>
                <p className="help-description">Report bugs or suggest new features.</p>
              </div>
              <Button variant="secondary" onClick={sendFeedback}>
                Send Feedback
              </Button>
            </div>

            <div className="help-item">
              <div className="help-info">
                <h4 className="help-title">Data Directory</h4>
                <p className="help-description">Open the folder where app data is stored.</p>
              </div>
              <Button variant="secondary" onClick={openDataDirectory}>
                Open Folder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpSettings
