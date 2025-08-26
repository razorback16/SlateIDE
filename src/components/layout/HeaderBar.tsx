import { Component, createSignal, Show } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { 
  $sessionInfo, 
  $mcpStatus, 
  $subAgentsStatus,
  $theme,
  toggleCommandPalette,
  toggleTheme
} from '#/stores/ide.store'

const HeaderBar: Component = () => {
  const sessionInfo = useStore($sessionInfo)
  const mcpStatus = useStore($mcpStatus)
  const subAgentsStatus = useStore($subAgentsStatus)
  const theme = useStore($theme)
  const [userMenuOpen, setUserMenuOpen] = createSignal(false)

  return (
    <header class="ide-header">
      {/* Left Section */}
      <div class="header-left">
        {/* Logo */}
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded bg-accent-primary flex items-center justify-center">
            <span class="text-white text-xs font-bold">CC</span>
          </div>
          <span class="text-sm font-semibold text-primary">Claude Code</span>
        </div>
      </div>

      {/* Center Section */}
      <div class="header-center">
        <div class="breadcrumb">
          <div class="breadcrumb-item">
            <span>{sessionInfo().projectName}</span>
          </div>
          <span class="breadcrumb-separator">›</span>
          <div class="breadcrumb-item">
            <span>Session #{sessionInfo().sessionNumber}</span>
          </div>
          <span class="breadcrumb-separator">›</span>
          <div class="breadcrumb-item active">
            <span>Branch: {sessionInfo().branch}</span>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div class="flex items-center gap-2 ml-4">
          <button class="text-xs px-2 py-1 rounded hover:bg-hover transition-colors text-secondary hover:text-primary">
            Resume
          </button>
          <button class="text-xs px-2 py-1 rounded hover:bg-hover transition-colors text-secondary hover:text-primary">
            Branch
          </button>
          <button class="text-xs px-2 py-1 rounded hover:bg-hover transition-colors text-secondary hover:text-primary">
            New Session
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div class="header-right">
        {/* Command Palette Trigger */}
        <button
          onClick={toggleCommandPalette}
          class="command-palette-trigger"
        >
          <span>Search...</span>
          <kbd class="kbd">⌘K</kbd>
        </button>

        {/* Status Indicators */}
        <div class="flex items-center gap-2">
          {/* MCP Status */}
          <div class="status-indicator">
            <div class={`status-dot ${mcpStatus().connected > 0 ? 'connected' : 'disconnected'}`}></div>
            <span class="text-xs">
              MCP {mcpStatus().connected}/{mcpStatus().total}
            </span>
          </div>

          {/* Sub-agents Status */}
          <Show when={subAgentsStatus().active > 0}>
            <div class="status-indicator">
              <div class="status-dot connected"></div>
              <span class="text-xs">
                {subAgentsStatus().active} agents active
              </span>
            </div>
          </Show>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          class="p-2 rounded hover:bg-hover transition-colors text-secondary hover:text-primary"
          title={`Switch to ${theme() === 'dark' ? 'light' : 'dark'} theme`}
        >
          <Show when={theme() === 'dark'} fallback={
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          }>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </Show>
        </button>

        {/* User Avatar/Menu */}
        <div class="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen())}
            class="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            U
          </button>
          
          <Show when={userMenuOpen()}>
            <div class="absolute right-0 top-full mt-2 w-48 bg-elevated rounded-lg shadow-lg border border-subtle py-2">
              <a href="#" class="block px-4 py-2 text-sm text-secondary hover:bg-hover hover:text-primary transition-colors">
                Profile
              </a>
              <a href="#" class="block px-4 py-2 text-sm text-secondary hover:bg-hover hover:text-primary transition-colors">
                Preferences
              </a>
              <div class="border-t border-subtle my-2"></div>
              <a href="#" class="block px-4 py-2 text-sm text-secondary hover:bg-hover hover:text-primary transition-colors">
                Sign Out
              </a>
            </div>
          </Show>
        </div>
      </div>
    </header>
  )
}

export default HeaderBar