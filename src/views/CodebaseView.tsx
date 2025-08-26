const CodebaseView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* File Explorer Panel */}
        <div className="panel" style={{width: '240px', borderRight: '1px solid var(--border-subtle)'}}>
          <div className="p-4">
            <div className="mb-3 font-semibold text-primary text-sm">Working Set</div>
            <div className="space-y-1">
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <span className="text-xs">◆</span>
                <span className="text-secondary text-sm">auth.ts</span>
                <span className="ml-auto text-tertiary text-xs">*</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <span className="text-xs">◆</span>
                <span className="text-secondary text-sm">user.ts</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-hover">
                <span className="text-xs">◆</span>
                <span className="text-secondary text-sm">api.ts</span>
                <span className="ml-auto text-tertiary text-xs">*</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-primary text-sm">AI Suggested</div>
            <div className="space-y-1">
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 opacity-70 hover:bg-hover">
                <span className="text-xs">○</span>
                <span className="text-secondary text-sm">types.ts</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 opacity-70 hover:bg-hover">
                <span className="text-xs">○</span>
                <span className="text-secondary text-sm">config.ts</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-primary text-sm">Explorer</div>
            <div className="py-8 text-center text-secondary text-xs opacity-50">
              File tree will be implemented with react-arborist
            </div>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="panel flex flex-1 flex-col">
          <div className="border-subtle border-b">
            <div className="flex h-9 items-center">
              <div className="border-subtle border-r bg-hover px-4 py-2 text-primary text-sm">
                auth.ts
              </div>
              <div className="cursor-pointer border-subtle border-r px-4 py-2 text-secondary text-sm hover:bg-hover">
                user.ts
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="mb-4 text-6xl">📝</div>
              <div className="mb-2 text-lg text-primary">Monaco Editor</div>
              <div className="text-secondary text-sm">Code editor will be implemented here</div>
            </div>
          </div>
        </div>

        {/* Context Panel */}
        <div className="panel" style={{width: '320px', borderLeft: '1px solid var(--border-subtle)'}}>
          <div className="p-4">
            <div className="mb-3 font-semibold text-primary text-sm">Outline</div>
            <div className="space-y-1 text-secondary text-sm">
              <div className="pl-2">├─ Functions</div>
              <div className="pl-4">├─ authenticate()</div>
              <div className="pl-4">└─ validateUser()</div>
              <div className="pl-2">├─ Classes</div>
              <div className="pl-4">└─ AuthService</div>
              <div className="pl-2">└─ Exports</div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-primary text-sm">Related Files</div>
            <div className="space-y-1">
              <div className="cursor-pointer text-secondary text-sm hover:text-primary">• login.ts</div>
              <div className="cursor-pointer text-secondary text-sm hover:text-primary">
                • session.ts
              </div>
              <div className="cursor-pointer text-secondary text-sm hover:text-primary">
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
