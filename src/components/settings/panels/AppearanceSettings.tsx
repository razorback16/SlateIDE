import { useState, useEffect } from 'react'
import { $theme } from '#/stores/ide.store'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { Button } from '@/components/ui/button'

const AppearanceSettings = () => {
  const [zoomFactor, setZoomFactor] = useState(1)
  const [currentTheme, setCurrentTheme] = useState<'system' | 'light' | 'dark'>('system')

  // Listen for theme changes from other windows
  useEffect(() => {
    let unlistenTheme: (() => void) | undefined

    const initTheme = async () => {
      // Get initial theme
      try {
        const initialTheme = (await invoke('get_theme')) as string
        setCurrentTheme(initialTheme as 'system' | 'light' | 'dark')
      } catch (error) {
        console.error('Failed to get theme:', error)
      }

      // Listen for theme change events
      const unlisten = await listen('theme-changed', (event) => {
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

      unlistenTheme = unlisten
    }

    initTheme()

    return () => {
      if (unlistenTheme) {
        unlistenTheme()
      }
    }
  }, [])

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
    const newZoom = Math.max(0.5, Math.min(2.0, zoomFactor + delta))
    setZoomFactor(newZoom)
  }

  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2 className="settings-panel-title">Appearance</h2>
      </div>

      <div className="settings-panel-content">
        <div className="settings-section">
          <h3 className="settings-section-title">Theme</h3>
          <p className="settings-section-description">Select your preferred theme.</p>

          <div className="flex gap-2">
            <Button
              type="button"
              variant={currentTheme === 'system' ? 'default' : 'outline'}
              className="flex items-center gap-2"
              onClick={() => handleThemeChange('system')}
            >
              <div className="theme-icon theme-system">
                <div className="theme-system-light" />
                <div className="theme-system-dark" />
              </div>
              <span>System</span>
            </Button>

            <Button
              type="button"
              variant={currentTheme === 'light' ? 'default' : 'outline'}
              className="flex items-center gap-2"
              onClick={() => handleThemeChange('light')}
            >
              <div className="theme-icon theme-light">☀️</div>
              <span>Light</span>
            </Button>

            <Button
              type="button"
              variant={currentTheme === 'dark' ? 'default' : 'outline'}
              className="flex items-center gap-2"
              onClick={() => handleThemeChange('dark')}
            >
              <div className="theme-icon theme-dark">🌙</div>
              <span>Dark</span>
            </Button>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Zoom Factor</h3>
          <div className="settings-row">
            <div className="settings-row-content">
              <span className="settings-label">
                Controls the overall zoom level of the application.
              </span>
            </div>
            <div className="settings-row-control">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-8 h-8"
                  onClick={() => adjustZoom(-0.1)}
                  disabled={zoomFactor <= 0.5}
                >
                  −
                </Button>
                <span className="zoom-value">{zoomFactor.toFixed(1)}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-8 h-8"
                  onClick={() => adjustZoom(0.1)}
                  disabled={zoomFactor >= 2.0}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppearanceSettings
