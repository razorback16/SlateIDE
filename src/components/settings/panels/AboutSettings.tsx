import { Button } from '@/components/ui/button'

const AboutSettings = () => {
  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2 className="settings-panel-title">About</h2>
      </div>

      <div className="settings-panel-content">
        <div className="settings-section">
          <div className="about-app">
            <div className="app-icon">
              <img src="/images/solid.svg" alt="App Icon" width="64" height="64" />
            </div>
            <div className="app-info">
              <h3 className="app-name">Tauri App</h3>
              <p className="app-version">Version 1.0.0</p>
              <p className="app-description">
                A modern desktop IDE built with Tauri, SolidJS, and TypeScript.
              </p>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">System Information</h3>

          <div className="system-info">
            <div className="system-row">
              <span className="system-label">Platform:</span>
              <span className="system-value">macOS</span>
            </div>
            <div className="system-row">
              <span className="system-label">Architecture:</span>
              <span className="system-value">arm64</span>
            </div>
            <div className="system-row">
              <span className="system-label">Tauri:</span>
              <span className="system-value">2.2.5</span>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Legal</h3>
          <div className="legal-links">
            <Button variant="ghost" className="legal-link">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="legal-link">
              Terms of Service
            </Button>
            <Button variant="ghost" className="legal-link">
              Open Source Licenses
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSettings
