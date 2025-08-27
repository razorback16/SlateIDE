import { Button } from '@/components/ui/button'

const HooksView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* Hooks List Panel */}
        <div className="panel" style={{width: '280px', borderRight: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">Git Hooks</div>
            <div className="space-y-2">
              <div className='flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <div>
                  <div className='font-medium text-foreground text-sm'>pre-commit</div>
                  <div className="text-muted-foreground text-xs">Lint & format</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-2" />
              </div>

              <div className='flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <div>
                  <div className='font-medium text-foreground text-sm'>pre-push</div>
                  <div className="text-muted-foreground text-xs">Run tests</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-2" />
              </div>

              <div className='flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-3 opacity-60 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <div>
                  <div className='font-medium text-muted-foreground text-sm'>commit-msg</div>
                  <div className="text-muted-foreground text-xs">Disabled</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Custom Hooks</div>
            <div className="space-y-2">
              <div className='flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <div>
                  <div className='font-medium text-foreground text-sm'>deploy</div>
                  <div className="text-muted-foreground text-xs">Auto deploy</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-3" />
              </div>

              <div className='flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <div>
                  <div className='font-medium text-foreground text-sm'>backup</div>
                  <div className="text-muted-foreground text-xs">Create backup</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-4" />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button type="button" className='w-full rounded bg-primary px-3 py-2 text-primary-foreground text-sm transition-opacity hover:opacity-90'>
                Add Hook
              </button>
              <button type="button" className='w-full rounded border border-border px-3 py-2 text-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground'>
                Install Hooks
              </button>
            </div>
          </div>
        </div>

        {/* Hook Editor Panel */}
        <div className="panel flex flex-1 flex-col">
          <div className='border-border border-b bg-muted/50 p-4'>
            <div className="flex items-center justify-between">
              <div>
                <h2 className='font-semibold text-foreground text-lg'>pre-commit</h2>
                <p className="text-muted-foreground text-sm">Runs before each commit</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground text-xs">Active</span>
                </div>
                <button type="button" className='rounded border border-border px-3 py-1 text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground'>
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-4xl">
              <div className="mb-6">
                <h3 className='mb-3 font-semibold text-foreground text-sm'>Hook Script</h3>
                <div className="rounded-lg border border-border bg-muted p-4 font-mono text-sm">
                  <div className='mb-2 text-muted-foreground'>#!/bin/sh</div>
                  <div className='mb-1 text-foreground'># Run linting</div>
                  <div className='mb-1 text-chart-1'>npm run lint</div>
                  <div className='mb-1 text-foreground'># Run formatting</div>
                  <div className='mb-1 text-chart-1'>npm run format</div>
                  <div className='mb-1 text-foreground'># Run type checking</div>
                  <div className="text-chart-1">npm run type-check</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className='mb-3 font-semibold text-foreground text-sm'>Execution Log</h3>
                <div className="space-y-2">
                  <div className='flex items-start gap-3 rounded-lg border border-border bg-card p-3'>
                    <div className='mt-2 h-2 w-2 rounded-full bg-chart-2' />
                    <div className="flex-1">
                      <div className='mb-1 flex items-center gap-2'>
                        <span className='font-medium text-foreground text-sm'>Success</span>
                        <span className="text-muted-foreground text-xs">2 minutes ago</span>
                      </div>
                      <div className='font-mono text-muted-foreground text-xs'>
                        ✓ Linting passed<br/>
                        ✓ Formatting passed<br/>
                        ✓ Type checking passed
                      </div>
                    </div>
                  </div>

                  <div className='flex items-start gap-3 rounded-lg border border-border bg-card p-3'>
                    <div className='mt-2 h-2 w-2 rounded-full bg-chart-3' />
                    <div className="flex-1">
                      <div className='mb-1 flex items-center gap-2'>
                        <span className='font-medium text-foreground text-sm'>Warning</span>
                        <span className="text-muted-foreground text-xs">1 hour ago</span>
                      </div>
                      <div className='font-mono text-muted-foreground text-xs'>
                        ⚠ Linting warnings found<br/>
                        ✓ Formatting passed<br/>
                        ✓ Type checking passed
                      </div>
                    </div>
                  </div>

                  <div className='flex items-start gap-3 rounded-lg border border-border bg-card p-3'>
                    <div className='mt-2 h-2 w-2 rounded-full bg-destructive' />
                    <div className="flex-1">
                      <div className='mb-1 flex items-center gap-2'>
                        <span className='font-medium text-foreground text-sm'>Failed</span>
                        <span className="text-muted-foreground text-xs">3 hours ago</span>
                      </div>
                      <div className='font-mono text-muted-foreground text-xs'>
                        ✗ Linting failed<br/>
                        ✓ Formatting passed<br/>
                        ✗ Type checking failed
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='mb-3 font-semibold text-foreground text-sm'>Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className='flex items-center justify-between rounded-lg border border-border bg-card p-3'>
                      <span className="text-foreground text-sm">Enable hook</span>
                      <div className='relative h-5 w-9 rounded-full bg-primary'>
                        <div className='absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-white' />
                      </div>
                    </div>
                    <div className='flex items-center justify-between rounded-lg border border-border bg-card p-3'>
                      <span className="text-foreground text-sm">Fail on warnings</span>
                      <div className='relative h-5 w-9 rounded-full bg-muted'>
                        <div className='absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white' />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className='flex items-center justify-between rounded-lg border border-border bg-card p-3'>
                      <span className="text-foreground text-sm">Auto-fix issues</span>
                      <div className='relative h-5 w-9 rounded-full bg-primary'>
                        <div className='absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-white' />
                      </div>
                    </div>
                    <div className='flex items-center justify-between rounded-lg border border-border bg-card p-3'>
                      <span className="text-foreground text-sm">Verbose output</span>
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

        {/* Hook Templates Panel */}
        <div className="panel" style={{width: '300px', borderLeft: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">Hook Templates</div>
            <div className="space-y-3">
              <div className='cursor-pointer rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <div className='mb-1 font-medium text-foreground text-sm'>Lint & Format</div>
                <div className='mb-2 text-muted-foreground text-xs'>
                  Run ESLint and Prettier on staged files
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-chart-1 text-xs">pre-commit</span>
                </div>
              </div>

              <div className='cursor-pointer rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <div className='mb-1 font-medium text-foreground text-sm'>Test Runner</div>
                <div className='mb-2 text-muted-foreground text-xs'>
                  Run unit tests before pushing
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-chart-2 text-xs">pre-push</span>
                </div>
              </div>

              <div className='cursor-pointer rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <div className='mb-1 font-medium text-foreground text-sm'>Commit Message</div>
                <div className='mb-2 text-muted-foreground text-xs'>
                  Validate commit message format
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-chart-3 text-xs">commit-msg</span>
                </div>
              </div>

              <div className='cursor-pointer rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground'>
                <div className='mb-1 font-medium text-foreground text-sm'>Security Scan</div>
                <div className='mb-2 text-muted-foreground text-xs'>
                  Check for security vulnerabilities
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-chart-4 text-xs">pre-push</span>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Documentation</div>
            <div className="space-y-2">
              <Button variant="ghost" className='h-auto w-full justify-start p-2 text-muted-foreground text-sm'>
                Git Hooks Guide
              </Button>
              <Button variant="ghost" className='h-auto w-full justify-start p-2 text-muted-foreground text-sm'>
                Best Practices
              </Button>
              <Button variant="ghost" className='h-auto w-full justify-start p-2 text-muted-foreground text-sm'>
                Troubleshooting
              </Button>
            </div>

            <div className="mt-6">
              <div className='rounded-lg border border-border bg-muted p-3'>
                <div className='mb-1 font-medium text-foreground text-sm'>Hook Status</div>
                <div className="text-muted-foreground text-xs">
                  5 active hooks • 2 disabled
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-chart-2" />
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
