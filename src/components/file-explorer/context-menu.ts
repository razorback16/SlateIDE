import { Menu, MenuItem, PredefinedMenuItem } from '@tauri-apps/api/menu'
import { LogicalPosition } from '@tauri-apps/api/dpi'
import { revealItemInDir } from '@tauri-apps/plugin-opener'
import { platform } from '@tauri-apps/plugin-os'
import type { FsNode } from './types'

async function getRevealMenuText(): Promise<string> {
  const currentPlatform = await platform()
  switch (currentPlatform) {
    case 'macos':
      return 'Reveal in Finder'
    case 'windows':
      return 'Show in Explorer'
    default:
      return 'Show in File Manager'
  }
}

async function revealInFileManager(filePath: string): Promise<void> {
  // Use Tauri's opener plugin which handles all platforms automatically
  await revealItemInDir(filePath)
}

export interface ContextMenuOptions {
  node: FsNode
  onNewFile: () => void
  onNewFolder: () => void
  onRename: () => void
  onDelete: () => void
}

export async function showFileExplorerContextMenu(
  options: ContextMenuOptions,
  position?: { x: number; y: number }
): Promise<void> {
  const { node, onNewFile, onNewFolder, onRename, onDelete } = options
  const { isFolder } = node

  const menuItems: (MenuItem | PredefinedMenuItem)[] = []

  if (isFolder) {
    // Folder context menu items
    menuItems.push(
      await MenuItem.new({
        id: 'new-file',
        text: 'New File',
        action: onNewFile,
      }),
      await MenuItem.new({
        id: 'new-folder',
        text: 'New Folder',
        action: onNewFolder,
      }),
      await PredefinedMenuItem.new({
        item: 'Separator',
      })
    )
  }

  // Common items for both files and folders
  menuItems.push(
    await MenuItem.new({
      id: 'rename',
      text: 'Rename',
      action: onRename,
    }),
    await MenuItem.new({
      id: 'delete',
      text: 'Delete',
      action: onDelete,
    }),
    await PredefinedMenuItem.new({
      item: 'Separator',
    }),
    await MenuItem.new({
      id: 'copy-path',
      text: 'Copy Path',
      action: async () => {
        try {
          // Use browser clipboard API as fallback
          await navigator.clipboard.writeText(node.id)
        } catch (error) {
          console.error('Failed to copy path to clipboard:', error)
        }
      },
    }),
    await MenuItem.new({
      id: 'reveal-in-explorer',
      text: await getRevealMenuText(),
      action: async () => {
        try {
          await revealInFileManager(node.id)
        } catch (error) {
          console.error('Failed to reveal in file manager:', error)
        }
      },
    })
  )

  const menu = await Menu.new({
    items: menuItems,
  })

  const menuPosition = position ? new LogicalPosition(position.x, position.y) : undefined
  await menu.popup(menuPosition)
}