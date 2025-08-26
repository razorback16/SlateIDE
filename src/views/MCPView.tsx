import { Component } from 'solid-js'

const MCPView: Component = () => {
  return (
    <div class="view-container">
      <div class="flex items-center justify-between border-subtle border-b p-4">
        <h2 class="font-semibold text-lg text-primary">MCP Servers</h2>
        <button type="button" class="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
          + Add Server
        </button>
      </div>

      <div class="panel-container">
        {/* Server List Panel */}
        <div class="panel" style="width: 320px; border-right: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="mb-3 font-semibold text-secondary text-sm">Project Scope</div>
            <div class="space-y-2">
              <div class="cursor-pointer rounded border border-subtle bg-elevated p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <div class="h-2 w-2 rounded-full bg-accent-success" />
                  <span class="font-medium text-primary text-sm">Database</span>
                </div>
              </div>
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <div class="h-2 w-2 rounded-full bg-accent-warning" />
                  <span class="font-medium text-primary text-sm">GitHub API</span>
                </div>
              </div>
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <div class="h-2 w-2 rounded-full bg-accent-error" />
                  <span class="font-medium text-primary text-sm">Slack</span>
                </div>
              </div>
            </div>

            <div class="mt-6 mb-3 font-semibold text-secondary text-sm">User Scope</div>
            <div class="space-y-2">
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <div class="h-2 w-2 rounded-full bg-accent-success" />
                  <span class="font-medium text-primary text-sm">Calculator</span>
                </div>
              </div>
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <div class="h-2 w-2 rounded-full bg-accent-success" />
                  <span class="font-medium text-primary text-sm">Weather</span>
                </div>
              </div>
            </div>

            <div class="mt-6 border-subtle border-t pt-4">
              <button type="button" class="mr-2 rounded border border-subtle px-3 py-1 text-secondary text-xs hover:bg-hover">
                Import
              </button>
              <button type="button" class="rounded border border-subtle px-3 py-1 text-secondary text-xs hover:bg-hover">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Server Details Panel */}
        <div class="panel flex-1">
          <div class="p-6">
            <div class="mb-6">
              <h3 class="mb-2 font-semibold text-primary text-xl">Database Server</h3>
              <div class="flex items-center gap-4 text-sm">
                <span class="flex items-center gap-2">
                  <div class="h-2 w-2 rounded-full bg-accent-success" />
                  <span class="text-secondary">Status: Connected</span>
                </span>
                <span class="text-secondary">Scope: Project</span>
              </div>
            </div>

            <div class="mb-6">
              <h4 class="mb-3 font-semibold text-primary text-sm">Configuration</h4>
              <div class="rounded-lg border border-subtle bg-elevated p-4">
                <div class="space-y-3">
                  <div>
                    <label for="mcp-url" class="text-secondary text-xs">URL</label>
                    <input
                      id="mcp-url"
                      type="text"
                      value="postgres://localhost:5432"
                      class="mt-1 w-full rounded border border-subtle bg-primary px-3 py-2 text-primary text-sm"
                      readonly
                    />
                  </div>
                  <div>
                    <span class="text-secondary text-xs">Authentication</span>
                    <button type="button" class="mt-1 rounded border border-subtle bg-primary px-3 py-2 text-secondary text-sm hover:text-primary">
                      Configure...
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h4 class="mb-3 font-semibold text-primary text-sm">Available Resources</h4>
              <div class="space-y-2">
                <div class="text-secondary text-sm">• users_table (read/write)</div>
                <div class="text-secondary text-sm">• posts_table (read/write)</div>
                <div class="text-secondary text-sm">• comments_table (read/write)</div>
              </div>
            </div>

            <div class="mb-6">
              <h4 class="mb-3 font-semibold text-primary text-sm">Prompts</h4>
              <div class="space-y-2">
                <div class="font-mono text-secondary text-sm">• query_database(sql: string)</div>
                <div class="font-mono text-secondary text-sm">• backup_data()</div>
                <div class="font-mono text-secondary text-sm">• migrate_schema()</div>
              </div>
            </div>

            <div>
              <h4 class="mb-3 font-semibold text-primary text-sm">Access Control</h4>
              <div class="flex gap-4">
                <label class="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" checked class="accent-accent-primary" />
                  <span>Claude Code</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" checked class="accent-accent-primary" />
                  <span>Testing Agent</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" class="accent-accent-primary" />
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
