import { useStore } from '@nanostores/react'
import { Tree, type NodeRendererProps } from 'react-arborist'
import { explorerStore, openRoot, ensureLoaded, activateFile } from './file-explorer.store'
import { Button } from '@/components/ui/button'
import { open } from '@tauri-apps/plugin-dialog'
import { useMemo } from 'react'

export default function FileExplorer() {
  const state = useStore(explorerStore)
  const data = useMemo(() => ({ rootIds: state.rootIds, data: state.nodes }), [state])

  const renderNode = (props: NodeRendererProps<any>) => {
    const { node, style } = props
    const { name } = node.data
    const isFolder = !node.isLeaf
    const icon = isFolder ? (node.isOpen ? '📂' : '📁') : '📄'
    return (
      <div style={style} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-accent">
        <span className="w-4 text-muted-foreground">{icon}</span>
        <span className="truncate">{name}</span>
      </div>
    )
  }

  const onToggle = (id: string, isOpen: boolean) => {
    if (isOpen) ensureLoaded(id)
  }

  const pickFolder = async () => {
    const selected = await open({ directory: true })
    if (typeof selected === 'string') openRoot(selected)
  }

  return (
    <div className="h-full text-sm">
      {state.rootIds.length === 0 && (
        <div className="p-4">
          <Button onClick={pickFolder} size="sm">Open Folder</Button>
        </div>
      )}
      {state.rootIds.length > 0 && (
        <Tree
          className="h-full"
          data={data}
          openByDefault={false}
          onToggle={onToggle}
          onActivate={(id) => activateFile(id)}
        >
          {renderNode}
        </Tree>
      )}
    </div>
  )
}
