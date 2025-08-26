
const WhatsNewSettings = () => {
  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2 className="settings-panel-title">What's New?</h2>
      </div>

      <div className="settings-panel-content">
        <div className="settings-section">
          <h3 className="settings-section-title">Latest Updates</h3>

          <div className="whats-new-content">
            <div className="update-item">
              <div className="update-version">Version 1.0.0</div>
              <div className="update-date">Released today</div>
              <div className="update-features">
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
