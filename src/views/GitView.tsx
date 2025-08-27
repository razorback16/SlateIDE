import { Button } from '@/components/ui/button'

const GitView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* Git Status Panel */}
        <div
          className="panel"
          style={{ width: '300px', borderRight: '1px solid var(--color-border)' }}
        >
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-semibold text-foreground text-sm">Repository Status</div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-chart-2" />
                <span className="text-muted-foreground text-xs">Clean</span>
              </div>
            </div>

            <div className="mb-6 rounded-lg border border-border bg-card p-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-medium text-foreground text-sm">main</span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs">origin/main</span>
              </div>
              <div className="text-muted-foreground text-xs">Last commit: 2 hours ago</div>
            </div>

            <div className="mb-4 font-semibold text-foreground text-sm">Changes</div>
            <div className="space-y-2">
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <span className="font-mono text-chart-3 text-xs">M</span>
                <span className="text-foreground text-sm">src/auth.ts</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <span className="font-mono text-chart-2 text-xs">A</span>
                <span className="text-foreground text-sm">src/types.ts</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <span className="font-mono text-destructive text-xs">D</span>
                <span className="text-foreground text-sm">src/old-auth.ts</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Staged Changes</div>
            <div className="space-y-2">
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <span className="font-mono text-chart-2 text-xs">A</span>
                <span className="text-foreground text-sm">src/utils.ts</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button className="w-full">Commit Changes</Button>
              <Button variant="outline" className="w-full">
                Stage All
              </Button>
            </div>
          </div>
        </div>

        {/* Git History Panel */}
        <div className="panel flex flex-1 flex-col">
          <div className="border-border border-b bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground text-lg">Commit History</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  Branch
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              <div className="flex cursor-pointer gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <div className="mt-2 h-8 w-px bg-border" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm">
                      Fix authentication bug
                    </span>
                    <span className="font-mono text-muted-foreground text-xs">#a1b2c3d</span>
                  </div>
                  <div className="mb-2 text-muted-foreground text-xs">
                    Updated auth validation and added proper error handling
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground text-xs">
                    <span>John Doe</span>
                    <span>2 hours ago</span>
                    <div className="flex items-center gap-1">
                      <span className="text-chart-2">+15</span>
                      <span className="text-destructive">-8</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex cursor-pointer gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-chart-2" />
                  <div className="mt-2 h-8 w-px bg-border" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm">
                      Add TypeScript types
                    </span>
                    <span className="font-mono text-muted-foreground text-xs">#e4f5g6h</span>
                  </div>
                  <div className="mb-2 text-muted-foreground text-xs">
                    Added comprehensive type definitions for better type safety
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground text-xs">
                    <span>Jane Smith</span>
                    <span>5 hours ago</span>
                    <div className="flex items-center gap-1">
                      <span className="text-chart-2">+42</span>
                      <span className="text-destructive">-3</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex cursor-pointer gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-chart-3" />
                  <div className="mt-2 h-8 w-px bg-border" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm">
                      Refactor user management
                    </span>
                    <span className="font-mono text-muted-foreground text-xs">#i7j8k9l</span>
                  </div>
                  <div className="mb-2 text-muted-foreground text-xs">
                    Simplified user management logic and improved performance
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground text-xs">
                    <span>Bob Johnson</span>
                    <span>1 day ago</span>
                    <div className="flex items-center gap-1">
                      <span className="text-chart-2">+28</span>
                      <span className="text-destructive">-35</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex cursor-pointer gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-chart-4" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm">Initial commit</span>
                    <span className="font-mono text-muted-foreground text-xs">#m0n1o2p</span>
                  </div>
                  <div className="mb-2 text-muted-foreground text-xs">
                    Project setup with basic structure and dependencies
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground text-xs">
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
        <div
          className="panel"
          style={{ width: '280px', borderLeft: '1px solid var(--color-border)' }}
        >
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">Quick Actions</div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Pull from Origin
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Push to Origin
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Create Branch
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Merge Branch
              </Button>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Branches</div>
            <div className="space-y-1">
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-medium text-foreground text-sm">main</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <div className="h-2 w-2 rounded-full bg-chart-3" />
                <span className="text-muted-foreground text-sm">feature/auth-fix</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <div className="h-2 w-2 rounded-full bg-chart-4" />
                <span className="text-muted-foreground text-sm">develop</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Remote</div>
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="mb-1 font-medium text-foreground text-sm">origin</div>
              <div className="break-all font-mono text-muted-foreground text-xs">
                git@github.com:user/repo.git
              </div>
              <div className="mt-2 flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-chart-2" />
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
