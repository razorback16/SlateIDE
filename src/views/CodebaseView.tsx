const CodebaseView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* File Explorer Panel */}
        <div className="panel" style={{width: '240px', borderRight: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-3 font-semibold text-foreground text-sm">Working Set</div>
            <div className="space-y-1">
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-accent hover:text-accent-foreground transition-colors">
                <span className="text-xs text-chart-1">◆</span>
                <span className="text-foreground text-sm">auth.ts</span>
                <span className="ml-auto text-muted-foreground text-xs">*</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-accent hover:text-accent-foreground transition-colors">
                <span className="text-xs text-chart-1">◆</span>
                <span className="text-foreground text-sm">user.ts</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-accent hover:text-accent-foreground transition-colors">
                <span className="text-xs text-chart-1">◆</span>
                <span className="text-foreground text-sm">api.ts</span>
                <span className="ml-auto text-muted-foreground text-xs">*</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">AI Suggested</div>
            <div className="space-y-1">
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 opacity-70 hover:bg-accent hover:text-accent-foreground hover:opacity-100 transition-all">
                <span className="text-xs text-muted-foreground">○</span>
                <span className="text-muted-foreground text-sm">types.ts</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 opacity-70 hover:bg-accent hover:text-accent-foreground hover:opacity-100 transition-all">
                <span className="text-xs text-muted-foreground">○</span>
                <span className="text-muted-foreground text-sm">config.ts</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Explorer</div>
            <div className="py-8 text-center text-muted-foreground text-xs opacity-50">
              File tree will be implemented with react-arborist
            </div>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="panel flex flex-1 flex-col">
          <div className="border-b border-border bg-muted/50">
            <div className="flex h-9 items-center">
              <div className="border-r border-border bg-card px-4 py-2 text-foreground text-sm font-medium shadow-sm">
                auth.ts
              </div>
              <div className="cursor-pointer border-r border-border px-4 py-2 text-muted-foreground text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                user.ts
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center bg-background">
            <div className="text-center">
              <div className="mb-4 text-6xl">📝</div>
              <div className="mb-2 text-lg text-foreground font-semibold">Monaco Editor</div>
              <div className="text-muted-foreground text-sm">Code editor will be implemented here</div>
              <div className="mt-4 px-4 py-2 bg-muted rounded-lg border border-border">
                <div className="text-xs text-muted-foreground">
                  Syntax highlighting • IntelliSense • Git integration
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Context Panel */}
        <div className="panel" style={{width: '320px', borderLeft: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-3 font-semibold text-foreground text-sm">Outline</div>
            <div className="space-y-1 text-sm">
              <div className="pl-2 text-muted-foreground">├─ Functions</div>
              <div className="pl-4 text-foreground hover:text-primary cursor-pointer transition-colors">├─ authenticate()</div>
              <div className="pl-4 text-foreground hover:text-primary cursor-pointer transition-colors">└─ validateUser()</div>
              <div className="pl-2 text-muted-foreground">├─ Classes</div>
              <div className="pl-4 text-foreground hover:text-primary cursor-pointer transition-colors">└─ AuthService</div>
              <div className="pl-2 text-muted-foreground">└─ Exports</div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Related Files</div>
            <div className="space-y-1">
              <div className="cursor-pointer text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-chart-2">•</span>
                <span>login.ts</span>
              </div>
              <div className="cursor-pointer text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-chart-2">•</span>
                <span>session.ts</span>
              </div>
              <div className="cursor-pointer text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-chart-2">•</span>
                <span>middleware.ts</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Quick Actions</div>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded transition-colors">
                Format Document
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded transition-colors">
                Organize Imports
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded transition-colors">
                Find References
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodebaseView
