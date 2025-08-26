import { Component } from 'solid-js'

const MCPView: Component = () => {
  return (
    <div class="view-container">
      <div class="flex items-center justify-between p-4 border-b border-subtle">
        <h2 class="text-lg font-semibold text-primary">MCP Servers</h2>
        <button class="px-4 py-1.5 bg-accent-primary text-white rounded text-sm hover:opacity-90">
          + Add Server
        </button>
      </div>
      
      <div class="panel-container">
        {/* Server List Panel */}
        <div class="panel" style="width: 320px; border-right: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="text-sm font-semibold text-secondary mb-3">Project Scope</div>
            <div class="space-y-2">
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer bg-elevated">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-accent-success"></div>
                  <span class="text-sm font-medium text-primary">Database</span>
                </div>
              </div>
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-accent-warning"></div>
                  <span class="text-sm font-medium text-primary">GitHub API</span>
                </div>
              </div>
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-accent-error"></div>
                  <span class="text-sm font-medium text-primary">Slack</span>
                </div>
              </div>
            </div>
            
            <div class="text-sm font-semibold text-secondary mt-6 mb-3">User Scope</div>
            <div class="space-y-2">
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-accent-success"></div>
                  <span class="text-sm font-medium text-primary">Calculator</span>
                </div>
              </div>
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-accent-success"></div>
                  <span class="text-sm font-medium text-primary">Weather</span>
                </div>
              </div>
            </div>
            
            <div class="mt-6 pt-4 border-t border-subtle">
              <button class="text-xs px-3 py-1 rounded border border-subtle hover:bg-hover text-secondary mr-2">
                Import
              </button>
              <button class="text-xs px-3 py-1 rounded border border-subtle hover:bg-hover text-secondary">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Server Details Panel */}
        <div class="panel flex-1">
          <div class="p-6">
            <div class="mb-6">
              <h3 class="text-xl font-semibold text-primary mb-2">Database Server</h3>
              <div class="flex items-center gap-4 text-sm">
                <span class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-accent-success"></div>
                  <span class="text-secondary">Status: Connected</span>
                </span>
                <span class="text-secondary">Scope: Project</span>
              </div>
            </div>
            
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-primary mb-3">Configuration</h4>
              <div class="bg-elevated rounded-lg border border-subtle p-4">
                <div class="space-y-3">
                  <div>
                    <label class="text-xs text-secondary">URL</label>
                    <input 
                      type="text" 
                      value="postgres://localhost:5432"
                      class="w-full mt-1 px-3 py-2 bg-primary border border-subtle rounded text-sm text-primary"
                      readonly
                    />
                  </div>
                  <div>
                    <label class="text-xs text-secondary">Authentication</label>
                    <button class="mt-1 px-3 py-2 bg-primary border border-subtle rounded text-sm text-secondary hover:text-primary">
                      Configure...
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-primary mb-3">Available Resources</h4>
              <div class="space-y-2">
                <div class="text-sm text-secondary">• users_table (read/write)</div>
                <div class="text-sm text-secondary">• posts_table (read/write)</div>
                <div class="text-sm text-secondary">• comments_table (read/write)</div>
              </div>
            </div>
            
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-primary mb-3">Prompts</h4>
              <div class="space-y-2">
                <div class="text-sm text-secondary font-mono">• query_database(sql: string)</div>
                <div class="text-sm text-secondary font-mono">• backup_data()</div>
                <div class="text-sm text-secondary font-mono">• migrate_schema()</div>
              </div>
            </div>
            
            <div>
              <h4 class="text-sm font-semibold text-primary mb-3">Access Control</h4>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                  <input type="checkbox" checked class="accent-accent-primary" />
                  <span>Claude Code</span>
                </label>
                <label class="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                  <input type="checkbox" checked class="accent-accent-primary" />
                  <span>Testing Agent</span>
                </label>
                <label class="flex items-center gap-2 text-sm text-secondary cursor-pointer">
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