const GitView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* Git Status Panel */}
        <div className="panel" style={{width: '300px', borderRight: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-semibold text-foreground text-sm">Repository Status</div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                <span className="text-muted-foreground text-xs">Clean</span>
              </div>
            </div>

            <div className="mb-6 p-3 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-foreground text-sm font-medium">main</span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs">origin/main</span>
              </div>
              <div className="text-muted-foreground text-xs">
                Last commit: 2 hours ago
              </div>
            </div>

            <div className="mb-4 font-semibold text-foreground text-sm">Changes</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <span className="text-chart-3 text-xs font-mono">M</span>
                <span className="text-foreground text-sm">src/auth.ts</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <span className="text-chart-2 text-xs font-mono">A</span>
                <span className="text-foreground text-sm">src/types.ts</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <span className="text-destructive text-xs font-mono">D</span>
                <span className="text-foreground text-sm">src/old-auth.ts</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Staged Changes</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <span className="text-chart-2 text-xs font-mono">A</span>
                <span className="text-foreground text-sm">src/utils.ts</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:opacity-90 transition-opacity">
                Commit Changes
              </button>
              <button className="w-full px-3 py-2 border border-border text-foreground rounded text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                Stage All
              </button>
            </div>
          </div>
        </div>

        {/* Git History Panel */}
        <div className="panel flex flex-1 flex-col">
          <div className="border-b border-border p-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <h2 className="text-foreground text-lg font-semibold">Commit History</h2>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground border border-border rounded hover:bg-accent transition-colors">
                  Refresh
                </button>
                <button className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground border border-border rounded hover:bg-accent transition-colors">
                  Branch
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              <div className="flex gap-3 p-4 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <div className="w-px h-8 bg-border mt-2"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-foreground text-sm font-medium">Fix authentication bug</span>
                    <span className="text-muted-foreground text-xs font-mono">#a1b2c3d</span>
                  </div>
                  <div className="text-muted-foreground text-xs mb-2">
                    Updated auth validation and added proper error handling
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>John Doe</span>
                    <span>2 hours ago</span>
                    <div className="flex items-center gap-1">
                      <span className="text-chart-2">+15</span>
                      <span className="text-destructive">-8</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-chart-2"></div>
                  <div className="w-px h-8 bg-border mt-2"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-foreground text-sm font-medium">Add TypeScript types</span>
                    <span className="text-muted-foreground text-xs font-mono">#e4f5g6h</span>
                  </div>
                  <div className="text-muted-foreground text-xs mb-2">
                    Added comprehensive type definitions for better type safety
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Jane Smith</span>
                    <span>5 hours ago</span>
                    <div className="flex items-center gap-1">
                      <span className="text-chart-2">+42</span>
                      <span className="text-destructive">-3</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-chart-3"></div>
                  <div className="w-px h-8 bg-border mt-2"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-foreground text-sm font-medium">Refactor user management</span>
                    <span className="text-muted-foreground text-xs font-mono">#i7j8k9l</span>
                  </div>
                  <div className="text-muted-foreground text-xs mb-2">
                    Simplified user management logic and improved performance
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Bob Johnson</span>
                    <span>1 day ago</span>
                    <div className="flex items-center gap-1">
                      <span className="text-chart-2">+28</span>
                      <span className="text-destructive">-35</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-chart-4"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-foreground text-sm font-medium">Initial commit</span>
                    <span className="text-muted-foreground text-xs font-mono">#m0n1o2p</span>
                  </div>
                  <div className="text-muted-foreground text-xs mb-2">
                    Project setup with basic structure and dependencies
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>John Doe</span>
                    <span>3 days ago</span>
                    <div className="flex items-center gap-1">
                      <span className="text-chart-2">+156</span>
                      <span className="text-destructive">-0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Git Actions Panel */}
        <div className="panel" style={{width: '280px', borderLeft: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">Quick Actions</div>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded transition-colors border border-border">
                Pull from Origin
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded transition-colors border border-border">
                Push to Origin
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded transition-colors border border-border">
                Create Branch
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded transition-colors border border-border">
                Merge Branch
              </button>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Branches</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span className="text-foreground text-sm font-medium">main</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div className="h-2 w-2 rounded-full bg-chart-3"></div>
                <span className="text-muted-foreground text-sm">feature/auth-fix</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div className="h-2 w-2 rounded-full bg-chart-4"></div>
                <span className="text-muted-foreground text-sm">develop</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Remote</div>
            <div className="p-3 rounded-lg bg-card border border-border">
              <div className="text-foreground text-sm font-medium mb-1">origin</div>
              <div className="text-muted-foreground text-xs font-mono break-all">
                git@github.com:user/repo.git
              </div>
              <div className="mt-2 flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                <span className="text-muted-foreground text-xs">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitView
