import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileExplorer } from '@/components/codebase/FileExplorer'
import { MonacoEditor } from '@/components/codebase/MonacoEditor'
import { ContextPane } from '@/components/codebase/ContextPane'
import { WorkingSet } from '@/components/codebase/WorkingSet'

export function CodebaseView() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full gap-4">
      {/* File Explorer with integrated tabs */}
      <ResizablePanel defaultSize={25} minSize={15} maxSize={35}>
        <div className="h-full min-w-0 overflow-hidden">
          <div className="ide-panel h-full">
            <Tabs defaultValue="working-set" className="h-full flex flex-col">
              {/* Tab bar inside the panel */}
              <div className="border-b border-white/10 p-3 pb-0">
                <TabsList className="bg-transparent h-8 space-x-1 w-full">
                  <TabsTrigger value="working-set" className="tab-glass text-xs px-3 flex-1">Working Set</TabsTrigger>
                  <TabsTrigger value="tree" className="tab-glass text-xs px-3 flex-1">Tree+</TabsTrigger>
                  <TabsTrigger value="code-map" className="tab-glass text-xs px-2 flex-1">Map</TabsTrigger>
                  <TabsTrigger value="search" className="tab-glass text-xs px-3 flex-1">Search</TabsTrigger>
                </TabsList>
              </div>
              
              {/* Tab content */}
              <TabsContent value="working-set" className="flex-1 m-0 p-0">
                <WorkingSet />
              </TabsContent>
              <TabsContent value="tree" className="flex-1 m-0 p-0">
                <FileExplorer />
              </TabsContent>
              <TabsContent value="code-map" className="flex-1 m-0 p-0">
                <div className="p-4">
                  <h3 className="text-sm font-medium mb-2">Code Map</h3>
                  <p className="text-xs text-muted-foreground">Visual code dependency graph</p>
                </div>
              </TabsContent>
              <TabsContent value="search" className="flex-1 m-0 p-0">
                <div className="p-4">
                  <h3 className="text-sm font-medium mb-2">Search</h3>
                  <p className="text-xs text-muted-foreground">Global search across codebase</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Code Editor - flex: 1 */}
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="h-full min-w-0 overflow-hidden">
          <div className="ide-panel h-full">
            <MonacoEditor />
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Context Pane - 320px */}
      <ResizablePanel defaultSize={25} minSize={15} maxSize={30}>
        <div className="h-full min-w-0 overflow-hidden">
          <ContextPane />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}