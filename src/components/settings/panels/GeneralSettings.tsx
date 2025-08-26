import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

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
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2 className="settings-panel-title">General</h2>
      </div>

      <div className="settings-panel-content">
        <div className="settings-section">
          <h3 className="settings-section-title">Behavior</h3>

          <div className="settings-row">
            <div className="settings-row-content">
              <span className="settings-label">Minimize to Tray Menu</span>
              <p className="settings-description">Minimize the application to the tray menu.</p>
            </div>
            <div className="settings-row-control">
              <Switch
                checked={minimizeToTray}
                onCheckedChange={setMinimizeToTray}
              />
            </div>
          </div>

          <div className="settings-row">
            <div className="settings-row-content">
              <span className="settings-label">Close to Tray Menu</span>
              <p className="settings-description">Close the application to the tray menu.</p>
            </div>
            <div className="settings-row-control">
              <Switch
                checked={closeToTray}
                onCheckedChange={setCloseToTray}
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Reset Settings</h3>
          <div className="settings-row">
            <div className="settings-row-content">
              <span className="settings-label">Reset all settings to their default values.</span>
              <p className="settings-description">This action is not reversible.</p>
            </div>
            <div className="settings-row-control">
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralSettings
