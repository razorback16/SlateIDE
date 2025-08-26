import { Component, createSignal, onMount, onCleanup } from 'solid-js'
import { $theme } from '#/stores/ide.store'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'

const AppearanceSettings: Component = () => {
  const [zoomFactor, setZoomFactor] = createSignal(1)
  const [currentTheme, setCurrentTheme] = createSignal<'system' | 'light' | 'dark'>('system')

  // Listen for theme changes from other windows
  onMount(async () => {
    // Get initial theme
    try {
      const initialTheme = (await invoke('get_theme')) as string
      setCurrentTheme(initialTheme as 'system' | 'light' | 'dark')
    } catch (error) {
      console.error('Failed to get theme:', error)
    }

    // Listen for theme change events
    const unlistenTheme = await listen('theme-changed', (event) => {
      const newTheme = event.payload as string
      setCurrentTheme(newTheme as 'system' | 'light' | 'dark')

      // Update the IDE store as well
      if (newTheme === 'light' || newTheme === 'dark') {
        $theme.set(newTheme)
      }

      // Apply theme to current document
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute(
          'data-theme',
          newTheme === 'system' ? $theme.get() : newTheme
        )
      }
    })

    onCleanup(() => {
      unlistenTheme()
    })
  })

  const handleThemeChange = async (newTheme: 'system' | 'light' | 'dark') => {
    try {
      await invoke('set_theme_and_notify', { theme: newTheme })
      setCurrentTheme(newTheme)

      // Update the IDE store for consistency
      if (newTheme === 'light' || newTheme === 'dark') {
        $theme.set(newTheme)
      }

      // Apply theme to current document immediately
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute(
          'data-theme',
          newTheme === 'system' ? $theme.get() : newTheme
        )
      }
    } catch (error) {
      console.error('Failed to set theme:', error)
    }
  }

  const adjustZoom = (delta: number) => {
    const newZoom = Math.max(0.5, Math.min(2.0, zoomFactor() + delta))
    setZoomFactor(newZoom)
  }

  return (
    <div class="settings-panel">
      <div class="settings-panel-header">
        <h2 class="settings-panel-title">Appearance</h2>
      </div>

      <div class="settings-panel-content">
        <div class="settings-section">
          <h3 class="settings-section-title">Theme</h3>
          <p class="settings-section-description">Select your preferred theme.</p>

          <div class="theme-selector">
            <button
              type="button"
              class={`theme-option ${currentTheme() === 'system' ? 'active' : ''}`}
              onClick={() => handleThemeChange('system')}
            >
              <div class="theme-icon theme-system">
                <div class="theme-system-light" />
                <div class="theme-system-dark" />
              </div>
              <span>System</span>
            </button>

            <button
              type="button"
              class={`theme-option ${currentTheme() === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeChange('light')}
            >
              <div class="theme-icon theme-light">☀️</div>
              <span>Light</span>
            </button>

            <button
              type="button"
              class={`theme-option ${currentTheme() === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeChange('dark')}
            >
              <div class="theme-icon theme-dark">🌙</div>
              <span>Dark</span>
            </button>
          </div>
        </div>

        <div class="settings-section">
          <h3 class="settings-section-title">Zoom Factor</h3>
          <div class="settings-row">
            <div class="settings-row-content">
              <span class="settings-label">
                Controls the overall zoom level of the application.
              </span>
            </div>
            <div class="settings-row-control">
              <div class="zoom-controls">
                <button
                  type="button"
                  class="zoom-btn"
                  onClick={() => adjustZoom(-0.1)}
                  disabled={zoomFactor() <= 0.5}
                >
                  −
                </button>
                <span class="zoom-value">{zoomFactor().toFixed(1)}</span>
                <button
                  type="button"
                  class="zoom-btn"
                  onClick={() => adjustZoom(0.1)}
                  disabled={zoomFactor() >= 2.0}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppearanceSettings
