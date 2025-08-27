import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '#/components/theme/provider'

const AppearanceSettings = () => {
  const [zoomFactor, setZoomFactor] = useState(1)
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (newTheme: 'system' | 'light' | 'dark') => {
    if (newTheme) {
      setTheme(newTheme)
    }
  }

  const adjustZoom = (delta: number) => {
    const newZoom = Math.max(0.5, Math.min(2.0, zoomFactor + delta))
    setZoomFactor(newZoom)
  }

  return (
    <div className="min-h-full p-6 px-8">
      <div className="mb-6">
        <h2 className="font-semibold text-foreground text-xl">Appearance</h2>
      </div>

      <div className="space-y-4">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Theme</CardTitle>
            <p className="text-muted-foreground text-sm">Select your preferred theme.</p>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="single"
              value={theme}
              onValueChange={(value) =>
                value && handleThemeChange(value as 'system' | 'light' | 'dark')
              }
              variant="outline"
              className="justify-start"
            >
              <ToggleGroupItem value="system" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                <span>System</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="light" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
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
                <Label className="font-medium text-sm">
                  Controls the overall zoom level of the application.
                </Label>
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustZoom(-0.1)}
                  disabled={zoomFactor <= 0.5}
                  className="h-8 w-8 rounded-r-none border border-border border-r-0 p-0"
                >
                  −
                </Button>
                <div className="flex h-8 min-w-12 items-center justify-center border border-border bg-background px-2 text-center font-medium text-foreground text-sm">
                  {zoomFactor.toFixed(1)}×
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustZoom(0.1)}
                  disabled={zoomFactor >= 2.0}
                  className="h-8 w-8 rounded-l-none border border-border border-l-0 p-0"
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
