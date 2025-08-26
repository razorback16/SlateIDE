

const GitView = () => {
  return (
    <div className="view-container">
      <div className="flex items-center justify-between border-subtle border-b p-4">
        <h2 className="font-semibold text-lg text-primary">Git</h2>
        <div className="flex items-center gap-2">
          <span className="text-secondary text-sm">Current:</span>
          <span className="font-medium text-primary text-sm">feature-auth</span>
          <span className="text-secondary text-sm">|</span>
          <span className="text-secondary text-sm">main ↑2</span>
        </div>
      </div>

      <div className="panel-container">
        {/* Changes Panel */}
        <div className="panel" style={{width: "280px", borderRight: "1px solid var(--border-subtle)"}}>
          <div className="p-4">
            <div className="mb-3 font-semibold text-primary text-sm">Staged (3)</div>
            <div className="space-y-1">
              <label className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <input type="checkbox" checked className="accent-accent-primary" />
                <span className="text-primary text-sm">auth.ts</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <input type="checkbox" checked className="accent-accent-primary" />
                <span className="text-primary text-sm">user.ts</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <input type="checkbox" checked className="accent-accent-primary" />
                <span className="text-primary text-sm">api.ts</span>
              </label>
            </div>

            <div className="mt-6 mb-3 font-semibold text-primary text-sm">Unstaged (2)</div>
            <div className="space-y-1">
              <label className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <input type="checkbox" className="accent-accent-primary" />
                <span className="text-secondary text-sm">config.ts</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <input type="checkbox" className="accent-accent-primary" />
                <span className="text-secondary text-sm">README.md</span>
              </label>
            </div>

            <div className="mt-6 border-subtle border-t pt-4">
              <label for="commit-message" className="mb-2 block font-semibold text-primary text-sm">Commit Message</label>
              <textarea
                id="commit-message"
                className="w-full rounded border border-subtle bg-elevated px-3 py-2 text-primary text-sm"
                rows={3}
                placeholder="Fix auth bug"
              />
              <div className="mt-2 text-secondary text-xs">Details...</div>
              <div className="mt-3 flex gap-2">
                <button type="button" className="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
                  Commit
                </button>
                <button type="button" className="rounded border border-subtle bg-elevated px-4 py-1.5 text-primary text-sm hover:bg-hover">
                  Push
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Diff Viewer Panel */}
        <div className="panel flex-1">
          <div className="p-6">
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-primary text-sm">auth.ts</h3>
                <span className="text-secondary text-xs">+42 -15</span>
              </div>
              <div className="rounded-lg border border-subtle bg-elevated p-4 font-mono text-xs">
                <div className="space-y-1">
                  <div className="text-accent-error">23 - function oldAuth() {'{'}</div>
                  <div className="text-accent-error">24 - return false;</div>
                  <div className="text-accent-error">25 - {'}'}</div>
                  <div className="text-accent-success">23 + async function authenticate(</div>
                  <div className="text-accent-success">24 + credentials: Credentials</div>
                  <div className="text-accent-success">
                    25 + ): Promise{'<'}User{'>'} {'{'}
                  </div>
                  <div className="text-accent-success">26 + // Improved implementation</div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-subtle bg-elevated p-4">
              <h4 className="mb-2 font-semibold text-primary text-sm">PR Assistant</h4>
              <div className="mt-3 flex items-start gap-2">
                <span className="text-lg">🤖</span>
                <div className="flex-1">
                  <p className="text-primary text-sm">Claude suggests:</p>
                  <p className="mt-1 text-secondary text-sm">
                    "Refactor authentication to use async/await and improve error handling"
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button type="button" className="rounded bg-accent-primary px-3 py-1 text-white text-xs hover:opacity-90">
                      Use Suggestion
                    </button>
                    <button type="button" className="rounded border border-subtle bg-elevated px-3 py-1 text-primary text-xs hover:bg-hover">
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
