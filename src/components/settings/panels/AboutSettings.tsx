import { Component } from 'solid-js'

const AboutSettings: Component = () => {
  return (
    <div class="settings-panel">
      <div class="settings-panel-header">
        <h2 class="settings-panel-title">About</h2>
      </div>

      <div class="settings-panel-content">
        <div class="settings-section">
          <div class="about-app">
            <div class="app-icon">
              <img src="/images/solid.svg" alt="App Icon" width="64" height="64" />
            </div>
            <div class="app-info">
              <h3 class="app-name">Tauri App</h3>
              <p class="app-version">Version 1.0.0</p>
              <p class="app-description">
                A modern desktop IDE built with Tauri, SolidJS, and TypeScript.
              </p>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3 class="settings-section-title">System Information</h3>

          <div class="system-info">
            <div class="system-row">
              <span class="system-label">Platform:</span>
              <span class="system-value">macOS</span>
            </div>
            <div class="system-row">
              <span class="system-label">Architecture:</span>
              <span class="system-value">arm64</span>
            </div>
            <div class="system-row">
              <span class="system-label">Tauri:</span>
              <span class="system-value">2.2.5</span>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3 class="settings-section-title">Legal</h3>
          <div class="legal-links">
            <button type="button" class="legal-link">
              Privacy Policy
            </button>
            <button type="button" class="legal-link">
              Terms of Service
            </button>
            <button type="button" class="legal-link">
              Open Source Licenses
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSettings
