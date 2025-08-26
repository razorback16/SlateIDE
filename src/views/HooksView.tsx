import { Component } from 'solid-js'

const HooksView: Component = () => {
  return (
    <div class="view-container">
      <div class="flex items-center justify-between p-4 border-b border-subtle">
        <h2 class="text-lg font-semibold text-primary">Hooks & Policies</h2>
        <button class="px-4 py-1.5 bg-accent-primary text-white rounded text-sm hover:opacity-90">
          + Add Hook
        </button>
      </div>
      
      <div class="panel-container">
        {/* Hook List Panel */}
        <div class="panel" style="width: 280px; border-right: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="text-sm font-semibold text-secondary mb-3">PreToolUse</div>
            <div class="space-y-2">
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer bg-elevated">
                <div class="flex items-center gap-2">
                  <span class="text-accent-success">✓</span>
                  <span class="text-sm font-medium text-primary">Path Check</span>
                </div>
              </div>
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="text-accent-success">✓</span>
                  <span class="text-sm font-medium text-primary">Size Limit</span>
                </div>
              </div>
            </div>
            
            <div class="text-sm font-semibold text-secondary mt-6 mb-3">PostToolUse</div>
            <div class="space-y-2">
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="text-accent-success">✓</span>
                  <span class="text-sm font-medium text-primary">Git Commit</span>
                </div>
              </div>
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="text-accent-success">✓</span>
                  <span class="text-sm font-medium text-primary">Test Runner</span>
                </div>
              </div>
            </div>
            
            <div class="text-sm font-semibold text-secondary mt-6 mb-3">OnError</div>
            <div class="space-y-2">
              <div class="p-3 rounded border border-subtle hover:border-default cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="text-accent-success">✓</span>
                  <span class="text-sm font-medium text-primary">Rollback</span>
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

        {/* Hook Editor Panel */}
        <div class="panel flex-1">
          <div class="p-6">
            <div class="mb-6">
              <h3 class="text-xl font-semibold text-primary mb-2">Hook: Validate File Paths</h3>
              <div class="text-sm text-secondary">Event: PreToolUse</div>
            </div>
            
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-primary mb-3">Conditions (Visual Builder)</h4>
              <div class="bg-elevated rounded-lg border border-subtle p-4">
                <div class="space-y-2 font-mono text-sm">
                  <div class="flex items-center gap-2">
                    <span class="text-accent-primary">IF</span>
                    <span class="text-primary">tool.name</span>
                    <span class="text-secondary">=</span>
                    <span class="text-accent-success">"edit_file"</span>
                  </div>
                  <div class="flex items-center gap-2 ml-4">
                    <span class="text-accent-primary">AND</span>
                    <span class="text-primary">file.path</span>
                    <span class="text-secondary">CONTAINS</span>
                    <span class="text-accent-success">"/src/"</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-primary mb-3">Actions</h4>
              <div class="bg-elevated rounded-lg border border-subtle p-4">
                <ol class="space-y-2 text-sm text-primary">
                  <li>1. Validate path against .claude/allowed</li>
                  <li>2. Check file size {'<'} 1MB</li>
                  <li>3. Log to audit.log</li>
                </ol>
              </div>
            </div>
            
            <div class="flex gap-2">
              <label class="flex items-center gap-2 text-sm text-primary cursor-pointer">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span>Enable Hook</span>
              </label>
              <button class="ml-auto px-4 py-1.5 bg-elevated border border-subtle text-primary rounded text-sm hover:bg-hover">
                Test
              </button>
              <button class="px-4 py-1.5 bg-accent-primary text-white rounded text-sm hover:opacity-90">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HooksView