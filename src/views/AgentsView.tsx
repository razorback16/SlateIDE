const AgentsView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* Agents List Panel */}
        <div className="panel" style={{width: '280px', borderRight: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">Active Agents</div>
            <div className="space-y-3">
              <div className='flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-sm'>
                  C
                </div>
                <div className="flex-1">
                  <div className='font-medium text-foreground text-sm'>Claude</div>
                  <div className="text-muted-foreground text-xs">Main Assistant</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-2" />
              </div>

              <div className='flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-chart-3 font-medium text-sm text-white'>
                  T
                </div>
                <div className="flex-1">
                  <div className='font-medium text-foreground text-sm'>TypeScript Agent</div>
                  <div className="text-muted-foreground text-xs">Code Analysis</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-3" />
              </div>

              <div className='flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 opacity-60 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-sm'>
                  G
                </div>
                <div className="flex-1">
                  <div className='font-medium text-muted-foreground text-sm'>Git Agent</div>
                  <div className="text-muted-foreground text-xs">Offline</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Available Agents</div>
            <div className="space-y-2">
              <div className='flex cursor-pointer items-center justify-between rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <span className="text-muted-foreground text-sm">Database Agent</span>
                <button type="button" className='text-primary text-xs hover:text-primary/80'>Add</button>
              </div>
              <div className='flex cursor-pointer items-center justify-between rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <span className="text-muted-foreground text-sm">API Agent</span>
                <button type="button" className='text-primary text-xs hover:text-primary/80'>Add</button>
              </div>
              <div className='flex cursor-pointer items-center justify-between rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <span className="text-muted-foreground text-sm">Testing Agent</span>
                <button type="button" className='text-primary text-xs hover:text-primary/80'>Add</button>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Details Panel */}
        <div className="panel flex flex-1 flex-col">
          <div className='border-border border-b bg-muted/50 p-4'>
            <div className="flex items-center gap-3">
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary font-medium text-lg text-primary-foreground'>
                C
              </div>
              <div>
                <h2 className='font-semibold text-foreground text-lg'>Claude</h2>
                <p className="text-muted-foreground text-sm">Main Assistant Agent</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground text-xs">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-2xl">
              <div className="mb-6">
                <h3 className='mb-2 font-semibold text-foreground text-sm'>Capabilities</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className='rounded-lg border border-border bg-card p-3'>
                    <div className='font-medium text-foreground text-sm'>Code Analysis</div>
                    <div className="text-muted-foreground text-xs">TypeScript, JavaScript, Python</div>
                  </div>
                  <div className='rounded-lg border border-border bg-card p-3'>
                    <div className='font-medium text-foreground text-sm'>Documentation</div>
                    <div className="text-muted-foreground text-xs">Auto-generate docs</div>
                  </div>
                  <div className='rounded-lg border border-border bg-card p-3'>
                    <div className='font-medium text-foreground text-sm'>Debugging</div>
                    <div className="text-muted-foreground text-xs">Error analysis & fixes</div>
                  </div>
                  <div className='rounded-lg border border-border bg-card p-3'>
                    <div className='font-medium text-foreground text-sm'>Refactoring</div>
                    <div className="text-muted-foreground text-xs">Code optimization</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className='mb-2 font-semibold text-foreground text-sm'>Recent Activity</h3>
                <div className="space-y-3">
                  <div className='flex items-center gap-3 rounded-lg border border-border bg-card p-3'>
                    <div className="h-2 w-2 rounded-full bg-chart-2" />
                    <div className="flex-1">
                      <div className="text-foreground text-sm">Analyzed auth.ts</div>
                      <div className="text-muted-foreground text-xs">2 minutes ago</div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 rounded-lg border border-border bg-card p-3'>
                    <div className="h-2 w-2 rounded-full bg-chart-3" />
                    <div className="flex-1">
                      <div className="text-foreground text-sm">Generated documentation</div>
                      <div className="text-muted-foreground text-xs">5 minutes ago</div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 rounded-lg border border-border bg-card p-3'>
                    <div className="h-2 w-2 rounded-full bg-chart-4" />
                    <div className="flex-1">
                      <div className="text-foreground text-sm">Fixed TypeScript errors</div>
                      <div className="text-muted-foreground text-xs">12 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='mb-2 font-semibold text-foreground text-sm'>Configuration</h3>
                <div className="space-y-3">
                  <div className='flex items-center justify-between rounded-lg border border-border bg-card p-3'>
                    <span className="text-foreground text-sm">Auto-suggestions</span>
                    <div className='relative h-5 w-9 rounded-full bg-primary'>
                      <div className='absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-white' />
                    </div>
                  </div>
                  <div className='flex items-center justify-between rounded-lg border border-border bg-card p-3'>
                    <span className="text-foreground text-sm">Real-time analysis</span>
                    <div className='relative h-5 w-9 rounded-full bg-primary'>
                      <div className='absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-white' />
                    </div>
                  </div>
                  <div className='flex items-center justify-between rounded-lg border border-border bg-card p-3'>
                    <span className="text-foreground text-sm">Debug mode</span>
                    <div className='relative h-5 w-9 rounded-full bg-muted'>
                      <div className='absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white' />
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
