const AgentsView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* Agents List Panel */}
        <div className="panel" style={{width: '280px', borderRight: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">Active Agents</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                  C
                </div>
                <div className="flex-1">
                  <div className="text-foreground text-sm font-medium">Claude</div>
                  <div className="text-muted-foreground text-xs">Main Assistant</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-2"></div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-chart-3 flex items-center justify-center text-white text-sm font-medium">
                  T
                </div>
                <div className="flex-1">
                  <div className="text-foreground text-sm font-medium">TypeScript Agent</div>
                  <div className="text-muted-foreground text-xs">Code Analysis</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-3"></div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer opacity-60">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
                  G
                </div>
                <div className="flex-1">
                  <div className="text-muted-foreground text-sm font-medium">Git Agent</div>
                  <div className="text-muted-foreground text-xs">Offline</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Available Agents</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <span className="text-muted-foreground text-sm">Database Agent</span>
                <button className="text-xs text-primary hover:text-primary/80">Add</button>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <span className="text-muted-foreground text-sm">API Agent</span>
                <button className="text-xs text-primary hover:text-primary/80">Add</button>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <span className="text-muted-foreground text-sm">Testing Agent</span>
                <button className="text-xs text-primary hover:text-primary/80">Add</button>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Details Panel */}
        <div className="panel flex flex-1 flex-col">
          <div className="border-b border-border p-4 bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg font-medium">
                C
              </div>
              <div>
                <h2 className="text-foreground text-lg font-semibold">Claude</h2>
                <p className="text-muted-foreground text-sm">Main Assistant Agent</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                  <span className="text-muted-foreground text-xs">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-2xl">
              <div className="mb-6">
                <h3 className="text-foreground text-sm font-semibold mb-2">Capabilities</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <div className="text-foreground text-sm font-medium">Code Analysis</div>
                    <div className="text-muted-foreground text-xs">TypeScript, JavaScript, Python</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <div className="text-foreground text-sm font-medium">Documentation</div>
                    <div className="text-muted-foreground text-xs">Auto-generate docs</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <div className="text-foreground text-sm font-medium">Debugging</div>
                    <div className="text-muted-foreground text-xs">Error analysis & fixes</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    <div className="text-foreground text-sm font-medium">Refactoring</div>
                    <div className="text-muted-foreground text-xs">Code optimization</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-foreground text-sm font-semibold mb-2">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                    <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                    <div className="flex-1">
                      <div className="text-foreground text-sm">Analyzed auth.ts</div>
                      <div className="text-muted-foreground text-xs">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                    <div className="h-2 w-2 rounded-full bg-chart-3"></div>
                    <div className="flex-1">
                      <div className="text-foreground text-sm">Generated documentation</div>
                      <div className="text-muted-foreground text-xs">5 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                    <div className="h-2 w-2 rounded-full bg-chart-4"></div>
                    <div className="flex-1">
                      <div className="text-foreground text-sm">Fixed TypeScript errors</div>
                      <div className="text-muted-foreground text-xs">12 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-foreground text-sm font-semibold mb-2">Configuration</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-foreground text-sm">Auto-suggestions</span>
                    <div className="h-5 w-9 bg-primary rounded-full relative">
                      <div className="h-4 w-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-foreground text-sm">Real-time analysis</span>
                    <div className="h-5 w-9 bg-primary rounded-full relative">
                      <div className="h-4 w-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-foreground text-sm">Debug mode</span>
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
    </div>
  )
}

export default AgentsView
