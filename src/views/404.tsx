const NotFoundView = () => {
  return (
    <div className="view-container">
      <div className="flex flex-1 items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <div className="text-8xl mb-4">🔍</div>
            <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
            <h2 className="text-xl font-semibold text-muted-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Please check the URL or navigate back to a valid section.
            </p>
          </div>

          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
              Go to Chat
            </button>
            <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
              Go to Codebase
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-muted-foreground text-xs">
              <p className="mb-2">Quick Navigation:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <a href="#" className="px-2 py-1 text-xs text-muted-foreground hover:text-primary transition-colors border border-border rounded">
                  Chat
                </a>
                <a href="#" className="px-2 py-1 text-xs text-muted-foreground hover:text-primary transition-colors border border-border rounded">
                  Codebase
                </a>
                <a href="#" className="px-2 py-1 text-xs text-muted-foreground hover:text-primary transition-colors border border-border rounded">
                  Agents
                </a>
                <a href="#" className="px-2 py-1 text-xs text-muted-foreground hover:text-primary transition-colors border border-border rounded">
                  Git
                </a>
                <a href="#" className="px-2 py-1 text-xs text-muted-foreground hover:text-primary transition-colors border border-border rounded">
                  Hooks
                </a>
                <a href="#" className="px-2 py-1 text-xs text-muted-foreground hover:text-primary transition-colors border border-border rounded">
                  MCP
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="p-3 rounded-lg bg-muted border border-border">
              <div className="text-foreground text-sm font-medium mb-1">Need Help?</div>
              <div className="text-muted-foreground text-xs">
                Use <kbd className="px-1 py-0.5 bg-card border border-border rounded text-xs font-mono">Cmd+K</kbd> to open the command palette
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundView
