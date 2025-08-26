import { Component } from 'solid-js'

const CodebaseView: Component = () => {
  return (
    <div class="view-container">
      <div class="panel-container">
        {/* File Explorer Panel */}
        <div class="panel" style="width: 240px; border-right: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="text-sm font-semibold text-primary mb-3">Working Set</div>
            <div class="space-y-1">
              <div class="flex items-center gap-2 p-2 rounded hover:bg-hover cursor-pointer">
                <span class="text-xs">◆</span>
                <span class="text-sm text-secondary">auth.ts</span>
                <span class="text-xs text-tertiary ml-auto">*</span>
              </div>
              <div class="flex items-center gap-2 p-2 rounded hover:bg-hover cursor-pointer">
                <span class="text-xs">◆</span>
                <span class="text-sm text-secondary">user.ts</span>
              </div>
              <div class="flex items-center gap-2 p-2 rounded hover:bg-hover cursor-pointer">
                <span class="text-xs">◆</span>
                <span class="text-sm text-secondary">api.ts</span>
                <span class="text-xs text-tertiary ml-auto">*</span>
              </div>
            </div>
            
            <div class="text-sm font-semibold text-primary mt-6 mb-3">AI Suggested</div>
            <div class="space-y-1">
              <div class="flex items-center gap-2 p-2 rounded hover:bg-hover cursor-pointer opacity-70">
                <span class="text-xs">○</span>
                <span class="text-sm text-secondary">types.ts</span>
              </div>
              <div class="flex items-center gap-2 p-2 rounded hover:bg-hover cursor-pointer opacity-70">
                <span class="text-xs">○</span>
                <span class="text-sm text-secondary">config.ts</span>
              </div>
            </div>

            <div class="text-sm font-semibold text-primary mt-6 mb-3">Explorer</div>
            <div class="text-xs text-secondary opacity-50 text-center py-8">
              File tree will be implemented with react-arborist
            </div>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div class="panel flex-1 flex flex-col">
          <div class="border-b border-subtle">
            <div class="flex items-center h-9">
              <div class="px-4 py-2 text-sm text-primary border-r border-subtle bg-hover">
                auth.ts
              </div>
              <div class="px-4 py-2 text-sm text-secondary border-r border-subtle hover:bg-hover cursor-pointer">
                user.ts
              </div>
            </div>
          </div>
          <div class="flex-1 flex items-center justify-center">
            <div class="text-center">
              <div class="text-6xl mb-4">📝</div>
              <div class="text-lg text-primary mb-2">Monaco Editor</div>
              <div class="text-sm text-secondary">
                Code editor will be implemented here
              </div>
            </div>
          </div>
        </div>

        {/* Context Panel */}
        <div class="panel" style="width: 320px; border-left: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="text-sm font-semibold text-primary mb-3">Outline</div>
            <div class="space-y-1 text-sm text-secondary">
              <div class="pl-2">├─ Functions</div>
              <div class="pl-4">├─ authenticate()</div>
              <div class="pl-4">└─ validateUser()</div>
              <div class="pl-2">├─ Classes</div>
              <div class="pl-4">└─ AuthService</div>
              <div class="pl-2">└─ Exports</div>
            </div>
            
            <div class="text-sm font-semibold text-primary mt-6 mb-3">Related Files</div>
            <div class="space-y-1">
              <div class="text-sm text-secondary hover:text-primary cursor-pointer">• login.ts</div>
              <div class="text-sm text-secondary hover:text-primary cursor-pointer">• session.ts</div>
              <div class="text-sm text-secondary hover:text-primary cursor-pointer">• middleware.ts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodebaseView