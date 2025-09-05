import * as fs from '@/lib/fs-tauri'
import { basename, dirname, getExtension } from '@/lib/fs-tauri'
import { join } from '@tauri-apps/api/path'
import { getLanguageFromPath } from '@/lib/monaco-setup'
import { generateUniqueName, sortPaths, updateDescendantPaths } from '@/lib/path-utils'
import { listen } from '@tauri-apps/api/event'
import { open } from '@tauri-apps/plugin-dialog'
import { persistentAtom } from '@nanostores/persistent'
import { atom, map } from 'nanostores'
import { toast } from 'sonner'
import type { EditorFile, EditorState, FileExplorerState, FsNode, NodeId } from './types'

interface MenuAction {
  action: string
}

// File Explorer State
export const $fileExplorerState = atom<FileExplorerState>({
  rootIds: [],
  nodes: {},
  activeFileId: undefined,
  selectedIds: new Set(),
  isLoading: false,
  error: null,
})

// Editor State
export const $editorState = atom<EditorState>({
  openFiles: {},
  activeFilePath: undefined,
  fileOrder: [],
})

// Last opened folder (persistent)
export const $lastOpenedFolder = persistentAtom<string | undefined>(
  'slate-ide:last-folder',
  undefined
)

// Actions
export async function openFolder() {
  try {
    const selectedPath = await fs.selectFolder()
    if (!selectedPath) return

    $lastOpenedFolder.set(selectedPath)
    await loadRootFolder(selectedPath)
  } catch (error) {
    console.error('Failed to open folder:', error)
    toast.error('Failed to open folder')
  }
}

export async function loadRootFolder(path: string) {
  const state = $fileExplorerState.get()
  $fileExplorerState.set({ ...state, isLoading: true, error: null })

  try {
    const rootNode: FsNode = {
      id: path,
      name: basename(path),
      isFolder: true,
      isOpen: true,
      children: [],
    }

    const children = await fs.readDir(path)
    const sortedChildren = sortPaths(children)
    const childNodes: Record<NodeId, FsNode> = {}

    for (const child of sortedChildren) {
      childNodes[child.path] = {
        id: child.path,
        name: child.name,
        isFolder: child.isDir,
        parent: path,
      }
    }

    rootNode.children = sortedChildren.map((c) => c.path)

    $fileExplorerState.set({
      rootIds: [path],
      nodes: { [path]: rootNode, ...childNodes },
      activeFileId: undefined,
      selectedIds: new Set(),
      isLoading: false,
      error: null,
    })
  } catch (error) {
    console.error('Failed to load folder:', error)
    $fileExplorerState.set({
      ...state,
      isLoading: false,
      error: 'Failed to load folder',
    })
    toast.error('Failed to load folder')
  }
}

export async function ensureLoaded(nodeId: NodeId) {
  const state = $fileExplorerState.get()
  const node = state.nodes[nodeId]

  if (!node || !node.isFolder || node.children !== undefined || node.isLoading) {
    return
  }

  // Mark as loading
  $fileExplorerState.set({
    ...state,
    nodes: {
      ...state.nodes,
      [nodeId]: { ...node, isLoading: true },
    },
  })

  try {
    const children = await fs.readDir(nodeId)
    const sortedChildren = sortPaths(children)
    const childNodes: Record<NodeId, FsNode> = {}

    for (const child of sortedChildren) {
      childNodes[child.path] = {
        id: child.path,
        name: child.name,
        isFolder: child.isDir,
        parent: nodeId,
      }
    }

    const updatedState = $fileExplorerState.get()
    $fileExplorerState.set({
      ...updatedState,
      nodes: {
        ...updatedState.nodes,
        ...childNodes,
        [nodeId]: {
          ...updatedState.nodes[nodeId],
          children: sortedChildren.map((c) => c.path),
          isLoading: false,
        },
      },
    })
  } catch (error) {
    console.error('Failed to load directory:', error)
    const updatedState = $fileExplorerState.get()
    $fileExplorerState.set({
      ...updatedState,
      nodes: {
        ...updatedState.nodes,
        [nodeId]: { ...updatedState.nodes[nodeId], isLoading: false },
      },
    })
    toast.error(`Failed to load directory: ${basename(nodeId)}`)
  }
}

