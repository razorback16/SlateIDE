import { atom, map } from 'nanostores'

export type ViewType = 'codebase' | 'chat' | 'mcp' | 'agents' | 'hooks' | 'git'

export interface IDEState {
  activeView: ViewType
  sidebarExpanded: boolean
  commandPaletteOpen: boolean
}

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

import {
  Bot,
  FolderOpen,
  GitBranch,
  Link,
  type LucideIcon,
  MessageSquare,
  Plug,
} from 'lucide-react'

// Navigation items configuration
export const navigationItems: Array<{
  id: ViewType
  icon: LucideIcon
  label: string
  badge?: number
}> = [
  { id: 'codebase', icon: FolderOpen, label: 'Codebase' },
  { id: 'chat', icon: MessageSquare, label: 'Chat' },
  { id: 'mcp', icon: Plug, label: 'MCP' },
  { id: 'agents', icon: Bot, label: 'Sub-agents' },
  { id: 'hooks', icon: Link, label: 'Hooks' },
  { id: 'git', icon: GitBranch, label: 'Git' },
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
