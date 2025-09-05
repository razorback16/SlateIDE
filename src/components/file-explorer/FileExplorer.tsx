import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getFileIcon } from '@/lib/monaco-setup'
import { cn } from '@/lib/utils'
import { useStore } from '@nanostores/react'
import { ChevronDown, ChevronRight, File, FolderPlus, Loader2 } from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { NodeRendererProps, Tree } from 'react-arborist'
import useResizeObserver from 'use-resize-observer'
import { StatusIndicator } from './StatusIndicator'
import {
  $fileExplorerState,
  createFile,
  createFolder,
  deleteNode,
  ensureLoaded,
  openFile,
  renameNode,
} from '@/stores/file-explorer.store'
import { getMockGitStatus, hasFileErrors } from '@/lib/git-status'
import type { FsNode, NodeId } from './types'
import { showFileExplorerContextMenu } from './context-menu'

interface TreeData {
  id: NodeId
  name: string
  children?: TreeData[]
  data: FsNode
}

function NodeRenderer({ node, style, dragHandle }: NodeRendererProps<TreeData>) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const { data } = node.data
  const isFolder = data.isFolder
  const hasChildren = data.children !== undefined
  const isLoading = data.isLoading

  // Get status information for files
  const gitStatus = !isFolder ? getMockGitStatus(data.id) : null
  const fileHasErrors = !isFolder ? hasFileErrors(data.id) : false

  const handleToggle = useCallback(() => {
    if (isFolder) {
      node.toggle()
      if (!hasChildren && node.isOpen) {
        ensureLoaded(data.id)
      }
    }
  }, [isFolder, hasChildren, node, data.id])

  const handleClick = useCallback(() => {
    if (isRenaming) return
    
    if (isFolder) {
      handleToggle()
    } else {
      openFile(data.id)
    }
  }, [isRenaming, isFolder, handleToggle, data.id])

  const handleContextMenu = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    
    try {
      await showFileExplorerContextMenu({
        node: data,
        onNewFile: () => {
          if (isFolder) {
            createFile(data.id, 'untitled.txt')
          } else if (data.parent) {
            createFile(data.parent, 'untitled.txt')
          }
        },
        onNewFolder: () => {
          if (isFolder) {
            createFolder(data.id, 'New Folder')
          } else if (data.parent) {
            createFolder(data.parent, 'New Folder')
          }
        },
        onRename: handleRename,
        onDelete: () => {
          deleteNode(data.id)
        },
      }, { x: e.clientX, y: e.clientY })
    } catch (error) {
      console.error('Failed to show context menu:', error)
    }
  }, [isFolder, data])

  const handleNewFile = useCallback(() => {
    if (isFolder) {
      createFile(data.id, 'untitled.txt')
    } else if (data.parent) {
      createFile(data.parent, 'untitled.txt')
    }
  }, [isFolder, data.id, data.parent])

  const handleNewFolder = useCallback(() => {
    if (isFolder) {
      createFolder(data.id, 'New Folder')
    } else if (data.parent) {
      createFolder(data.parent, 'New Folder')
    }
  }, [isFolder, data.id, data.parent])

  const handleRename = useCallback(() => {
    setRenameValue(data.name)
    setIsRenaming(true)
  }, [data.name])

  const handleRenameSubmit = useCallback(async (newName: string) => {
    if (newName && newName !== data.name) {
      await renameNode(data.id, newName)
    }
    setIsRenaming(false)
  }, [data.id, data.name])

  const handleRenameCancel = useCallback(() => {
    setIsRenaming(false)
    setRenameValue('')
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleRenameSubmit(renameValue)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleRenameCancel()
    }
  }, [renameValue, handleRenameSubmit, handleRenameCancel])

  const icon = isFolder ? (
    isLoading ? (
      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
    ) : node.isOpen ? (
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    ) : (
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    )
  ) : (
    <span className="ml-4 text-sm">{getFileIcon(data.name)}</span>
  )

  return (
    <div
      ref={dragHandle}
      style={style}
      className={cn(
        'group flex items-center gap-2 rounded-sm mx-1 px-2 py-1 cursor-pointer transition-colors select-none w-[calc(100%-8px)]',
        node.isSelected
          ? 'bg-accent text-accent-foreground'
          : 'hover:bg-accent/50 hover:text-accent-foreground'
      )}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="flex items-center gap-1 flex-1 min-w-0">
        {icon}
        {isRenaming ? (
          <Input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => handleRenameSubmit(renameValue)}
            className="h-5 text-sm px-1 py-0 min-w-0 flex-1"
            autoFocus
            onFocus={(e) => e.target.select()}
          />
        ) : (
          <span className="truncate text-sm font-medium">{data.name}</span>
        )}
      </div>

      <div className="flex-shrink-0 flex items-center gap-1">
        {/* Show status indicator for files */}
        {!isFolder && <StatusIndicator status={gitStatus} hasErrors={fileHasErrors} />}
        
        {/* Show action buttons for folders on hover */}
        {isFolder && (
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0"
              onClick={(e) => {
                e.stopPropagation()
                handleNewFile()
              }}
              title="New File"
            >
              <File className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0"
              onClick={(e) => {
                e.stopPropagation()
                handleNewFolder()
              }}
              title="New Folder"
            >
              <FolderPlus className="h-3 w-3" />
            </Button>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default function FileExplorer() {
  const explorerState = useStore($fileExplorerState)
  const treeRef = useRef<any>(null)
  const { ref: containerRef, width, height } = useResizeObserver()

  const treeData = useMemo(() => {
    const buildTreeData = (nodeIds: NodeId[]): TreeData[] => {
      return nodeIds
        .map((id) => {
          const node = explorerState.nodes[id]
          if (!node) return null

          const treeNode: TreeData = {
            id: node.id,
            name: node.name,
            data: node,
          }

          if (node.isFolder && node.children) {
            treeNode.children = buildTreeData(node.children)
          }

          return treeNode
        })
        .filter(Boolean) as TreeData[]
    }

    return buildTreeData(explorerState.rootIds)
  }, [explorerState])

  const handleMove = useCallback(({ dragIds, parentId, index }: any) => {
    // TODO: Implement drag and drop functionality
    console.log('Move:', { dragIds, parentId, index })
  }, [])

  if (explorerState.isLoading) {
    return (
      <div ref={containerRef} className="flex h-full w-full items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    )
  }

  if (explorerState.error) {
    return (
      <div ref={containerRef} className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-destructive text-sm font-medium">Error</div>
          <div className="text-muted-foreground text-xs">{explorerState.error}</div>
        </div>
      </div>
    )
  }

  if (treeData.length === 0) {
    return (
      <div ref={containerRef} className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">📁</div>
          <div className="mb-2 font-semibold text-foreground text-sm">No folder open</div>
          <div className="text-muted-foreground text-xs">Open a folder to browse files</div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      <Tree
        ref={treeRef}
        data={treeData}
        height={height || 600}
        width={width}
        className="p-1"
        indent={16}
        rowHeight={24}
        openByDefault={false}
        disableMultiSelection={false}
        onMove={handleMove}
        onToggle={(id: string) => {
          ensureLoaded(id)
        }}
      >
        {NodeRenderer}
      </Tree>
    </div>
  )
}
