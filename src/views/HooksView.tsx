const HooksView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* Hooks List Panel */}
        <div className="panel" style={{width: '280px', borderRight: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">Git Hooks</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div>
                  <div className="text-foreground text-sm font-medium">pre-commit</div>
                  <div className="text-muted-foreground text-xs">Lint & format</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-2"></div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div>
                  <div className="text-foreground text-sm font-medium">pre-push</div>
                  <div className="text-muted-foreground text-xs">Run tests</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-2"></div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer opacity-60">
                <div>
                  <div className="text-muted-foreground text-sm font-medium">commit-msg</div>
                  <div className="text-muted-foreground text-xs">Disabled</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Custom Hooks</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div>
                  <div className="text-foreground text-sm font-medium">deploy</div>
                  <div className="text-muted-foreground text-xs">Auto deploy</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-3"></div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div>
                  <div className="text-foreground text-sm font-medium">backup</div>
                  <div className="text-muted-foreground text-xs">Create backup</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-4"></div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:opacity-90 transition-opacity">
                Add Hook
              </button>
              <button className="w-full px-3 py-2 border border-border text-foreground rounded text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                Install Hooks
              </button>
            </div>
          </div>
        </div>

        {/* Hook Editor Panel */}
        <div className="panel flex flex-1 flex-col">
          <div className="border-b border-border p-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-foreground text-lg font-semibold">pre-commit</h2>
                <p className="text-muted-foreground text-sm">Runs before each commit</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                  <span className="text-muted-foreground text-xs">Active</span>
                </div>
                <button className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground border border-border rounded hover:bg-accent transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-4xl">
              <div className="mb-6">
                <h3 className="text-foreground text-sm font-semibold mb-3">Hook Script</h3>
                <div className="rounded-lg border border-border bg-muted p-4 font-mono text-sm">
                  <div className="text-muted-foreground mb-2">#!/bin/sh</div>
                  <div className="text-foreground mb-1"># Run linting</div>
                  <div className="text-chart-1 mb-1">npm run lint</div>
                  <div className="text-foreground mb-1"># Run formatting</div>
                  <div className="text-chart-1 mb-1">npm run format</div>
                  <div className="text-foreground mb-1"># Run type checking</div>
                  <div className="text-chart-1">npm run type-check</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-foreground text-sm font-semibold mb-3">Execution Log</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                    <div className="h-2 w-2 rounded-full bg-chart-2 mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-foreground text-sm font-medium">Success</span>
                        <span className="text-muted-foreground text-xs">2 minutes ago</span>
                      </div>
                      <div className="text-muted-foreground text-xs font-mono">
                        ✓ Linting passed<br/>
                        ✓ Formatting passed<br/>
                        ✓ Type checking passed
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                    <div className="h-2 w-2 rounded-full bg-chart-3 mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-foreground text-sm font-medium">Warning</span>
                        <span className="text-muted-foreground text-xs">1 hour ago</span>
                      </div>
                      <div className="text-muted-foreground text-xs font-mono">
                        ⚠ Linting warnings found<br/>
                        ✓ Formatting passed<br/>
                        ✓ Type checking passed
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                    <div className="h-2 w-2 rounded-full bg-destructive mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-foreground text-sm font-medium">Failed</span>
                        <span className="text-muted-foreground text-xs">3 hours ago</span>
                      </div>
                      <div className="text-muted-foreground text-xs font-mono">
                        ✗ Linting failed<br/>
                        ✓ Formatting passed<br/>
                        ✗ Type checking failed
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-foreground text-sm font-semibold mb-3">Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <span className="text-foreground text-sm">Enable hook</span>
                      <div className="h-5 w-9 bg-primary rounded-full relative">
                        <div className="h-4 w-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <span className="text-foreground text-sm">Fail on warnings</span>
                      <div className="h-5 w-9 bg-muted rounded-full relative">
                        <div className="h-4 w-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <span className="text-foreground text-sm">Auto-fix issues</span>
                      <div className="h-5 w-9 bg-primary rounded-full relative">
                        <div className="h-4 w-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                      <span className="text-foreground text-sm">Verbose output</span>
                      <div className="h-5 w-9 bg-muted rounded-full relative">
                        <div className="h-4 w-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hook Templates Panel */}
        <div className="panel" style={{width: '300px', borderLeft: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">Hook Templates</div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div className="text-foreground text-sm font-medium mb-1">Lint & Format</div>
                <div className="text-muted-foreground text-xs mb-2">
                  Run ESLint and Prettier on staged files
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-chart-1 text-xs">pre-commit</span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div className="text-foreground text-sm font-medium mb-1">Test Runner</div>
                <div className="text-muted-foreground text-xs mb-2">
                  Run unit tests before pushing
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-chart-2 text-xs">pre-push</span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div className="text-foreground text-sm font-medium mb-1">Commit Message</div>
                <div className="text-muted-foreground text-xs mb-2">
                  Validate commit message format
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-chart-3 text-xs">commit-msg</span>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div className="text-foreground text-sm font-medium mb-1">Security Scan</div>
                <div className="text-muted-foreground text-xs mb-2">
                  Check for security vulnerabilities
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-chart-4 text-xs">pre-push</span>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Documentation</div>
            <div className="space-y-2">
              <a href="#" className="block p-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                Git Hooks Guide
              </a>
              <a href="#" className="block p-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                Best Practices
              </a>
              <a href="#" className="block p-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                Troubleshooting
              </a>
            </div>

            <div className="mt-6">
              <div className="p-3 rounded-lg bg-muted border border-border">
                <div className="text-foreground text-sm font-medium mb-1">Hook Status</div>
                <div className="text-muted-foreground text-xs">
                  5 active hooks • 2 disabled
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                  <span className="text-muted-foreground text-xs">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HooksView
