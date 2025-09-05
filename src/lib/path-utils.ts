/**
 * Path utilities for cross-platform file operations
 */

/**
 * Get the parent directory of a path
 */
export function getParentPath(filePath: string): string {
  const parts = filePath.replace(/[/\\]$/, '').split(/[/\\]/)
  parts.pop()
  return parts.join('/') || '/'
}

/**
 * Check if a path is a descendant of another path
 */
export function isDescendantOf(childPath: string, parentPath: string): boolean {
  const normalizedChild = childPath.replace(/\\/g, '/').replace(/\/$/, '')
  const normalizedParent = parentPath.replace(/\\/g, '/').replace(/\/$/, '')

  return normalizedChild.startsWith(`${normalizedParent}/`)
}

/**
 * Get relative path from parent to child
 */
export function getRelativePath(parentPath: string, childPath: string): string {
  const normalizedParent = parentPath.replace(/\\/g, '/').replace(/\/$/, '')
  const normalizedChild = childPath.replace(/\\/g, '/')

  if (!normalizedChild.startsWith(normalizedParent)) {
    return childPath
  }

  return normalizedChild.slice(normalizedParent.length + 1)
}

/**
 * Update all descendant paths when a parent path changes
 */
export function updateDescendantPaths(
  paths: string[],
  oldParentPath: string,
  newParentPath: string
): string[] {
  const normalizedOldParent = oldParentPath.replace(/\\/g, '/').replace(/\/$/, '')
  const normalizedNewParent = newParentPath.replace(/\\/g, '/').replace(/\/$/, '')

  return paths.map((path) => {
    const normalizedPath = path.replace(/\\/g, '/')

    if (normalizedPath === normalizedOldParent) {
      return normalizedNewParent
    }

    if (normalizedPath.startsWith(`${normalizedOldParent}/`)) {
      return normalizedNewParent + normalizedPath.slice(normalizedOldParent.length)
    }

    return path
  })
}

/**
 * Sort paths for display (directories first, then files, alphabetically)
 */
export function sortPaths<T extends { path: string; name: string; isDir: boolean }>(
  paths: T[]
): T[] {
  return paths.sort((a, b) => {
    // Directories first
    if (a.isDir && !b.isDir) return -1
    if (!a.isDir && b.isDir) return 1

    // Then alphabetically by name
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    return aName.localeCompare(bName)
  })
}

/**
 * Check if two paths are the same (normalize separators)
 */
export function pathsEqual(path1: string, path2: string): boolean {
  return path1.replace(/\\/g, '/') === path2.replace(/\\/g, '/')
}

/**
 * Generate a unique name for a new file/folder
 */
export function generateUniqueName(baseName: string, existingNames: string[]): string {
  if (!existingNames.includes(baseName)) {
    return baseName
  }

  let counter = 1
  let newName = `${baseName} ${counter}`

  while (existingNames.includes(newName)) {
    counter++
    newName = `${baseName} ${counter}`
  }

  return newName
}
