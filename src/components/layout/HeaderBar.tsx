import { Component, createSignal, Show } from 'solid-js'
import { useStore } from '@nanostores/solid'
import {
  $sessionInfo,
  $mcpStatus,
  $subAgentsStatus,
  $theme,
  toggleCommandPalette,
  toggleTheme,
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
          <div class="flex h-6 w-6 items-center justify-center rounded bg-accent-primary">
            <span class="font-bold text-white text-xs">CC</span>
          </div>
          <span class="font-semibold text-primary text-sm">Claude Code</span>
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
        <div class="ml-4 flex items-center gap-2">
          <button type="button" class="rounded px-2 py-1 text-secondary text-xs transition-colors hover:bg-hover hover:text-primary">
            Resume
          </button>
          <button type="button" class="rounded px-2 py-1 text-secondary text-xs transition-colors hover:bg-hover hover:text-primary">
            Branch
          </button>
          <button type="button" class="rounded px-2 py-1 text-secondary text-xs transition-colors hover:bg-hover hover:text-primary">
            New Session
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div class="header-right">
        {/* Command Palette Trigger */}
        <button type="button" onClick={toggleCommandPalette} class="command-palette-trigger">
          <span>Search...</span>
          <kbd class="kbd">⌘K</kbd>
        </button>

        {/* Status Indicators */}
        <div class="flex items-center gap-2">
          {/* MCP Status */}
          <div class="status-indicator">
            <div class={`status-dot ${mcpStatus().connected > 0 ? 'connected' : 'disconnected'}`} />
            <span class="text-xs">
              MCP {mcpStatus().connected}/{mcpStatus().total}
            </span>
          </div>

          {/* Sub-agents Status */}
          <Show when={subAgentsStatus().active > 0}>
            <div class="status-indicator">
              <div class="status-dot connected" />
              <span class="text-xs">{subAgentsStatus().active} agents active</span>
            </div>
          </Show>
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          class="rounded p-2 text-secondary transition-colors hover:bg-hover hover:text-primary"
          title={`Switch to ${theme() === 'dark' ? 'light' : 'dark'} theme`}
        >
          <Show
            when={theme() === 'dark'}
            fallback={
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            }
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </Show>
        </button>

        {/* User Avatar/Menu */}
        <div class="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen(!userMenuOpen())}
            class="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary font-medium text-sm text-white transition-opacity hover:opacity-90"
          >
            U
          </button>

          <Show when={userMenuOpen()}>
            <div class="absolute top-full right-0 mt-2 w-48 rounded-lg border border-subtle bg-elevated py-2 shadow-lg">
              <button
                type="button"
                class="block w-full px-4 py-2 text-left text-secondary text-sm transition-colors hover:bg-hover hover:text-primary"
              >
                Profile
              </button>
              <button
                type="button"
                class="block w-full px-4 py-2 text-left text-secondary text-sm transition-colors hover:bg-hover hover:text-primary"
              >
                Preferences
              </button>
              <div class="my-2 border-subtle border-t" />
              <button
                type="button"
                class="block w-full px-4 py-2 text-left text-secondary text-sm transition-colors hover:bg-hover hover:text-primary"
              >
                Sign Out
              </button>
            </div>
          </Show>
        </div>
      </div>
    </header>
  )
}

export default HeaderBar
