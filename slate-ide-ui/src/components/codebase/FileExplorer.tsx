import { useState } from 'react'
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, File } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

// Mock file tree data
interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  expanded?: boolean
}

const fileTree: FileNode[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: 'components',
        name: 'components',
        type: 'folder',
        expanded: true,
        children: [
          { id: 'auth', name: 'AuthForm.tsx', type: 'file' },
          { id: 'user', name: 'UserProfile.tsx', type: 'file' },
        ]
      },
      {
        id: 'lib',
        name: 'lib',
        type: 'folder',
        expanded: false,
        children: [
          { id: 'auth-lib', name: 'auth.ts', type: 'file' },
          { id: 'api-lib', name: 'api.ts', type: 'file' },
          { id: 'utils-lib', name: 'utils.ts', type: 'file' },
        ]
      },
      { id: 'app', name: 'App.tsx', type: 'file' },
      { id: 'main', name: 'main.tsx', type: 'file' },
    ]
  },
  {
    id: 'public',
    name: 'public',
    type: 'folder',
    expanded: false,
    children: [
      { id: 'index-html', name: 'index.html', type: 'file' },
    ]
  },
  { id: 'package', name: 'package.json', type: 'file' },
  { id: 'readme', name: 'README.md', type: 'file' },
]

interface FileTreeItemProps {
  node: FileNode
  level: number
  onToggle: (id: string) => void
}

function FileTreeItem({ node, level, onToggle }: FileTreeItemProps) {
  const handleToggle = () => {
    if (node.type === 'folder') {
      onToggle(node.id)
    }
  }

  const getIcon = () => {
    if (node.type === 'folder') {
      return node.expanded ? (
        <FolderOpen className="h-4 w-4 text-blue-400" />
      ) : (
        <Folder className="h-4 w-4 text-blue-400" />
      )
    }
    
    // File icons based on extension
    if (node.name.endsWith('.tsx') || node.name.endsWith('.ts')) {
      return <FileText className="h-4 w-4 text-blue-300" />
    }
    if (node.name.endsWith('.json')) {
      return <FileText className="h-4 w-4 text-yellow-400" />
    }
    if (node.name.endsWith('.md')) {
      return <FileText className="h-4 w-4 text-gray-400" />
    }
    return <File className="h-4 w-4 text-muted-foreground" />
  }

  return (
    <div>
      <div
        className="flex items-center gap-1 px-1 py-0.5 rounded-sm hover:bg-muted/50 cursor-pointer group"
        style={{ paddingLeft: `${level * 12 + 4}px` }}
        onClick={handleToggle}
      >
        {node.type === 'folder' ? (
          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
            {node.expanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
        ) : (
          <div className="w-4" />
        )}
        
        {getIcon()}
        <span className="text-sm select-none">{node.name}</span>
      </div>
      
      {node.type === 'folder' && node.expanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeItem
              key={child.id}
              node={child}
              level={level + 1}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileExplorer() {
  const [treeData, setTreeData] = useState(fileTree)

  const handleToggle = (id: string) => {
    const toggleNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return { ...node, expanded: !node.expanded }
        }
        if (node.children) {
          return { ...node, children: toggleNode(node.children) }
        }
        return node
      })
    }
    
    setTreeData(toggleNode(treeData))
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-border">
        <h3 className="text-sm font-medium">File Explorer</h3>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {treeData.map((node) => (
            <FileTreeItem
              key={node.id}
              node={node}
              level={0}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}