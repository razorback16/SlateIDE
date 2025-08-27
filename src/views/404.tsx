import { Button } from '@/components/ui/button'

const NotFoundView = () => {
  return (
    <div className="view-container">
      <div className="flex flex-1 items-center justify-center bg-background">
        <div className="mx-auto max-w-md p-8 text-center">
          <div className="mb-8">
            <div className="mb-4 text-8xl">🔍</div>
            <h1 className="mb-2 font-bold text-4xl text-foreground">404</h1>
            <h2 className="mb-4 font-semibold text-muted-foreground text-xl">Page Not Found</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Please check the URL or
              navigate back to a valid section.
            </p>
          </div>

          <div className="space-y-3">
            <Button className="w-full">Go to Chat</Button>
            <Button variant="outline" className="w-full">
              Go to Codebase
            </Button>
          </div>

          <div className="mt-8 border-border border-t pt-6">
            <div className="text-muted-foreground text-xs">
              <p className="mb-2">Quick Navigation:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Chat
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Codebase
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Agents
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Git
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Hooks
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  MCP
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="rounded-lg border border-border bg-muted p-3">
              <div className="mb-1 font-medium text-foreground text-sm">Need Help?</div>
              <div className="text-muted-foreground text-xs">
                Use{' '}
                <kbd className="rounded border border-border bg-card px-1 py-0.5 font-mono text-xs">
                  Cmd+K
                </kbd>{' '}
                to open the command palette
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundView
