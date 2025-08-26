

const HooksView = () => {
  return (
    <div className="view-container">
      <div className="flex items-center justify-between border-subtle border-b p-4">
        <h2 className="font-semibold text-lg text-primary">Hooks & Policies</h2>
        <button type="button" className="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
          + Add Hook
        </button>
      </div>

      <div className="panel-container">
        {/* Hook List Panel */}
        <div className="panel" style={{width: "280px", borderRight: "1px solid var(--border-subtle)"}}>
          <div className="p-4">
            <div className="mb-3 font-semibold text-secondary text-sm">PreToolUse</div>
            <div className="space-y-2">
              <div className="cursor-pointer rounded border border-subtle bg-elevated p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <span className="text-accent-success">✓</span>
                  <span className="font-medium text-primary text-sm">Path Check</span>
                </div>
              </div>
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <span className="text-accent-success">✓</span>
                  <span className="font-medium text-primary text-sm">Size Limit</span>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-secondary text-sm">PostToolUse</div>
            <div className="space-y-2">
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <span className="text-accent-success">✓</span>
                  <span className="font-medium text-primary text-sm">Git Commit</span>
                </div>
              </div>
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <span className="text-accent-success">✓</span>
                  <span className="font-medium text-primary text-sm">Test Runner</span>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-secondary text-sm">OnError</div>
            <div className="space-y-2">
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <span className="text-accent-success">✓</span>
                  <span className="font-medium text-primary text-sm">Rollback</span>
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

        {/* Hook Editor Panel */}
        <div className="panel flex-1">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="mb-2 font-semibold text-primary text-xl">Hook: Validate File Paths</h3>
              <div className="text-secondary text-sm">Event: PreToolUse</div>
            </div>

            <div className="mb-6">
              <h4 className="mb-3 font-semibold text-primary text-sm">Conditions (Visual Builder)</h4>
              <div className="rounded-lg border border-subtle bg-elevated p-4">
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-accent-primary">IF</span>
                    <span className="text-primary">tool.name</span>
                    <span className="text-secondary">=</span>
                    <span className="text-accent-success">"edit_file"</span>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <span className="text-accent-primary">AND</span>
                    <span className="text-primary">file.path</span>
                    <span className="text-secondary">CONTAINS</span>
                    <span className="text-accent-success">"/src/"</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="mb-3 font-semibold text-primary text-sm">Actions</h4>
              <div className="rounded-lg border border-subtle bg-elevated p-4">
                <ol className="space-y-2 text-primary text-sm">
                  <li>1. Validate path against .claude/allowed</li>
                  <li>2. Check file size {'<'} 1MB</li>
                  <li>3. Log to audit.log</li>
                </ol>
              </div>
            </div>

            <div className="flex gap-2">
              <label className="flex cursor-pointer items-center gap-2 text-primary text-sm">
                <input type="checkbox" checked className="accent-accent-primary" />
                <span>Enable Hook</span>
              </label>
              <button type="button" className="ml-auto rounded border border-subtle bg-elevated px-4 py-1.5 text-primary text-sm hover:bg-hover">
                Test
              </button>
              <button type="button" className="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
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
