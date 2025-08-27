/**
 * Platform detection utilities for cross-platform design
 */

export type Platform = 'mac' | 'win' | 'linux' | 'unknown'

/**
 * Detects the current platform using Tauri's OS API
 * Returns 'mac', 'win', 'linux', or 'unknown'
 */
export async function getPlatform(): Promise<Platform> {
  if (!('__TAURI__' in window)) {
    return 'unknown'
  }

  try {
    // Dynamically import Tauri's os module
    const { platform } = await import('@tauri-apps/plugin-os')
    const platformName = await platform()

    switch (platformName) {
      case 'macos':
        return 'mac'
      case 'windows':
        return 'win'
      case 'linux':
        return 'linux'
      default:
        return 'unknown'
    }
  } catch (error) {
    console.warn('Failed to detect platform:', error)
    return 'unknown'
  }
}

/**
 * Sets the platform data attribute on the document body
 * This enables platform-specific CSS selectors like [data-platform="mac"]
 */
export async function setPlatformAttribute(): Promise<void> {
  const platformName = await getPlatform()
  document.body.setAttribute('data-platform', platformName)
}

/**
 * Gets platform-specific spacing values
 * macOS uses slightly more generous spacing
 */
export function getPlatformSpacing(platform: Platform) {
  switch (platform) {
    case 'mac':
      return {
        base: 'p-7',
        section: 'space-y-6',
        card: 'p-6',
      }
    case 'win':
      return {
        base: 'p-5',
        section: 'space-y-5',
        card: 'p-5',
      }
    default:
      return {
        base: 'p-6',
        section: 'space-y-5',
        card: 'p-5',
      }
  }
}
