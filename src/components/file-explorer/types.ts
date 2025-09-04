export type NodeId = string // absolute path

export interface FsNode {
  id: NodeId
  name: string
  isFolder: boolean
  children?: NodeId[] // only set after loaded
  isOpen?: boolean
  isLoading?: boolean
  parent?: NodeId
}

export interface FileExplorerState {
  rootIds: NodeId[]
  nodes: Record<NodeId, FsNode>
  activeFileId?: NodeId
  selectedIds: Set<NodeId>
  isLoading: boolean
  error: string | null
}

export interface EditorFile {
  path: string
  content: string
  language: string
  isDirty: boolean
  isActive: boolean
}

export interface EditorState {
  openFiles: Record<string, EditorFile>
  activeFilePath?: string
  fileOrder: string[] // for tab ordering
}

export interface FileOperation {
  type: 'create-file' | 'create-folder' | 'rename' | 'delete' | 'move'
  sourcePath?: string
  targetPath: string
  isFolder?: boolean
}

export interface DragDropOperation {
  dragIds: NodeId[]
  parentId?: NodeId
  index?: number
}

export interface ContextMenuOptions {
  x: number
  y: number
  nodeId?: NodeId
  isBackground?: boolean
}
