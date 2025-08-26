import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const HelpSettings = () => {
  const openDocumentation = () => {
    // This would open documentation in browser
    window.open('https://docs.example.com', '_blank')
  }

  const sendFeedback = () => {
    // This would open feedback form or email
    window.open('mailto:feedback@example.com', '_blank')
  }

  const openDataDirectory = () => {
    // This would open the app's data directory
    // TODO: Implement data directory opening functionality
  }

  return (
    <div className="p-6 px-8 min-h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">Help & Support</h2>
      </div>

      <div className="space-y-4">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Documentation & Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-foreground">Documentation</h4>
                  <p className="text-xs text-muted-foreground">View the complete user guide and API documentation.</p>
                </div>
                <Button variant="secondary" onClick={openDocumentation}>
                  Open Docs
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-foreground">Send Feedback</h4>
                  <p className="text-xs text-muted-foreground">Report bugs or suggest new features.</p>
                </div>
                <Button variant="secondary" onClick={sendFeedback}>
                  Send Feedback
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-foreground">Data Directory</h4>
                  <p className="text-xs text-muted-foreground">Open the folder where app data is stored.</p>
                </div>
                <Button variant="secondary" onClick={openDataDirectory}>
                  Open Folder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HelpSettings
