import CodeEditor from '@/components/editor/CodeEditor'
import EditorTabs from '@/components/editor/EditorTabs'
import FileExplorer from '@/components/file-explorer/FileExplorer'
import { initializeFileExplorer } from '@/components/file-explorer/file-explorer.store'
import { Button } from '@/components/ui/button'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useEffect } from 'react'

const CodebaseView = () => {
  useEffect(() => {
    // Initialize file explorer with last opened folder
    initializeFileExplorer()
  }, [])

  return (
    <div className="view-container h-full">
      <ResizablePanelGroup direction="horizontal" autoSaveId="slate-layout">
        {/* File Explorer Panel */}
        <ResizablePanel defaultSize={20} minSize={12} className="border-r border-border">
          <FileExplorer />
        </ResizablePanel>

        <ResizableHandle />

        {/* Editor Panel */}
        <ResizablePanel minSize={40}>
          <div className="flex h-full flex-col">
            <EditorTabs />
            <div className="flex-1">
              <CodeEditor theme="slate-dark" />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Context Panel */}
        <ResizablePanel defaultSize={25} minSize={15} className="border-l border-border">
          <div className="flex h-full flex-col">
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default CodebaseView
