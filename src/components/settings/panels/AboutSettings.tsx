import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const AboutSettings = () => {
  return (
    <div className="p-6 px-8 min-h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">About</h2>
      </div>

      <div className="space-y-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <img src="/images/app-icon.png" alt="App Icon" width="64" height="64" className="rounded-lg" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">Slate IDE</h3>
                <p className="text-sm text-muted-foreground mb-2">Version 1.0.0</p>
                <p className="text-sm text-muted-foreground">
                  A modern desktop IDE built with Tauri, React, and TypeScript.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-1 border-b border-border last:border-b-0">
                <span className="text-sm text-muted-foreground">Platform:</span>
                <span className="text-sm font-medium text-foreground">macOS</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-border last:border-b-0">
                <span className="text-sm text-muted-foreground">Architecture:</span>
                <span className="text-sm font-medium text-foreground">arm64</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">Tauri:</span>
                <span className="text-sm font-medium text-foreground">2.2.5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Legal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start p-2 h-auto">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="justify-start p-2 h-auto">
                Terms of Service
              </Button>
              <Button variant="ghost" className="justify-start p-2 h-auto">
                Open Source Licenses
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AboutSettings
