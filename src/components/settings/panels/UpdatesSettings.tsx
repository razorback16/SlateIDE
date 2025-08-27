import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const UpdatesSettings = () => {
  const [autoUpdate, setAutoUpdate] = useState(true)
  const [updateChannel, setUpdateChannel] = useState('stable')

  const checkForUpdates = () => {
    // This would trigger the update check
    // TODO: Implement update checking functionality
  }

  return (
    <div className="min-h-full p-6 px-8">
      <div className="mb-6">
        <h2 className="font-semibold text-foreground text-xl">Updates</h2>
      </div>

      <div className="space-y-4">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Automatic Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label htmlFor="auto-update" className="font-medium text-sm">
                  Check for updates automatically
                </Label>
                <p className="text-muted-foreground text-xs">
                  Automatically download and install updates when available.
                </p>
              </div>
              <Switch id="auto-update" checked={autoUpdate} onCheckedChange={setAutoUpdate} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label className="font-medium text-sm">Update Channel</Label>
                <p className="text-muted-foreground text-xs">Choose which updates to receive.</p>
              </div>
              <Select value={updateChannel} onValueChange={setUpdateChannel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select update channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stable">Stable</SelectItem>
                  <SelectItem value="beta">Beta</SelectItem>
                  <SelectItem value="dev">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Manual Update</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label className="font-medium text-sm">Check for updates now</Label>
                <p className="text-muted-foreground text-xs">
                  Manually check for available updates.
                </p>
              </div>
              <Button type="button" onClick={checkForUpdates}>
                Check for Updates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UpdatesSettings
