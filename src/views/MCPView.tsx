import { Button } from '@/components/ui/button'

const MCPView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* MCP Servers Panel */}
        <div
          className="panel"
          style={{ width: '300px', borderRight: '1px solid var(--color-border)' }}
        >
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">MCP Servers</div>
            <div className="space-y-3">
              <div className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-sm">
                  FS
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground text-sm">Filesystem</div>
                  <div className="text-muted-foreground text-xs">File operations</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-2" />
              </div>

              <div className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-3 font-medium text-sm text-white">
                  DB
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground text-sm">Database</div>
                  <div className="text-muted-foreground text-xs">SQL operations</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-2" />
              </div>

              <div className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent hover:text-accent-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-4 font-medium text-sm text-white">
                  API
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground text-sm">REST API</div>
                  <div className="text-muted-foreground text-xs">HTTP requests</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-2" />
              </div>

              <div className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 opacity-60 transition-colors hover:bg-accent hover:text-accent-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-sm">
                  GH
                </div>
                <div className="flex-1">
                  <div className="font-medium text-muted-foreground text-sm">GitHub</div>
                  <div className="text-muted-foreground text-xs">Disconnected</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Available Servers</div>
            <div className="space-y-2">
              <div className="flex cursor-pointer items-center justify-between rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <span className="text-muted-foreground text-sm">Slack</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  Connect
                </Button>
              </div>
              <div className="flex cursor-pointer items-center justify-between rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <span className="text-muted-foreground text-sm">Discord</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  Connect
                </Button>
              </div>
              <div className="flex cursor-pointer items-center justify-between rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <span className="text-muted-foreground text-sm">Notion</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  Connect
                </Button>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button className="w-full">Add Server</Button>
              <Button variant="outline" className="w-full">
                Refresh All
              </Button>
            </div>
          </div>
        </div>

        {/* Server Details Panel */}
        <div className="panel flex flex-1 flex-col">
          <div className="border-border border-b bg-muted/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-medium text-lg text-primary-foreground">
                FS
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-lg">Filesystem Server</h2>
                <p className="text-muted-foreground text-sm">
                  File system operations and management
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground text-xs">Connected</span>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-4xl">
              <div className="mb-6">
                <h3 className="mb-3 font-semibold text-foreground text-sm">Available Tools</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="cursor-pointer rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50">
                    <div className="mb-1 font-medium text-foreground text-sm">read_file</div>
                    <div className="text-muted-foreground text-xs">Read file contents</div>
                  </div>
                  <div className="cursor-pointer rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50">
                    <div className="mb-1 font-medium text-foreground text-sm">write_file</div>
                    <div className="text-muted-foreground text-xs">Write to file</div>
                  </div>
                  <div className="cursor-pointer rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50">
                    <div className="mb-1 font-medium text-foreground text-sm">list_directory</div>
                    <div className="text-muted-foreground text-xs">List directory contents</div>
                  </div>
                  <div className="cursor-pointer rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50">
                    <div className="mb-1 font-medium text-foreground text-sm">create_directory</div>
                    <div className="text-muted-foreground text-xs">Create new directory</div>
                  </div>
                  <div className="cursor-pointer rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50">
                    <div className="mb-1 font-medium text-foreground text-sm">delete_file</div>
                    <div className="text-muted-foreground text-xs">Delete file or directory</div>
                  </div>
                  <div className="cursor-pointer rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50">
                    <div className="mb-1 font-medium text-foreground text-sm">move_file</div>
                    <div className="text-muted-foreground text-xs">Move or rename file</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 font-semibold text-foreground text-sm">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                    <div className="h-2 w-2 rounded-full bg-chart-2" />
                    <div className="flex-1">
                      <div className="text-foreground text-sm">read_file: /src/auth.ts</div>
                      <div className="text-muted-foreground text-xs">2 minutes ago</div>
                    </div>
                    <div className="font-mono text-chart-2 text-xs">200 OK</div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                    <div className="h-2 w-2 rounded-full bg-chart-3" />
                    <div className="flex-1">
                      <div className="text-foreground text-sm">write_file: /src/types.ts</div>
                      <div className="text-muted-foreground text-xs">5 minutes ago</div>
                    </div>
                    <div className="font-mono text-chart-2 text-xs">201 Created</div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                    <div className="h-2 w-2 rounded-full bg-chart-4" />
                    <div className="flex-1">
                      <div className="text-foreground text-sm">list_directory: /src</div>
                      <div className="text-muted-foreground text-xs">8 minutes ago</div>
                    </div>
                    <div className="font-mono text-chart-2 text-xs">200 OK</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 font-semibold text-foreground text-sm">Server Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-card p-3">
                      <div className="mb-1 font-medium text-foreground text-sm">Base Path</div>
                      <div className="font-mono text-muted-foreground text-xs">
                        /Users/user/project
                      </div>
                    </div>
                    <div className="rounded-lg border border-border bg-card p-3">
                      <div className="mb-1 font-medium text-foreground text-sm">Max File Size</div>
                      <div className="text-muted-foreground text-xs">10 MB</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-card p-3">
                      <div className="mb-1 font-medium text-foreground text-sm">
                        Allowed Extensions
                      </div>
                      <div className="text-muted-foreground text-xs">.ts, .js, .json, .md</div>
                    </div>
                    <div className="rounded-lg border border-border bg-card p-3">
                      <div className="mb-1 font-medium text-foreground text-sm">Read Only</div>
                      <div className="text-muted-foreground text-xs">Disabled</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-foreground text-sm">Permissions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                    <span className="text-foreground text-sm">Read files</span>
                    <div className="relative h-5 w-9 rounded-full bg-primary">
                      <div className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                    <span className="text-foreground text-sm">Write files</span>
                    <div className="relative h-5 w-9 rounded-full bg-primary">
                      <div className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                    <span className="text-foreground text-sm">Delete files</span>
                    <div className="relative h-5 w-9 rounded-full bg-muted">
                      <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                    <span className="text-foreground text-sm">Execute commands</span>
                    <div className="relative h-5 w-9 rounded-full bg-muted">
                      <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MCP Protocol Panel */}
        <div
          className="panel"
          style={{ width: '320px', borderLeft: '1px solid var(--color-border)' }}
        >
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">Protocol Info</div>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="mb-1 font-medium text-foreground text-sm">Version</div>
                <div className="text-muted-foreground text-xs">MCP 1.0.0</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="mb-1 font-medium text-foreground text-sm">Transport</div>
                <div className="text-muted-foreground text-xs">WebSocket</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="mb-1 font-medium text-foreground text-sm">Encoding</div>
                <div className="text-muted-foreground text-xs">JSON-RPC 2.0</div>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Statistics</div>
            <div className="space-y-2">
              <div className="flex justify-between p-2">
                <span className="text-muted-foreground text-sm">Total Requests</span>
                <span className="font-medium text-foreground text-sm">1,247</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="text-muted-foreground text-sm">Success Rate</span>
                <span className="font-medium text-chart-2 text-sm">98.5%</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="text-muted-foreground text-sm">Avg Response</span>
                <span className="font-medium text-foreground text-sm">45ms</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="text-muted-foreground text-sm">Uptime</span>
                <span className="font-medium text-chart-2 text-sm">99.9%</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Quick Actions</div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Test Connection
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Logs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Export Config
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                Disconnect
              </Button>
            </div>

            <div className="mt-6">
              <div className="rounded-lg border border-border bg-muted p-3">
                <div className="mb-1 font-medium text-foreground text-sm">Connection Status</div>
                <div className="mb-2 text-muted-foreground text-xs">
                  4 servers connected • 1 offline
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground text-xs">All systems operational</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="mb-1 font-medium text-foreground text-sm">Documentation</div>
                <div className="space-y-1">
                  <Button
                    variant="link"
                    className="h-auto justify-start p-0 text-muted-foreground text-xs"
                  >
                    MCP Protocol Spec
                  </Button>
                  <Button
                    variant="link"
                    className="h-auto justify-start p-0 text-muted-foreground text-xs"
                  >
                    Server Development
                  </Button>
                  <Button
                    variant="link"
                    className="h-auto justify-start p-0 text-muted-foreground text-xs"
                  >
                    Troubleshooting
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MCPView
