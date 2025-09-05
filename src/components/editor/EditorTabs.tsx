import { basename } from '@/lib/fs-tauri'
import { getFileIcon } from '@/lib/monaco-setup'
import { cn } from '@/lib/utils'
import { useStore } from '@nanostores/react'
import { X } from 'lucide-react'
import { $editorState, closeFile, openFile } from '@/stores/file-explorer.store'

export default function EditorTabs() {
  const editorState = useStore($editorState)

  const openFiles = editorState.fileOrder.map((path) => editorState.openFiles[path]).filter(Boolean)

  if (openFiles.length === 0) {
    return null
  }

  const handleTabClick = (filePath: string) => {
    openFile(filePath)
  }

  const handleCloseTab = (e: React.MouseEvent, filePath: string) => {
    e.stopPropagation()
    closeFile(filePath)
  }

  return (
    <div className="flex h-9 border-b border-border bg-muted/30">
      {openFiles.map((file) => (
        <div
          key={file.path}
          className={cn(
            'group flex items-center gap-2 border-r border-border px-3 py-2 cursor-pointer transition-colors min-w-0 max-w-48',
            file.isActive
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
          onClick={() => handleTabClick(file.path)}
          title={file.path}
        >
          <span className="text-sm">{getFileIcon(file.path)}</span>
          <span className="text-sm truncate">
            {basename(file.path)}
            {file.isDirty && <span className="ml-1 text-orange-500">•</span>}
          </span>
          <button
            type="button"
            className={cn(
              'ml-auto flex-shrink-0 rounded p-0.5 transition-colors',
              'hover:bg-muted-foreground/20',
              file.isActive
                ? 'opacity-60 hover:opacity-100'
                : 'opacity-0 group-hover:opacity-60 hover:!opacity-100'
            )}
            onClick={(e) => handleCloseTab(e, file.path)}
            title="Close file"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  )
}
