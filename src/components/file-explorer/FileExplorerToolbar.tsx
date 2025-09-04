import { Button } from '@/components/ui/button'
import { useStore } from '@nanostores/react'
import { File, FolderPlus, Plus } from 'lucide-react'
import { createFile, createFolder } from './file-explorer.store'
import { $fileExplorerState } from './file-explorer.store'

export default function FileExplorerToolbar() {
  const explorerState = useStore($fileExplorerState)
  const hasRoot = explorerState.rootIds.length > 0
  const rootId = hasRoot ? explorerState.rootIds[0] : null

  const handleNewFile = () => {
    if (rootId) {
      createFile(rootId, 'untitled.txt')
    }
  }

  const handleNewFolder = () => {
    if (rootId) {
      createFolder(rootId, 'New Folder')
    }
  }

  if (!hasRoot) {
    return (
      <div className="flex items-center justify-center p-4 text-muted-foreground text-sm">
        Open a project from the File menu to start coding
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 border-b border-border bg-muted/30 p-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleNewFile}
        className="flex items-center gap-1 px-2"
        title="New File"
      >
        <Plus className="h-3 w-3" />
        <File className="h-3 w-3" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleNewFolder}
        className="flex items-center gap-1 px-2"
        title="New Folder"
      >
        <Plus className="h-3 w-3" />
        <FolderPlus className="h-3 w-3" />
      </Button>
    </div>
  )
}
