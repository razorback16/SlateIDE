import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import FileExplorer from '@/components/file-explorer/FileExplorer'
import CodeEditor from '@/components/editor/CodeEditor'
import { useStore } from '@nanostores/react'
import { explorerStore } from '@/components/file-explorer/file-explorer.store'
import * as monaco from 'monaco-editor'
import { getLanguageFromExtension } from '@/lib/monaco-setup'

const CodebaseView = () => {
  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal" autoSaveId="slate-layout">
        <ResizablePanel defaultSize={20} minSize={12} className="border-r">
          <FileExplorer />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={40}>
          <EditorArea />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

function EditorArea() {
  const { activeId } = useStore(explorerStore)
  if (!activeId) {
    return <div className="h-full grid place-items-center text-muted-foreground">Open a file…</div>
  }
  const uri = monaco.Uri.parse(`inmemory://${activeId}`)
  const model = monaco.editor.getModel(uri)
  const initial = model ? model.getValue() : ''
  const ext = activeId.split('.').pop() || ''
  return (
    <CodeEditor
      filePath={activeId}
      initialValue={initial}
      language={getLanguageFromExtension(ext)}
    />
  )
}

export default CodebaseView
