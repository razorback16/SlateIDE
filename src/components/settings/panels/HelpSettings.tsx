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
    <div className="min-h-full p-6 px-8">
      <div className="mb-6">
        <h2 className="font-semibold text-foreground text-xl">Help & Support</h2>
      </div>

      <div className="space-y-4">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Documentation & Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium text-foreground text-sm">Documentation</h4>
                  <p className="text-muted-foreground text-xs">
                    View the complete user guide and API documentation.
                  </p>
                </div>
                <Button variant="secondary" onClick={openDocumentation}>
                  Open Docs
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium text-foreground text-sm">Send Feedback</h4>
                  <p className="text-muted-foreground text-xs">
                    Report bugs or suggest new features.
                  </p>
                </div>
                <Button variant="secondary" onClick={sendFeedback}>
                  Send Feedback
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium text-foreground text-sm">Data Directory</h4>
                  <p className="text-muted-foreground text-xs">
                    Open the folder where app data is stored.
                  </p>
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
