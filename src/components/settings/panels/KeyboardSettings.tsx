import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Shortcut {
  action: string
  key: string
  description: string
}

const shortcuts: Shortcut[] = [
  { action: 'Command Palette', key: '⌘K', description: 'Open command palette' },
  { action: 'Switch Views', key: '⌘1-7', description: 'Switch between different views' },
  { action: 'Quick File Search', key: '⌘⇧P', description: 'Search for files in project' },
  { action: 'Global Search', key: '⌘⇧F', description: 'Search across all files' },
  { action: 'Settings', key: '⌘,', description: 'Open settings window' },
  { action: 'Toggle Developer Tools', key: '⌘⌥I', description: 'Open/close developer tools' },
  { action: 'Force Reload', key: '⌘⇧R', description: 'Force reload the application' },
]

const KeyboardSettings = () => {
  return (
    <div className='min-h-full p-6 px-8'>
      <div className="mb-6">
        <h2 className='font-semibold text-foreground text-xl'>Keyboard Shortcuts</h2>
      </div>

      <div className="space-y-4">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Application Shortcuts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shortcuts.map((shortcut) => (
                <div key={shortcut.action} className='flex items-center justify-between border-border border-b py-2 last:border-b-0'>
                  <div className="flex flex-col gap-1">
                    <span className='font-medium text-foreground text-sm'>{shortcut.action}</span>
                    <span className='text-muted-foreground text-xs'>{shortcut.description}</span>
                  </div>
                  <kbd className='inline-block rounded border border-border bg-muted px-2 py-1 font-mono text-foreground text-xs shadow-sm'>
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default KeyboardSettings