export async function openFile(filePath: string) {
  try {
    const editorState = $editorState.get()

    // If file is already open, just make it active
    if (editorState.openFiles[filePath]) {
      $editorState.set({
        ...editorState,
        activeFilePath: filePath,
        openFiles: {
          ...editorState.openFiles,
          [filePath]: { ...editorState.openFiles[filePath], isActive: true },
        },
      })

      // Deactivate other files
      const updatedFiles = { ...editorState.openFiles }
      for (const path in updatedFiles) {
        if (path !== filePath) {
          updatedFiles[path] = { ...updatedFiles[path], isActive: false }
        }
      }

      $editorState.set({
        ...editorState,
        activeFilePath: filePath,
        openFiles: updatedFiles,
      })
      return
    }

    // Load file content
    const content = await fs.readTextFile(filePath)
    const language = getLanguageFromPath(filePath)

    const newFile: EditorFile = {
      path: filePath,
      content,
      language,
      isDirty: false,
      isActive: true,
    }

    // Deactivate other files
    const updatedFiles = { ...editorState.openFiles }
    for (const path in updatedFiles) {
      updatedFiles[path] = { ...updatedFiles[path], isActive: false }
    }
    updatedFiles[filePath] = newFile

    $editorState.set({
      openFiles: updatedFiles,
      activeFilePath: filePath,
      fileOrder: [...editorState.fileOrder, filePath],
    })

    // Update file explorer selection
    const explorerState = $fileExplorerState.get()
    $fileExplorerState.set({
      ...explorerState,
      activeFileId: filePath,
      selectedIds: new Set([filePath]),
    })
  } catch (error) {
    console.error('Failed to open file:', error)
    toast.error(`Failed to open file: ${basename(filePath)}`)
  }
}

export function closeFile(filePath: string) {
  const editorState = $editorState.get()
  const { [filePath]: removed, ...remainingFiles } = editorState.openFiles
  const newFileOrder = editorState.fileOrder.filter((path) => path !== filePath)

  let newActiveFilePath = editorState.activeFilePath
  if (editorState.activeFilePath === filePath) {
    // Find next active file
    const currentIndex = editorState.fileOrder.indexOf(filePath)
    if (newFileOrder.length > 0) {
      if (currentIndex > 0) {
        newActiveFilePath = newFileOrder[currentIndex - 1]
      } else {
        newActiveFilePath = newFileOrder[0]
      }

      // Mark new active file
      if (newActiveFilePath && remainingFiles[newActiveFilePath]) {
        remainingFiles[newActiveFilePath] = {
          ...remainingFiles[newActiveFilePath],
          isActive: true,
        }
      }
    } else {
      newActiveFilePath = undefined
    }
  }

  $editorState.set({
    openFiles: remainingFiles,
    activeFilePath: newActiveFilePath,
    fileOrder: newFileOrder,
  })
}

export function updateFileContent(filePath: string, content: string) {
  const editorState = $editorState.get()
  const file = editorState.openFiles[filePath]

  if (file) {
    $editorState.set({
      ...editorState,
      openFiles: {
        ...editorState.openFiles,
        [filePath]: {
          ...file,
          content,
          isDirty: true,
        },
      },
    })
  }
}

export async function saveFile(filePath: string) {
  try {
    const editorState = $editorState.get()
    const file = editorState.openFiles[filePath]

    if (file) {
      await fs.writeTextFile(filePath, file.content)

      $editorState.set({
        ...editorState,
        openFiles: {
          ...editorState.openFiles,
          [filePath]: { ...file, isDirty: false },
        },
      })

      toast.success(`Saved ${basename(filePath)}`)
    }
  } catch (error) {
    console.error('Failed to save file:', error)
    toast.error(`Failed to save file: ${basename(filePath)}`)
  }
}

export async function createFile(parentPath: string, fileName: string) {
  try {
    const explorerState = $fileExplorerState.get()
    const parentNode = explorerState.nodes[parentPath]

    if (!parentNode || !parentNode.isFolder) {
      toast.error('Invalid parent directory')
      return
    }

    // Generate unique name if needed
    const existingNames = (parentNode.children || [])
      .map((id) => explorerState.nodes[id]?.name)
      .filter(Boolean)

    const uniqueName = generateUniqueName(fileName, existingNames)
    const newFilePath = fs.joinPath(parentPath, uniqueName)

    await fs.writeTextFile(newFilePath, '')

    // Add to parent's children
    const newNode: FsNode = {
      id: newFilePath,
      name: uniqueName,
      isFolder: false,
      parent: parentPath,
    }

    const updatedChildren = [...(parentNode.children || []), newFilePath]

    $fileExplorerState.set({
      ...explorerState,
      nodes: {
        ...explorerState.nodes,
        [newFilePath]: newNode,
        [parentPath]: { ...parentNode, children: updatedChildren },
      },
    })

    toast.success(`Created ${uniqueName}`)

    // Open the new file
    await openFile(newFilePath)
  } catch (error) {
    console.error('Failed to create file:', error)
    toast.error('Failed to create file')
  }
}

