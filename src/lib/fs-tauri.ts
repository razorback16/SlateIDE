import * as dialog from '@tauri-apps/plugin-dialog'
import * as fs from '@tauri-apps/plugin-fs'

export interface DirEntry {
  path: string
  name: string
  isDir: boolean
}

/**
 * Read directory contents
 */
export async function readDir(path: string): Promise<DirEntry[]> {
  try {
    const entries = await fs.readDir(path)
    return entries.map((entry) => ({
      path: joinPath(path, entry.name),
      name: entry.name,
      isDir: entry.isDirectory,
    }))
  } catch (error: any) {
    console.error('Error reading directory:', error)
    
    // Handle specific permission errors
    if (error.message?.includes('forbidden') || error.message?.includes('permission denied')) {
      throw new Error(`Permission denied: Cannot access "${basename(path)}". This directory may be protected.`)
    }
    
    // Handle other file system errors
    if (error.message?.includes('No such file or directory')) {
      throw new Error(`Directory not found: "${basename(path)}"`)
    }
    
    // Generic error fallback
    throw new Error(`Failed to read directory: ${basename(path)}`)
  }
}

/**
 * Read file contents as text
 */
export async function readTextFile(path: string): Promise<string> {
  try {
    return await fs.readTextFile(path)
  } catch (error: any) {
    console.error('Error reading file:', error)
    
    // Handle specific permission errors
    if (error.message?.includes('forbidden') || error.message?.includes('permission denied')) {
      throw new Error(`Permission denied: Cannot read "${basename(path)}". This file may be protected.`)
    }
    
    // Handle other file system errors
    if (error.message?.includes('No such file or directory')) {
      throw new Error(`File not found: "${basename(path)}"`)
    }
    
    // Handle binary file errors
    if (error.message?.includes('invalid utf-8') || error.message?.includes('binary')) {
      throw new Error(`Cannot read binary file: "${basename(path)}"`)
    }
    
    // Generic error fallback
    throw new Error(`Failed to read file: ${basename(path)}`)
  }
}

/**
 * Write text to file
 */
export async function writeTextFile(path: string, content: string): Promise<void> {
  try {
    await fs.writeTextFile(path, content)
  } catch (error) {
    console.error('Error writing file:', error)
    throw error
  }
}

/**
 * Create directory
 */
export async function createDir(path: string): Promise<void> {
  try {
    await fs.mkdir(path, { recursive: true })
  } catch (error) {
    console.error('Error creating directory:', error)
    throw error
  }
}

/**
 * Remove file or directory
 */
export async function removeFile(path: string): Promise<void> {
  try {
    await fs.remove(path, { recursive: true })
  } catch (error) {
    console.error('Error removing file/directory:', error)
    throw error
  }
}

/**
 * Rename/move file or directory
 */
export async function renameFile(oldPath: string, newPath: string): Promise<void> {
  try {
    await fs.rename(oldPath, newPath)
  } catch (error) {
    console.error('Error renaming file/directory:', error)
    throw error
  }
}

/**
 * Check if path exists
 */
export async function exists(path: string): Promise<boolean> {
  try {
    await fs.stat(path)
    return true
  } catch {
    return false
  }
}

/**
 * Check if path is a directory
 */
export async function isDirectory(path: string): Promise<boolean> {
  try {
    const stat = await fs.stat(path)
    return stat.isDirectory
  } catch {
    return false
  }
}

/**
 * Open folder dialog and return selected directory path
 */
export async function selectFolder(): Promise<string | null> {
  try {
    const selected = await dialog.open({
      directory: true,
      multiple: false,
    })
    return selected as string | null
  } catch (error) {
    console.error('Error selecting folder:', error)
    return null
  }
}

/**
 * Get basename of path (cross-platform)
 */
export function basename(path: string): string {
  return (
    path
      .replace(/[/\\]$/, '')
      .split(/[/\\]/)
      .pop() || path
  )
}

/**
 * Get directory name of path (cross-platform)
 */
export function dirname(path: string): string {
  const parts = path.replace(/[/\\]$/, '').split(/[/\\]/)
  parts.pop()
  return parts.join('/') || '/'
}

/**
 * Join path segments (cross-platform)
 */
export function joinPath(...segments: string[]): string {
  return segments
    .map((segment, index) => {
      if (index === 0) {
        return segment.replace(/[/\\]+$/, '')
      }
      return segment.replace(/^[/\\]+/, '').replace(/[/\\]+$/, '')
    })
    .filter((segment) => segment.length > 0)
    .join('/')
}

/**
 * Get file extension
 */
export function getExtension(path: string): string {
  const filename = basename(path)
  const dotIndex = filename.lastIndexOf('.')
  return dotIndex > 0 ? filename.slice(dotIndex + 1).toLowerCase() : ''
}
