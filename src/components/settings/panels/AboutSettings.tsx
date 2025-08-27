import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SlateLogo from '@/components/common/SlateLogo'

const AboutSettings = () => {
  return (
    <div className="min-h-full p-6 px-8">
      <div className="mb-6">
        <h2 className="font-semibold text-foreground text-xl">About</h2>
      </div>

      <div className="space-y-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                <SlateLogo width={64} height={64} className="rounded-lg" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">Slate IDE</h3>
                <p className="mb-2 text-muted-foreground text-sm">Version 1.0.0</p>
                <p className="text-muted-foreground text-sm">
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
              <div className="flex items-center justify-between border-border border-b py-1 last:border-b-0">
                <span className="text-muted-foreground text-sm">Platform:</span>
                <span className="font-medium text-foreground text-sm">macOS</span>
              </div>
              <div className="flex items-center justify-between border-border border-b py-1 last:border-b-0">
                <span className="text-muted-foreground text-sm">Architecture:</span>
                <span className="font-medium text-foreground text-sm">arm64</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground text-sm">Tauri:</span>
                <span className="font-medium text-foreground text-sm">2.2.5</span>
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
              <Button variant="ghost" className="h-auto justify-start p-2">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="h-auto justify-start p-2">
                Terms of Service
              </Button>
              <Button variant="ghost" className="h-auto justify-start p-2">
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
