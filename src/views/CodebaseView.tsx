import { Component } from 'solid-js'

const CodebaseView: Component = () => {
  return (
    <div class="view-container">
      <div class="panel-container">
        {/* File Explorer Panel */}
        <div class="panel" style="width: 240px; border-right: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="mb-3 font-semibold text-primary text-sm">Working Set</div>
            <div class="space-y-1">
              <div class="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <span class="text-xs">◆</span>
                <span class="text-secondary text-sm">auth.ts</span>
                <span class="ml-auto text-tertiary text-xs">*</span>
              </div>
              <div class="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <span class="text-xs">◆</span>
                <span class="text-secondary text-sm">user.ts</span>
              </div>
              <div class="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <span class="text-xs">◆</span>
                <span class="text-secondary text-sm">api.ts</span>
                <span class="ml-auto text-tertiary text-xs">*</span>
              </div>
            </div>

            <div class="mt-6 mb-3 font-semibold text-primary text-sm">AI Suggested</div>
            <div class="space-y-1">
              <div class="flex cursor-pointer items-center gap-2 rounded p-2 opacity-70 hover:bg-hover">
                <span class="text-xs">○</span>
                <span class="text-secondary text-sm">types.ts</span>
              </div>
              <div class="flex cursor-pointer items-center gap-2 rounded p-2 opacity-70 hover:bg-hover">
                <span class="text-xs">○</span>
                <span class="text-secondary text-sm">config.ts</span>
              </div>
            </div>

            <div class="mt-6 mb-3 font-semibold text-primary text-sm">Explorer</div>
            <div class="py-8 text-center text-secondary text-xs opacity-50">
              File tree will be implemented with react-arborist
            </div>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div class="panel flex flex-1 flex-col">
          <div class="border-subtle border-b">
            <div class="flex h-9 items-center">
              <div class="border-subtle border-r bg-hover px-4 py-2 text-primary text-sm">
                auth.ts
              </div>
              <div class="cursor-pointer border-subtle border-r px-4 py-2 text-secondary text-sm hover:bg-hover">
                user.ts
              </div>
            </div>
          </div>
          <div class="flex flex-1 items-center justify-center">
            <div class="text-center">
              <div class="mb-4 text-6xl">📝</div>
              <div class="mb-2 text-lg text-primary">Monaco Editor</div>
              <div class="text-secondary text-sm">Code editor will be implemented here</div>
            </div>
          </div>
        </div>

        {/* Context Panel */}
        <div class="panel" style="width: 320px; border-left: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="mb-3 font-semibold text-primary text-sm">Outline</div>
            <div class="space-y-1 text-secondary text-sm">
              <div class="pl-2">├─ Functions</div>
              <div class="pl-4">├─ authenticate()</div>
              <div class="pl-4">└─ validateUser()</div>
              <div class="pl-2">├─ Classes</div>
              <div class="pl-4">└─ AuthService</div>
              <div class="pl-2">└─ Exports</div>
            </div>

            <div class="mt-6 mb-3 font-semibold text-primary text-sm">Related Files</div>
            <div class="space-y-1">
              <div class="cursor-pointer text-secondary text-sm hover:text-primary">• login.ts</div>
              <div class="cursor-pointer text-secondary text-sm hover:text-primary">
                • session.ts
              </div>
              <div class="cursor-pointer text-secondary text-sm hover:text-primary">
                • middleware.ts
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodebaseView
