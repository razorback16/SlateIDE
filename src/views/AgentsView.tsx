import { Component } from 'solid-js'

const AgentsView: Component = () => {
  return (
    <div class="view-container">
      <div class="flex items-center justify-between border-subtle border-b p-4">
        <h2 class="font-semibold text-lg text-primary">Sub-Agents</h2>
        <button type="button" class="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
          + Create Agent
        </button>
      </div>

      <div class="panel-container">
        {/* Agent List Panel */}
        <div class="panel" style="width: 280px; border-right: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="mb-3 font-semibold text-secondary text-sm">My Agents</div>
            <div class="space-y-2">
              <div class="cursor-pointer rounded border border-subtle bg-elevated p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <span>📝</span>
                  <span class="font-medium text-primary text-sm">Docs Writer</span>
                </div>
              </div>
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <span>🧪</span>
                  <span class="font-medium text-primary text-sm">Testing</span>
                </div>
              </div>
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <span>🔍</span>
                  <span class="font-medium text-primary text-sm">Code Review</span>
                </div>
              </div>
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <span>🚀</span>
                  <span class="font-medium text-primary text-sm">Deploy</span>
                </div>
              </div>
            </div>

            <div class="mt-6 mb-3 font-semibold text-secondary text-sm">Project Agents</div>
            <div class="space-y-2">
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <span>📊</span>
                  <span class="font-medium text-primary text-sm">Analytics</span>
                </div>
              </div>
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <span>🔒</span>
                  <span class="font-medium text-primary text-sm">Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Editor Panel */}
        <div class="panel flex-1">
          {/* Tabs */}
          <div class="flex border-subtle border-b">
            <button type="button" class="border-accent-primary border-b-2 px-4 py-2 font-medium text-primary text-sm">
              Definition
            </button>
            <button type="button" class="px-4 py-2 font-medium text-secondary text-sm hover:text-primary">
              Permissions
            </button>
            <button type="button" class="px-4 py-2 font-medium text-secondary text-sm hover:text-primary">
              Test
            </button>
          </div>

          <div class="p-6">
            <div class="mb-6">
              <label for="agent-name" class="mb-2 block font-semibold text-primary text-sm">Name</label>
              <input
                id="agent-name"
                type="text"
                value="Testing Agent"
                class="w-full rounded border border-subtle bg-elevated px-3 py-2 text-primary text-sm"
              />
            </div>

            <div class="mb-6">
              <label for="agent-description" class="mb-2 block font-semibold text-primary text-sm">Description</label>
              <input
                id="agent-description"
                type="text"
                value="Specialized for unit testing"
                class="w-full rounded border border-subtle bg-elevated px-3 py-2 text-primary text-sm"
              />
            </div>

            <div class="mb-6">
              <label for="agent-prompt" class="mb-2 block font-semibold text-primary text-sm">System Prompt</label>
              <textarea
                id="agent-prompt"
                class="w-full rounded border border-subtle bg-elevated px-3 py-2 font-mono text-primary text-sm"
                rows="8"
              >
                You are a testing specialist focused on writing comprehensive test suites...
              </textarea>
            </div>

            <div class="mb-6">
              <h4 class="mb-3 font-semibold text-primary text-sm">Tool Permissions</h4>
              <div class="flex gap-4">
                <label class="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" checked class="accent-accent-primary" />
                  <span>Read Files</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" checked class="accent-accent-primary" />
                  <span>Write Tests</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" class="accent-accent-primary" />
                  <span>Edit Code</span>
                </label>
              </div>
            </div>

            <div class="mb-6">
              <h4 class="mb-3 font-semibold text-primary text-sm">MCP Servers</h4>
              <div class="flex gap-4">
                <label class="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" checked class="accent-accent-primary" />
                  <span>Testing Database</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2 text-secondary text-sm">
                  <input type="checkbox" class="accent-accent-primary" />
                  <span>Production API</span>
                </label>
              </div>
            </div>

            <div class="flex gap-2">
              <button type="button" class="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
                Save
              </button>
              <button type="button" class="rounded border border-subtle bg-elevated px-4 py-1.5 text-primary text-sm hover:bg-hover">
                Test Run
              </button>
              <button type="button" class="rounded border border-subtle bg-elevated px-4 py-1.5 text-primary text-sm hover:bg-hover">
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
