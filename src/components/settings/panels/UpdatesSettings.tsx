import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const UpdatesSettings = () => {
  const [autoUpdate, setAutoUpdate] = useState(true)
  const [updateChannel, setUpdateChannel] = useState('stable')

  const checkForUpdates = () => {
    // This would trigger the update check
    // TODO: Implement update checking functionality
  }

  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2 className="settings-panel-title">Updates</h2>
      </div>

      <div className="settings-panel-content">
        <div className="settings-section">
          <h3 className="settings-section-title">Automatic Updates</h3>

          <div className="settings-row">
            <div className="settings-row-content">
              <span className="settings-label">Check for updates automatically</span>
              <p className="settings-description">
                Automatically download and install updates when available.
              </p>
            </div>
            <div className="settings-row-control">
              <Switch
                checked={autoUpdate}
                onCheckedChange={setAutoUpdate}
              />
            </div>
          </div>

          <div className="settings-row">
            <div className="settings-row-content">
              <span className="settings-label">Update Channel</span>
              <p className="settings-description">Choose which updates to receive.</p>
            </div>
            <div className="settings-row-control">
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
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Manual Update</h3>
          <div className="settings-row">
            <div className="settings-row-content">
              <span className="settings-label">Check for updates now</span>
              <p className="settings-description">Manually check for available updates.</p>
            </div>
            <div className="settings-row-control">
              <Button type="button" onClick={checkForUpdates}>
                Check for Updates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdatesSettings
