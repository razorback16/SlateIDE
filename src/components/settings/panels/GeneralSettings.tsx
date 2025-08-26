import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const GeneralSettings = () => {
  const [minimizeToTray, setMinimizeToTray] = useState(false)
  const [closeToTray, setCloseToTray] = useState(true)

  const handleReset = () => {
    if (confirm('Reset all settings to their default values?\nThis action is not reversible.')) {
      // Reset logic would go here
      // TODO: Implement settings reset functionality
    }
  }

  return (
    <div className="p-6 px-8 min-h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">General</h2>
      </div>

      <div className="space-y-4">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Behavior</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label htmlFor="minimize-to-tray" className="text-sm font-medium">
                  Minimize to Tray Menu
                </Label>
                <p className="text-xs text-muted-foreground">
                  Minimize the application to the tray menu.
                </p>
              </div>
              <Switch
                id="minimize-to-tray"
                checked={minimizeToTray}
                onCheckedChange={setMinimizeToTray}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label htmlFor="close-to-tray" className="text-sm font-medium">
                  Close to Tray Menu
                </Label>
                <p className="text-xs text-muted-foreground">
                  Close the application to the tray menu.
                </p>
              </div>
              <Switch
                id="close-to-tray"
                checked={closeToTray}
                onCheckedChange={setCloseToTray}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Reset Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">
                  Reset all settings to their default values.
                </Label>
                <p className="text-xs text-muted-foreground">
                  This action is not reversible.
                </p>
              </div>
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GeneralSettings
