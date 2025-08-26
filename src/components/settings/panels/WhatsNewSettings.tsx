
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const WhatsNewSettings = () => {
  return (
    <div className="p-6 px-8 min-h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">What's New?</h2>
      </div>

      <div className="space-y-4">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Latest Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-base">Version 1.0.0</h3>
                  <span className="text-sm text-muted-foreground">Released today</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">New Features:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                    <li>Settings window redesigned with macOS native styling</li>
                    <li>Improved window management</li>
                    <li>Enhanced theme system</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WhatsNewSettings
