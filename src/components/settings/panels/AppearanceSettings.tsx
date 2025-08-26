import { useState, useEffect } from 'react'
import { $theme } from '#/stores/ide.store'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Monitor, Sun, Moon } from 'lucide-react'

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
    <div className="p-6 px-8 min-h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
      </div>

      <div className="space-y-4">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Theme</CardTitle>
            <p className="text-sm text-muted-foreground">Select your preferred theme.</p>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="single"
              value={currentTheme}
              onValueChange={(value) => value && handleThemeChange(value as 'system' | 'light' | 'dark')}
              variant="outline"
              className="justify-start"
            >
              <ToggleGroupItem value="system" className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                <span>System</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="light" className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <span>Light</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                <span>Dark</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Zoom Factor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">
                  Controls the overall zoom level of the application.
                </Label>
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustZoom(-0.1)}
                  disabled={zoomFactor <= 0.5}
                  className="h-8 w-8 p-0 rounded-r-none border border-border border-r-0"
                >
                  −
                </Button>
                <div className="flex h-8 items-center justify-center min-w-12 px-2 text-center text-sm font-medium text-foreground border border-border bg-background">
                  {zoomFactor.toFixed(1)}×
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustZoom(0.1)}
                  disabled={zoomFactor >= 2.0}
                  className="h-8 w-8 p-0 rounded-l-none border border-border border-l-0"
                >
                  +
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AppearanceSettings
