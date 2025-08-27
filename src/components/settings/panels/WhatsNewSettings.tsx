
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const WhatsNewSettings = () => {
  return (
    <div className='min-h-full p-6 px-8'>
      <div className="mb-6">
        <h2 className='font-semibold text-foreground text-xl'>What's New?</h2>
      </div>

      <div className="space-y-4">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Latest Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className='border-primary border-l-2 pl-4'>
                <div className='mb-2 flex items-center justify-between'>
                  <h3 className="font-semibold text-base">Version 1.0.0</h3>
                  <span className='text-muted-foreground text-sm'>Released today</span>
                </div>
                <div>
                  <h4 className='mb-2 font-medium text-sm'>New Features:</h4>
                  <ul className='list-inside list-disc space-y-1 text-muted-foreground text-sm'>
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
