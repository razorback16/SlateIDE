

const AgentsView = () => {
  return (
    <div className="view-container">
      <div className="flex items-center justify-between border-subtle border-b p-4">
        <h2 className="font-semibold text-lg text-primary">Sub-Agents</h2>
        <button type="button" className="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
          + Create Agent
        </button>
      </div>

      <div className="panel-container">
        {/* Agent List Panel */}
        <div className="panel" style={{width: "280px", borderRight: "1px solid var(--border-subtle)"}}>
          <div className="p-4">
            <div className="mb-3 font-semibold text-secondary text-sm">My Agents</div>
            <div className="space-y-2">
              <div className="cursor-pointer rounded border border-subtle bg-elevated p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <span>📝</span>
                  <span className="font-medium text-primary text-sm">Docs Writer</span>
                </div>
              </div>
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <span>🧪</span>
                  <span className="font-medium text-primary text-sm">Testing</span>
                </div>
              </div>
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <span>🔍</span>
                  <span className="font-medium text-primary text-sm">Code Review</span>
                </div>
              </div>
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <span>🚀</span>
                  <span className="font-medium text-primary text-sm">Deploy</span>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-secondary text-sm">Project Agents</div>
            <div className="space-y-2">
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span className="font-medium text-primary text-sm">Analytics</span>
                </div>
              </div>
              <div className="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span className="font-medium text-primary text-sm">Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Editor Panel */}
        <div className="panel flex-1">
          {/* Tabs */}
          <div className="flex border-subtle border-b">
            <button type="button" className="border-accent-primary border-b-2 px-4 py-2 font-medium text-primary text-sm">
              Definition
            </button>
            <button type="button" className="px-4 py-2 font-medium text-secondary text-sm hover:text-primary">
              Permissions
            </button>
            <button type="button" className="px-4 py-2 font-medium text-secondary text-sm hover:text-primary">
              Test
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <label for="agent-name" className="mb-2 block font-semibold text-primary text-sm">Name</label>
              <input
                id="agent-name"
                type="text"
                value="Testing Agent"
                className="w-full rounded border border-subtle bg-elevated px-3 py-2 text-primary text-sm"
              />
            </div>

            <div className="mb-6">
              <label for="agent-description" className="mb-2 block font-semibold text-primary text-sm">Description</label>
              <input
                id="agent-description"
                type="text"
                value="Specialized for unit testing"
                className="w-full rounded border border-subtle bg-elevated px-3 py-2 text-primary text-sm"
              />
            </div>

            <div className="mb-6">
              <label for="agent-prompt" className="mb-2 block font-semibold text-primary text-sm">System Prompt</label>
              <textarea
                id="agent-prompt"
                className="w-full rounded border border-subtle bg-elevated px-3 py-2 font-mono text-primary text-sm"
                rows={3}
              >
                You are a testing specialist focused on writing comprehensive test suites...
              </textarea>
            </div>

            <div className="mb-6">
              <h4 className="mb-3 font-semibold text-primary text-sm">Tool Permissions</h4>
              <div className="flex gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" checked className="accent-accent-primary" />
                  <span>Read Files</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" checked className="accent-accent-primary" />
                  <span>Write Tests</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" className="accent-accent-primary" />
                  <span>Edit Code</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="mb-3 font-semibold text-primary text-sm">MCP Servers</h4>
              <div className="flex gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" checked className="accent-accent-primary" />
                  <span>Testing Database</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" className="accent-accent-primary" />
                  <span>Production API</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button type="button" className="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
                Save
              </button>
              <button type="button" className="rounded border border-subtle bg-elevated px-4 py-1.5 text-primary text-sm hover:bg-hover">
                Test Run
              </button>
              <button type="button" className="rounded border border-subtle bg-elevated px-4 py-1.5 text-primary text-sm hover:bg-hover">
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
