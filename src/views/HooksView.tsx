import { Component } from 'solid-js'

const HooksView: Component = () => {
  return (
    <div class="view-container">
      <div class="flex items-center justify-between border-subtle border-b p-4">
        <h2 class="font-semibold text-lg text-primary">Hooks & Policies</h2>
        <button type="button" class="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
          + Add Hook
        </button>
      </div>

      <div class="panel-container">
        {/* Hook List Panel */}
        <div class="panel" style="width: 280px; border-right: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="mb-3 font-semibold text-secondary text-sm">PreToolUse</div>
            <div class="space-y-2">
              <div class="cursor-pointer rounded border border-subtle bg-elevated p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <span class="text-accent-success">✓</span>
                  <span class="font-medium text-primary text-sm">Path Check</span>
                </div>
              </div>
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <span class="text-accent-success">✓</span>
                  <span class="font-medium text-primary text-sm">Size Limit</span>
                </div>
              </div>
            </div>

            <div class="mt-6 mb-3 font-semibold text-secondary text-sm">PostToolUse</div>
            <div class="space-y-2">
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <span class="text-accent-success">✓</span>
                  <span class="font-medium text-primary text-sm">Git Commit</span>
                </div>
              </div>
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <span class="text-accent-success">✓</span>
                  <span class="font-medium text-primary text-sm">Test Runner</span>
                </div>
              </div>
            </div>

            <div class="mt-6 mb-3 font-semibold text-secondary text-sm">OnError</div>
            <div class="space-y-2">
              <div class="cursor-pointer rounded border border-subtle p-3 hover:border-default">
                <div class="flex items-center gap-2">
                  <span class="text-accent-success">✓</span>
                  <span class="font-medium text-primary text-sm">Rollback</span>
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

        {/* Hook Editor Panel */}
        <div class="panel flex-1">
          <div class="p-6">
            <div class="mb-6">
              <h3 class="mb-2 font-semibold text-primary text-xl">Hook: Validate File Paths</h3>
              <div class="text-secondary text-sm">Event: PreToolUse</div>
            </div>

            <div class="mb-6">
              <h4 class="mb-3 font-semibold text-primary text-sm">Conditions (Visual Builder)</h4>
              <div class="rounded-lg border border-subtle bg-elevated p-4">
                <div class="space-y-2 font-mono text-sm">
                  <div class="flex items-center gap-2">
                    <span class="text-accent-primary">IF</span>
                    <span class="text-primary">tool.name</span>
                    <span class="text-secondary">=</span>
                    <span class="text-accent-success">"edit_file"</span>
                  </div>
                  <div class="ml-4 flex items-center gap-2">
                    <span class="text-accent-primary">AND</span>
                    <span class="text-primary">file.path</span>
                    <span class="text-secondary">CONTAINS</span>
                    <span class="text-accent-success">"/src/"</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h4 class="mb-3 font-semibold text-primary text-sm">Actions</h4>
              <div class="rounded-lg border border-subtle bg-elevated p-4">
                <ol class="space-y-2 text-primary text-sm">
                  <li>1. Validate path against .claude/allowed</li>
                  <li>2. Check file size {'<'} 1MB</li>
                  <li>3. Log to audit.log</li>
                </ol>
              </div>
            </div>

            <div class="flex gap-2">
              <label class="flex cursor-pointer items-center gap-2 text-primary text-sm">
                <input type="checkbox" checked class="accent-accent-primary" />
                <span>Enable Hook</span>
              </label>
              <button type="button" class="ml-auto rounded border border-subtle bg-elevated px-4 py-1.5 text-primary text-sm hover:bg-hover">
                Test
              </button>
              <button type="button" class="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
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
