import { Component } from 'solid-js'

const GitView: Component = () => {
  return (
    <div class="view-container">
      <div class="flex items-center justify-between border-subtle border-b p-4">
        <h2 class="font-semibold text-lg text-primary">Git</h2>
        <div class="flex items-center gap-2">
          <span class="text-secondary text-sm">Current:</span>
          <span class="font-medium text-primary text-sm">feature-auth</span>
          <span class="text-secondary text-sm">|</span>
          <span class="text-secondary text-sm">main ↑2</span>
        </div>
      </div>

      <div class="panel-container">
        {/* Changes Panel */}
        <div class="panel" style="width: 320px; border-right: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="mb-3 font-semibold text-primary text-sm">Staged (3)</div>
            <div class="space-y-1">
              <label class="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span class="text-primary text-sm">auth.ts</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span class="text-primary text-sm">user.ts</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span class="text-primary text-sm">api.ts</span>
              </label>
            </div>

            <div class="mt-6 mb-3 font-semibold text-primary text-sm">Unstaged (2)</div>
            <div class="space-y-1">
              <label class="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <input type="checkbox" class="accent-accent-primary" />
                <span class="text-secondary text-sm">config.ts</span>
              </label>
              <label class="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <input type="checkbox" class="accent-accent-primary" />
                <span class="text-secondary text-sm">README.md</span>
              </label>
            </div>

            <div class="mt-6 border-subtle border-t pt-4">
              <label for="commit-message" class="mb-2 block font-semibold text-primary text-sm">Commit Message</label>
              <textarea
                id="commit-message"
                class="w-full rounded border border-subtle bg-elevated px-3 py-2 text-primary text-sm"
                rows="3"
                placeholder="Fix auth bug"
              />
              <div class="mt-2 text-secondary text-xs">Details...</div>
              <div class="mt-3 flex gap-2">
                <button type="button" class="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
                  Commit
                </button>
                <button type="button" class="rounded border border-subtle bg-elevated px-4 py-1.5 text-primary text-sm hover:bg-hover">
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
              <div class="mb-2 flex items-center justify-between">
                <h3 class="font-semibold text-primary text-sm">auth.ts</h3>
                <span class="text-secondary text-xs">+42 -15</span>
              </div>
              <div class="rounded-lg border border-subtle bg-elevated p-4 font-mono text-xs">
                <div class="space-y-1">
                  <div class="text-accent-error">23 - function oldAuth() {'{'}</div>
                  <div class="text-accent-error">24 - return false;</div>
                  <div class="text-accent-error">25 - {'}'}</div>
                  <div class="text-accent-success">23 + async function authenticate(</div>
                  <div class="text-accent-success">24 + credentials: Credentials</div>
                  <div class="text-accent-success">
                    25 + ): Promise{'<'}User{'>'} {'{'}
                  </div>
                  <div class="text-accent-success">26 + // Improved implementation</div>
                </div>
              </div>
            </div>

            <div class="mt-6 rounded-lg border border-subtle bg-elevated p-4">
              <h4 class="mb-2 font-semibold text-primary text-sm">PR Assistant</h4>
              <div class="mt-3 flex items-start gap-2">
                <span class="text-lg">🤖</span>
                <div class="flex-1">
                  <p class="text-primary text-sm">Claude suggests:</p>
                  <p class="mt-1 text-secondary text-sm">
                    "Refactor authentication to use async/await and improve error handling"
                  </p>
                  <div class="mt-3 flex gap-2">
                    <button type="button" class="rounded bg-accent-primary px-3 py-1 text-white text-xs hover:opacity-90">
                      Use Suggestion
                    </button>
                    <button type="button" class="rounded border border-subtle bg-elevated px-3 py-1 text-primary text-xs hover:bg-hover">
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
