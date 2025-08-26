import { Component } from 'solid-js'

const AgentsView: Component = () => {
  return (
    <div class="view-container">
      <div class="flex items-center justify-between p-4 border-b border-subtle">
        <h2 class="text-lg font-semibold text-primary">Sub-Agents</h2>
        <button class="px-4 py-1.5 bg-accent-primary text-white rounded text-sm hover:opacity-90">
          + Create Agent
        </button>
      </div>
      
      <div class="panel-container">
        {/* Agent List Panel */}
        <div class="panel" style="width: 280px; border-right: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="text-sm font-semibold text-secondary mb-3">My Agents</div>
            <div class="space-y-2">
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer bg-elevated">
                <div class="flex items-center gap-2">
                  <span>📝</span>
                  <span class="text-sm font-medium text-primary">Docs Writer</span>
                </div>
              </div>
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <span>🧪</span>
                  <span class="text-sm font-medium text-primary">Testing</span>
                </div>
              </div>
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <span>🔍</span>
                  <span class="text-sm font-medium text-primary">Code Review</span>
                </div>
              </div>
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <span>🚀</span>
                  <span class="text-sm font-medium text-primary">Deploy</span>
                </div>
              </div>
            </div>
            
            <div class="text-sm font-semibold text-secondary mt-6 mb-3">Project Agents</div>
            <div class="space-y-2">
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <span>📊</span>
                  <span class="text-sm font-medium text-primary">Analytics</span>
                </div>
              </div>
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <span>🔒</span>
                  <span class="text-sm font-medium text-primary">Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Editor Panel */}
        <div class="panel flex-1">
          {/* Tabs */}
          <div class="flex border-b border-subtle">
            <button class="px-4 py-2 text-sm font-medium text-primary border-b-2 border-accent-primary">
              Definition
            </button>
            <button class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary">
              Permissions
            </button>
            <button class="px-4 py-2 text-sm font-medium text-secondary hover:text-primary">
              Test
            </button>
          </div>
          
          <div class="p-6">
            <div class="mb-6">
              <label class="block text-sm font-semibold text-primary mb-2">Name</label>
              <input 
                type="text" 
                value="Testing Agent"
                class="w-full px-3 py-2 bg-elevated border border-subtle rounded text-sm text-primary"
              />
            </div>
            
            <div class="mb-6">
              <label class="block text-sm font-semibold text-primary mb-2">Description</label>
              <input 
                type="text" 
                value="Specialized for unit testing"
                class="w-full px-3 py-2 bg-elevated border border-subtle rounded text-sm text-primary"
              />
            </div>
            
            <div class="mb-6">
              <label class="block text-sm font-semibold text-primary mb-2">System Prompt</label>
              <textarea 
                class="w-full px-3 py-2 bg-elevated border border-subtle rounded text-sm text-primary font-mono"
                rows="8"
              >You are a testing specialist focused on writing comprehensive test suites...</textarea>
            </div>
            
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-primary mb-3">Tool Permissions</h4>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                  <input type="checkbox" checked class="accent-accent-primary" />
                  <span>Read Files</span>
                </label>
                <label class="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                  <input type="checkbox" checked class="accent-accent-primary" />
                  <span>Write Tests</span>
                </label>
                <label class="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                  <input type="checkbox" class="accent-accent-primary" />
                  <span>Edit Code</span>
                </label>
              </div>
            </div>
            
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-primary mb-3">MCP Servers</h4>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                  <input type="checkbox" checked class="accent-accent-primary" />
                  <span>Testing Database</span>
                </label>
                <label class="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                  <input type="checkbox" class="accent-accent-primary" />
                  <span>Production API</span>
                </label>
              </div>
            </div>
            
            <div class="flex gap-2">
              <button class="px-4 py-1.5 bg-accent-primary text-white rounded text-sm hover:opacity-90">
                Save
              </button>
              <button class="px-4 py-1.5 bg-elevated border border-subtle text-primary rounded text-sm hover:bg-hover">
                Test Run
              </button>
              <button class="px-4 py-1.5 bg-elevated border border-subtle text-primary rounded text-sm hover:bg-hover">
                Export YAML
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentsView