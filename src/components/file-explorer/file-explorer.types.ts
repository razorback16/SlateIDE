export type NodeId = string

export interface FsNode {
  id: NodeId
  name: string
  isFolder: boolean
  children?: NodeId[]
  isOpen?: boolean
  isLoading?: boolean
}

export interface ExplorerState {
  rootIds: NodeId[]
  nodes: Record<NodeId, FsNode>
  activeId?: NodeId
}
