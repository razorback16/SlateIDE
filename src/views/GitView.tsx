import { Component } from 'solid-js'

const GitView: Component = () => {
  return (
    <div class="view-container">
      <div class="flex items-center justify-between p-4 border-b border-subtle">
        <h2 class="text-lg font-semibold text-primary">Git</h2>
        <div class="flex items-center gap-2">
          <span class="text-sm text-secondary">Current:</span>
          <span class="text-sm font-medium text-primary">feature-auth</span>
          <span class="text-sm text-secondary">|</span>
          <span class="text-sm text-secondary">main ↑2</span>
        </div>
      </div>
      
      <div class="panel-container">
        {/* Changes Panel */}
        <div class="panel" style="width: 320px; border-right: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="text-sm font-semibold text-primary mb-3">Staged (3)</div>
            <div class="space-y-1">
              <label class="flex items-center gap-2 p-2 rounded hover:bg-hover cursor-pointer">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span class="text-sm text-primary">auth.ts</span>
              </label>
              <label class="flex items-center gap-2 p-2 rounded hover:bg-hover cursor-pointer">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span class="text-sm text-primary">user.ts</span>
              </label>
              <label class="flex items-center gap-2 p-2 rounded hover:bg-hover cursor-pointer">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span class="text-sm text-primary">api.ts</span>
              </label>
            </div>
            
            <div class="text-sm font-semibold text-primary mt-6 mb-3">Unstaged (2)</div>
            <div class="space-y-1">
              <label class="flex items-center gap-2 p-2 rounded hover:bg-hover cursor-pointer">
                <input type="checkbox" class="accent-accent-primary" />
                <span class="text-sm text-secondary">config.ts</span>
              </label>
              <label class="flex items-center gap-2 p-2 rounded hover:bg-hover cursor-pointer">
                <input type="checkbox" class="accent-accent-primary" />
                <span class="text-sm text-secondary">README.md</span>
              </label>
            </div>
            
            <div class="mt-6 pt-4 border-t border-subtle">
              <label class="block text-sm font-semibold text-primary mb-2">Commit Message</label>
              <textarea 
                class="w-full px-3 py-2 bg-elevated border border-subtle rounded text-sm text-primary"
                rows="3"
                placeholder="Fix auth bug"
              />
              <div class="mt-2 text-xs text-secondary">
                Details...
              </div>
              <div class="flex gap-2 mt-3">
                <button class="px-4 py-1.5 bg-accent-primary text-white rounded text-sm hover:opacity-90">
                  Commit
                </button>
                <button class="px-4 py-1.5 bg-elevated border border-subtle text-primary rounded text-sm hover:bg-hover">
                  Push
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Diff Viewer Panel */}
        <div class="panel flex-1">
          <div class="p-6">
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-sm font-semibold text-primary">auth.ts</h3>
                <span class="text-xs text-secondary">+42 -15</span>
              </div>
              <div class="bg-elevated rounded-lg border border-subtle p-4 font-mono text-xs">
                <div class="space-y-1">
                  <div class="text-accent-error">23  - function oldAuth() {'{'}</div>
                  <div class="text-accent-error">24  -   return false;</div>
                  <div class="text-accent-error">25  - {'}'}</div>
                  <div class="text-accent-success">23  + async function authenticate(</div>
                  <div class="text-accent-success">24  +   credentials: Credentials</div>
                  <div class="text-accent-success">25  + ): Promise{'<'}User{'>'} {'{'}</div>
                  <div class="text-accent-success">26  +   // Improved implementation</div>
                </div>
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-elevated rounded-lg border border-subtle">
              <h4 class="text-sm font-semibold text-primary mb-2">PR Assistant</h4>
              <div class="flex items-start gap-2 mt-3">
                <span class="text-lg">🤖</span>
                <div class="flex-1">
                  <p class="text-sm text-primary">Claude suggests:</p>
                  <p class="text-sm text-secondary mt-1">
                    "Refactor authentication to use async/await and improve error handling"
                  </p>
                  <div class="flex gap-2 mt-3">
                    <button class="px-3 py-1 bg-accent-primary text-white rounded text-xs hover:opacity-90">
                      Use Suggestion
                    </button>
                    <button class="px-3 py-1 bg-elevated border border-subtle text-primary rounded text-xs hover:bg-hover">
                      Edit
                    </button>
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

export default GitView