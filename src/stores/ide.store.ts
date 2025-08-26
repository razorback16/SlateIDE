import { atom, map } from 'nanostores'
import { persistentAtom } from '@nanostores/persistent'

export type ViewType = 'codebase' | 'chat' | 'mcp' | 'agents' | 'hooks' | 'git' | 'settings'

export type Theme = 'dark' | 'light'

interface IDEState {
  activeView: ViewType
  sidebarExpanded: boolean
  theme: Theme
  commandPaletteOpen: boolean
}

// Persistent atoms for settings that should survive reload
export const $theme = persistentAtom<Theme>('theme', 'dark', {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export const $activeView = atom<ViewType>('codebase')
export const $sidebarExpanded = atom<boolean>(false)
export const $commandPaletteOpen = atom<boolean>(false)

// Session info
export const $sessionInfo = map({
  projectName: 'Untitled Project',
  sessionNumber: 1,
  branch: 'main',
})

// Status indicators
export const $mcpStatus = map<{
  connected: number
  total: number
  servers: Array<{ name: string; status: 'connected' | 'connecting' | 'disconnected' }>
}>({
  connected: 0,
  total: 0,
  servers: [],
})

export const $subAgentsStatus = map<{
  active: number
  available: number
}>({
  active: 0,
  available: 0,
})

// Navigation items configuration
export const navigationItems: Array<{
  id: ViewType
  icon: string
  label: string
  badge?: number
}> = [
  { id: 'codebase', icon: '📂', label: 'Codebase' },
  { id: 'chat', icon: '💬', label: 'Chat' },
  { id: 'mcp', icon: '🔌', label: 'MCP' },
  { id: 'agents', icon: '🤖', label: 'Sub-agents' },
  { id: 'hooks', icon: '🔗', label: 'Hooks' },
  { id: 'git', icon: '📦', label: 'Git' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
]

// Helper functions
export function setActiveView(view: ViewType) {
  $activeView.set(view)
}

export function toggleSidebar() {
  $sidebarExpanded.set(!$sidebarExpanded.get())
}

export function toggleCommandPalette() {
  $commandPaletteOpen.set(!$commandPaletteOpen.get())
}

export function toggleTheme() {
  const current = $theme.get()
  $theme.set(current === 'dark' ? 'light' : 'dark')
  
  // Apply theme to document
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', $theme.get())
  }
}

// Initialize theme on load
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', $theme.get())
}