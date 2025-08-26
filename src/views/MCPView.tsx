const MCPView = () => {
  return (
    <div className="view-container">
      <div className="flex items-center justify-between border-subtle border-b p-4">
        <h2 className="font-semibold text-lg text-primary">MCP Servers</h2>
        <button type="button" className="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
          + Add Server
        </button>
      </div>

      <div className="panel-container">
        {/* Server List Panel */}
        <div className="panel" style={{width: '320px', borderRight: '1px solid var(--border-subtle)'}}>
          <div className="p-4">
            <div className="mb-3 font-semibold text-secondary text-sm">Project Scope</div>
            <div className="space-y-2">
              <div className="cursor-pointer rounded border border-subtle bg-elevated p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent-success" />
                  <span className="font-medium text-primary text-sm">Database</span>
                </div>
              </div>
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent-warning" />
                  <span className="font-medium text-primary text-sm">GitHub API</span>
                </div>
              </div>
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent-error" />
                  <span className="font-medium text-primary text-sm">Slack</span>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-secondary text-sm">User Scope</div>
            <div className="space-y-2">
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent-success" />
                  <span className="font-medium text-primary text-sm">Calculator</span>
                </div>
              </div>
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent-success" />
                  <span className="font-medium text-primary text-sm">Weather</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-subtle border-t pt-4">
              <button type="button" className="mr-2 rounded border border-subtle px-3 py-1 text-secondary text-xs hover:bg-hover">
                Import
              </button>
              <button type="button" className="rounded border border-subtle px-3 py-1 text-secondary text-xs hover:bg-hover">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Server Details Panel */}
        <div className="panel flex-1">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="mb-2 font-semibold text-primary text-xl">Database Server</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent-success" />
                  <span className="text-secondary">Status: Connected</span>
                </span>
                <span className="text-secondary">Scope: Project</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="mb-3 font-semibold text-primary text-sm">Configuration</h4>
              <div className="rounded-lg border border-subtle bg-elevated p-4">
                <div className="space-y-3">
                  <div>
                    <label for="mcp-url" className="text-secondary text-xs">URL</label>
                    <input
                      id="mcp-url"
                      type="text"
                      value="postgres://localhost:5432"
                      className="mt-1 w-full rounded border border-subtle bg-primary px-3 py-2 text-primary text-sm"
                      readonly
                    />
                  </div>
                  <div>
                    <span className="text-secondary text-xs">Authentication</span>
                    <button type="button" className="mt-1 rounded border border-subtle bg-primary px-3 py-2 text-secondary text-sm hover:text-primary">
                      Configure...
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="mb-3 font-semibold text-primary text-sm">Available Resources</h4>
              <div className="space-y-2">
                <div className="text-secondary text-sm">• users_table (read/write)</div>
                <div className="text-secondary text-sm">• posts_table (read/write)</div>
                <div className="text-secondary text-sm">• comments_table (read/write)</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="mb-3 font-semibold text-primary text-sm">Prompts</h4>
              <div className="space-y-2">
                <div className="font-mono text-secondary text-sm">• query_database(sql: string)</div>
                <div className="font-mono text-secondary text-sm">• backup_data()</div>
                <div className="font-mono text-secondary text-sm">• migrate_schema()</div>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-primary text-sm">Access Control</h4>
              <div className="flex gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" checked className="accent-accent-primary" />
                  <span>Claude Code</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" checked className="accent-accent-primary" />
                  <span>Testing Agent</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" className="accent-accent-primary" />
                  <span>Docs Agent</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MCPView