export async function createFolder(parentPath: string, folderName: string) {
  try {
    const explorerState = $fileExplorerState.get()
    const parentNode = explorerState.nodes[parentPath]

    if (!parentNode || !parentNode.isFolder) {
      toast.error('Invalid parent directory')
      return
    }

    // Generate unique name if needed
    const existingNames = (parentNode.children || [])
      .map((id) => explorerState.nodes[id]?.name)
      .filter(Boolean)

    const uniqueName = generateUniqueName(folderName, existingNames)
    const newFolderPath = fs.joinPath(parentPath, uniqueName)

    await fs.createDir(newFolderPath)

    // Add to parent's children
    const newNode: FsNode = {
      id: newFolderPath,
      name: uniqueName,
      isFolder: true,
      parent: parentPath,
    }

    const updatedChildren = [...(parentNode.children || []), newFolderPath]

    $fileExplorerState.set({
      ...explorerState,
      nodes: {
        ...explorerState.nodes,
        [newFolderPath]: newNode,
        [parentPath]: { ...parentNode, children: updatedChildren },
      },
    })

    toast.success(`Created folder ${uniqueName}`)
  } catch (error) {
    console.error('Failed to create folder:', error)
    toast.error('Failed to create folder')
  }
}

export async function deleteNode(nodeId: NodeId) {
  try {
    const explorerState = $fileExplorerState.get()
    const node = explorerState.nodes[nodeId]

    if (!node) {
      toast.error('Node not found')
      return
    }

    await fs.removeFile(nodeId)

    // Remove from parent's children
    const parentId = node.parent
    if (parentId && explorerState.nodes[parentId]) {
      const parent = explorerState.nodes[parentId]
      const updatedChildren = (parent.children || []).filter((id) => id !== nodeId)

      explorerState.nodes[parentId] = { ...parent, children: updatedChildren }
    }

    // Remove from nodes (and all descendants)
    const nodesToRemove = [nodeId]
    if (node.isFolder && node.children) {
      const addDescendants = (children: NodeId[]) => {
        for (const childId of children) {
          nodesToRemove.push(childId)
          const childNode = explorerState.nodes[childId]
          if (childNode?.isFolder && childNode.children) {
            addDescendants(childNode.children)
          }
        }
      }
      addDescendants(node.children)
    }

    const updatedNodes = { ...explorerState.nodes }
    for (const id of nodesToRemove) {
      delete updatedNodes[id]
    }

    $fileExplorerState.set({
      ...explorerState,
      nodes: updatedNodes,
    })

    // Close file if it was open
    if (!node.isFolder) {
      const editorState = $editorState.get()
      if (editorState.openFiles[nodeId]) {
        closeFile(nodeId)
      }
    }

    toast.success(`Deleted ${node.name}`)
  } catch (error) {
    console.error('Failed to delete:', error)
    toast.error('Failed to delete')
  }
}

export async function renameNode(nodeId: NodeId, newName: string) {
  try {
    const explorerState = $fileExplorerState.get()
    const node = explorerState.nodes[nodeId]

    if (!node) {
      toast.error('Node not found')
      return
    }

    const oldPath = nodeId
    const parentDir = dirname(oldPath)
    const newPath = await join(parentDir, newName)

    // Check if new name already exists
    if (await fs.exists(newPath)) {
      toast.error('A file or folder with that name already exists')
      return
    }

    // Rename the file/folder on the filesystem
    await fs.renameFile(oldPath, newPath)

    // Update the node in the explorer state
    const updatedNode = { ...node, name: newName, id: newPath }
    
    // If this is a folder, we need to update all descendant paths
    if (node.isFolder && node.children) {
      // Recursively update all descendant nodes
      const updateNodePaths = (nodeId: string, oldBasePath: string, newBasePath: string) => {
        const currentNode = explorerState.nodes[nodeId]
        if (!currentNode) return

        const newNodePath = currentNode.id.replace(oldBasePath, newBasePath)
        
        // Create new node with updated path
        explorerState.nodes[newNodePath] = {
          ...currentNode,
          id: newNodePath,
          name: basename(newNodePath),
          parent: currentNode.parent?.replace(oldBasePath, newBasePath)
        }
        
        // Update children array to point to new paths
        if (currentNode.children) {
          explorerState.nodes[newNodePath].children = currentNode.children.map(childId => 
            childId.replace(oldBasePath, newBasePath)
          )
          
          // Recursively update children
          for (const childId of currentNode.children) {
            updateNodePaths(childId, oldBasePath, newBasePath)
          }
        }
        
        // Remove old node
        delete explorerState.nodes[nodeId]
      }
      
      // Update this node and all descendants
      updateNodePaths(oldPath, oldPath, newPath)
      
      // Update parent's children array
      if (node.parent && explorerState.nodes[node.parent]) {
        const parent = explorerState.nodes[node.parent]
        parent.children = parent.children?.map(childId => 
          childId === oldPath ? newPath : childId
        )
      }
    } else {
      // For files, just update this node and its parent's children
      explorerState.nodes[newPath] = updatedNode
      delete explorerState.nodes[oldPath]
      
      // Update parent's children array
      if (node.parent && explorerState.nodes[node.parent]) {
        const parent = explorerState.nodes[node.parent]
        parent.children = parent.children?.map(childId => 
          childId === oldPath ? newPath : childId
        )
      }
    }

    // Update editor state if file was open
    const editorState = $editorState.get()
    if (editorState.openFiles[oldPath]) {
      const fileData = editorState.openFiles[oldPath]
      editorState.openFiles[newPath] = { ...fileData, path: newPath }
      delete editorState.openFiles[oldPath]
      
      // Update file order
      editorState.fileOrder = editorState.fileOrder.map(path => 
        path === oldPath ? newPath : path
      )
      
      // Update active file path if needed
      if (editorState.activeFilePath === oldPath) {
        editorState.activeFilePath = newPath
      }
      
      $editorState.set(editorState)
    }

    $fileExplorerState.set(explorerState)
    toast.success(`Renamed to ${newName}`)
  } catch (error) {
    console.error('Failed to rename:', error)
    toast.error('Failed to rename')
  }
}

export function closeProject() {
  // Clear file explorer state
  $fileExplorerState.set({
    rootIds: [],
    nodes: {},
    activeFileId: undefined,
    selectedIds: new Set(),
    isLoading: false,
    error: null,
  })

  // Close all open files
  $editorState.set({
    openFiles: {},
    activeFilePath: undefined,
    fileOrder: [],
  })

  // Clear last opened folder
  $lastOpenedFolder.set(undefined)
  
  toast.success('Project closed')
}

// Initialize with last opened folder on startup
export async function initializeFileExplorer() {
  const lastFolder = $lastOpenedFolder.get()
  if (lastFolder) {
    try {
      await loadRootFolder(lastFolder)
    } catch (error) {
      console.warn('Failed to load last opened folder:', error)
      $lastOpenedFolder.set(undefined)
    }
  }
  
  // Listen for menu events from native menu
  listen<MenuAction>('menu-action', async (event) => {
    const { action } = event.payload
    
    switch (action) {
      case 'new_project':
      case 'open_project': {
        try {
          // Open folder picker dialog from frontend
          const selected = await open({
            directory: true,
            multiple: false,
            title: action === 'new_project' ? 'Select folder for new project' : 'Open existing project',
          })
          
          if (selected && typeof selected === 'string') {
            const projectPath = selected
            const projectName = basename(projectPath)
            
            // Save the new project path as last opened
            $lastOpenedFolder.set(projectPath)
            // Load the project folder
            await loadRootFolder(projectPath)
            toast.success(`${action === 'new_project' ? 'Created' : 'Opened'} project: ${projectName}`)
          } else {
            console.log('User canceled project selection')
          }
        } catch (error) {
          console.error('Failed to open project dialog:', error)
          toast.error('Failed to open project dialog')
        }
        break
      }
      case 'close_project':
        closeProject()
        break
      default:
        console.warn('Unknown menu action:', action)
    }
  }).catch((error) => {
    console.error('Failed to set up menu event listener:', error)
  })
}
