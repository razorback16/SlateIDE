const MCPView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* MCP Servers Panel */}
        <div className="panel" style={{width: '300px', borderRight: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">MCP Servers</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                  FS
                </div>
                <div className="flex-1">
                  <div className="text-foreground text-sm font-medium">Filesystem</div>
                  <div className="text-muted-foreground text-xs">File operations</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-2"></div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-chart-3 flex items-center justify-center text-white text-sm font-medium">
                  DB
                </div>
                <div className="flex-1">
                  <div className="text-foreground text-sm font-medium">Database</div>
                  <div className="text-muted-foreground text-xs">SQL operations</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-2"></div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-chart-4 flex items-center justify-center text-white text-sm font-medium">
                  API
                </div>
                <div className="flex-1">
                  <div className="text-foreground text-sm font-medium">REST API</div>
                  <div className="text-muted-foreground text-xs">HTTP requests</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-chart-2"></div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer opacity-60">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
                  GH
                </div>
                <div className="flex-1">
                  <div className="text-muted-foreground text-sm font-medium">GitHub</div>
                  <div className="text-muted-foreground text-xs">Disconnected</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Available Servers</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <span className="text-muted-foreground text-sm">Slack</span>
                <button className="text-xs text-primary hover:text-primary/80">Connect</button>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <span className="text-muted-foreground text-sm">Discord</span>
                <button className="text-xs text-primary hover:text-primary/80">Connect</button>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <span className="text-muted-foreground text-sm">Notion</span>
                <button className="text-xs text-primary hover:text-primary/80">Connect</button>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:opacity-90 transition-opacity">
                Add Server
              </button>
              <button className="w-full px-3 py-2 border border-border text-foreground rounded text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                Refresh All
              </button>
            </div>
          </div>
        </div>

        {/* Server Details Panel */}
        <div className="panel flex flex-1 flex-col">
          <div className="border-b border-border p-4 bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg font-medium">
                FS
              </div>
              <div>
                <h2 className="text-foreground text-lg font-semibold">Filesystem Server</h2>
                <p className="text-muted-foreground text-sm">File system operations and management</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                  <span className="text-muted-foreground text-xs">Connected</span>
                </div>
                <button className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground border border-border rounded hover:bg-accent transition-colors">
                  Configure
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="max-w-4xl">
              <div className="mb-6">
                <h3 className="text-foreground text-sm font-semibold mb-3">Available Tools</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="text-foreground text-sm font-medium mb-1">read_file</div>
                    <div className="text-muted-foreground text-xs">Read file contents</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="text-foreground text-sm font-medium mb-1">write_file</div>
                    <div className="text-muted-foreground text-xs">Write to file</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="text-foreground text-sm font-medium mb-1">list_directory</div>
                    <div className="text-muted-foreground text-xs">List directory contents</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="text-foreground text-sm font-medium mb-1">create_directory</div>
                    <div className="text-muted-foreground text-xs">Create new directory</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="text-foreground text-sm font-medium mb-1">delete_file</div>
                    <div className="text-muted-foreground text-xs">Delete file or directory</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="text-foreground text-sm font-medium mb-1">move_file</div>
                    <div className="text-muted-foreground text-xs">Move or rename file</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-foreground text-sm font-semibold mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                    <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                    <div className="flex-1">
                      <div className="text-foreground text-sm">read_file: /src/auth.ts</div>
                      <div className="text-muted-foreground text-xs">2 minutes ago</div>
                    </div>
                    <div className="text-chart-2 text-xs font-mono">200 OK</div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                    <div className="h-2 w-2 rounded-full bg-chart-3"></div>
                    <div className="flex-1">
                      <div className="text-foreground text-sm">write_file: /src/types.ts</div>
                      <div className="text-muted-foreground text-xs">5 minutes ago</div>
                    </div>
                    <div className="text-chart-2 text-xs font-mono">201 Created</div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                    <div className="h-2 w-2 rounded-full bg-chart-4"></div>
                    <div className="flex-1">
                      <div className="text-foreground text-sm">list_directory: /src</div>
                      <div className="text-muted-foreground text-xs">8 minutes ago</div>
                    </div>
                    <div className="text-chart-2 text-xs font-mono">200 OK</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-foreground text-sm font-semibold mb-3">Server Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-card border border-border">
                      <div className="text-foreground text-sm font-medium mb-1">Base Path</div>
                      <div className="text-muted-foreground text-xs font-mono">/Users/user/project</div>
                    </div>
                    <div className="p-3 rounded-lg bg-card border border-border">
                      <div className="text-foreground text-sm font-medium mb-1">Max File Size</div>
                      <div className="text-muted-foreground text-xs">10 MB</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-card border border-border">
                      <div className="text-foreground text-sm font-medium mb-1">Allowed Extensions</div>
                      <div className="text-muted-foreground text-xs">.ts, .js, .json, .md</div>
                    </div>
                    <div className="p-3 rounded-lg bg-card border border-border">
                      <div className="text-foreground text-sm font-medium mb-1">Read Only</div>
                      <div className="text-muted-foreground text-xs">Disabled</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-foreground text-sm font-semibold mb-3">Permissions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-foreground text-sm">Read files</span>
                    <div className="h-5 w-9 bg-primary rounded-full relative">
                      <div className="h-4 w-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-foreground text-sm">Write files</span>
                    <div className="h-5 w-9 bg-primary rounded-full relative">
                      <div className="h-4 w-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-foreground text-sm">Delete files</span>
                    <div className="h-5 w-9 bg-muted rounded-full relative">
                      <div className="h-4 w-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                    <span className="text-foreground text-sm">Execute commands</span>
                    <div className="h-5 w-9 bg-muted rounded-full relative">
                      <div className="h-4 w-4 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MCP Protocol Panel */}
        <div className="panel" style={{width: '320px', borderLeft: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">Protocol Info</div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-card border border-border">
                <div className="text-foreground text-sm font-medium mb-1">Version</div>
                <div className="text-muted-foreground text-xs">MCP 1.0.0</div>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <div className="text-foreground text-sm font-medium mb-1">Transport</div>
                <div className="text-muted-foreground text-xs">WebSocket</div>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <div className="text-foreground text-sm font-medium mb-1">Encoding</div>
                <div className="text-muted-foreground text-xs">JSON-RPC 2.0</div>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Statistics</div>
            <div className="space-y-2">
              <div className="flex justify-between p-2">
                <span className="text-muted-foreground text-sm">Total Requests</span>
                <span className="text-foreground text-sm font-medium">1,247</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="text-muted-foreground text-sm">Success Rate</span>
                <span className="text-chart-2 text-sm font-medium">98.5%</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="text-muted-foreground text-sm">Avg Response</span>
                <span className="text-foreground text-sm font-medium">45ms</span>
              </div>
              <div className="flex justify-between p-2">
                <span className="text-muted-foreground text-sm">Uptime</span>
                <span className="text-chart-2 text-sm font-medium">99.9%</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Quick Actions</div>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded transition-colors border border-border">
                Test Connection
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded transition-colors border border-border">
                View Logs
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded transition-colors border border-border">
                Export Config
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive hover:text-destructive-foreground rounded transition-colors border border-border">
                Disconnect
              </button>
            </div>

            <div className="mt-6">
              <div className="p-3 rounded-lg bg-muted border border-border">
                <div className="text-foreground text-sm font-medium mb-1">Connection Status</div>
                <div className="text-muted-foreground text-xs mb-2">
                  4 servers connected • 1 offline
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                  <span className="text-muted-foreground text-xs">All systems operational</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="p-3 rounded-lg bg-card border border-border">
                <div className="text-foreground text-sm font-medium mb-1">Documentation</div>
                <div className="space-y-1">
                  <a href="#" className="block text-xs text-muted-foreground hover:text-primary transition-colors">
                    MCP Protocol Spec
                  </a>
                  <a href="#" className="block text-xs text-muted-foreground hover:text-primary transition-colors">
                    Server Development
                  </a>
                  <a href="#" className="block text-xs text-muted-foreground hover:text-primary transition-colors">
                    Troubleshooting
                  </a>
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
