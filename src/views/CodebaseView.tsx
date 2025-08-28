import { Button } from '@/components/ui/button'

const CodebaseView = () => {
  return (
    <div className="view-container h-full">
      <div className="panel-container">
        {/* File Explorer Panel */}
        <div
          className="panel flex flex-col"
          style={{ width: '240px', borderRight: '1px solid var(--color-border)' }}
        >
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-3 font-semibold text-foreground text-sm">Working Set</div>
            <div className="space-y-1">
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <span className="text-chart-1 text-xs">◆</span>
                <span className="text-foreground text-sm">auth.ts</span>
                <span className="ml-auto text-muted-foreground text-xs">*</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <span className="text-chart-1 text-xs">◆</span>
                <span className="text-foreground text-sm">user.ts</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-accent hover:text-accent-foreground">
                <span className="text-chart-1 text-xs">◆</span>
                <span className="text-foreground text-sm">api.ts</span>
                <span className="ml-auto text-muted-foreground text-xs">*</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">AI Suggested</div>
            <div className="space-y-1">
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 opacity-70 transition-all hover:bg-accent hover:text-accent-foreground hover:opacity-100">
                <span className="text-muted-foreground text-xs">○</span>
                <span className="text-muted-foreground text-sm">types.ts</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded p-2 opacity-70 transition-all hover:bg-accent hover:text-accent-foreground hover:opacity-100">
                <span className="text-muted-foreground text-xs">○</span>
                <span className="text-muted-foreground text-sm">config.ts</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Explorer</div>
            <div className="py-8 text-center text-muted-foreground text-xs opacity-50">
              File tree will be implemented with react-arborist
            </div>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="panel flex flex-1 flex-col">
          <div className="border-border border-b bg-muted/50">
            <div className="flex h-9 items-center">
              <div className="border-border border-r bg-card px-4 py-2 font-medium text-foreground text-sm shadow-sm">
                auth.ts
              </div>
              <div className="cursor-pointer border-border border-r px-4 py-2 text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                user.ts
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center bg-background">
            <div className="text-center">
              <div className="mb-4 text-6xl">📝</div>
              <div className="mb-2 font-semibold text-foreground text-lg">Monaco Editor</div>
              <div className="text-muted-foreground text-sm">
                Code editor will be implemented here
              </div>
              <div className="mt-4 rounded-lg border border-border bg-muted px-4 py-2">
                <div className="text-muted-foreground text-xs">
                  Syntax highlighting • IntelliSense • Git integration
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Context Panel */}
        <div
          className="panel flex flex-col"
          style={{ width: '320px', borderLeft: '1px solid var(--color-border)' }}
        >
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-3 font-semibold text-foreground text-sm">Outline</div>
            <div className="space-y-1 text-sm">
              <div className="pl-2 text-muted-foreground">├─ Functions</div>
              <div className="cursor-pointer pl-4 text-foreground transition-colors hover:text-primary">
                ├─ authenticate()
              </div>
              <div className="cursor-pointer pl-4 text-foreground transition-colors hover:text-primary">
                └─ validateUser()
              </div>
              <div className="pl-2 text-muted-foreground">├─ Classes</div>
              <div className="cursor-pointer pl-4 text-foreground transition-colors hover:text-primary">
                └─ AuthService
              </div>
              <div className="pl-2 text-muted-foreground">└─ Exports</div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Related Files</div>
            <div className="space-y-1">
              <div className="flex cursor-pointer items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-primary">
                <span className="text-chart-2">•</span>
                <span>login.ts</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-primary">
                <span className="text-chart-2">•</span>
                <span>session.ts</span>
              </div>
              <div className="flex cursor-pointer items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-primary">
                <span className="text-chart-2">•</span>
                <span>middleware.ts</span>
              </div>
            </div>

            <div className="mt-6 mb-3 font-semibold text-foreground text-sm">Quick Actions</div>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground text-sm"
              >
                Format Document
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground text-sm"
              >
                Organize Imports
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground text-sm"
              >
                Find References
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodebaseView
