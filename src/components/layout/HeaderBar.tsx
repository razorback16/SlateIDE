import { useState } from 'react'
import { useStore } from '@nanostores/react'
import { Button } from '@/components/ui/button'
import {
  $sessionInfo,
  $mcpStatus,
  $subAgentsStatus,
  $theme,
  toggleCommandPalette,
  toggleTheme,
} from '#/stores/ide.store'

const HeaderBar = () => {
  const sessionInfo = useStore($sessionInfo)
  const mcpStatus = useStore($mcpStatus)
  const subAgentsStatus = useStore($subAgentsStatus)
  const theme = useStore($theme)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <header className="ide-header">
      {/* Left Section */}
      <div className="header-left">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-accent-primary">
            <span className="font-bold text-white text-xs">CC</span>
          </div>
          <span className="font-semibold text-primary text-sm">Claude Code</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="header-center">
        <div className="breadcrumb">
          <div className="breadcrumb-item">
            <span>{sessionInfo.projectName}</span>
          </div>
          <span className="breadcrumb-separator">›</span>
          <div className="breadcrumb-item">
            <span>Session #{sessionInfo.sessionNumber}</span>
          </div>
          <span className="breadcrumb-separator">›</span>
          <div className="breadcrumb-item active">
            <span>Branch: {sessionInfo.branch}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="ml-4 flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs">
            Resume
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            Branch
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            New Session
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {/* Command Palette Trigger */}
        <Button variant="outline" onClick={toggleCommandPalette} className="command-palette-trigger">
          <span>Search...</span>
          <kbd className="kbd">⌘K</kbd>
        </Button>

        {/* Status Indicators */}
        <div className="flex items-center gap-2">
          {/* MCP Status */}
          <div className="status-indicator">
            <div className={`status-dot ${mcpStatus.connected > 0 ? 'connected' : 'disconnected'}`} />
            <span className="text-xs">
              MCP {mcpStatus.connected}/{mcpStatus.total}
            </span>
          </div>

          {/* Sub-agents Status */}
          {subAgentsStatus.active > 0 && (
            <div className="status-indicator">
              <div className="status-dot connected" />
              <span className="text-xs">{subAgentsStatus.active} agents active</span>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </Button>

        {/* User Avatar/Menu */}
        <div className="relative">
          <Button
            variant="default"
            size="icon"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary font-medium text-sm text-white transition-opacity hover:opacity-90"
          >
            U
          </Button>

          {userMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 rounded-lg border border-subtle bg-elevated py-2 shadow-lg">
              <Button
                variant="ghost"
                className="w-full justify-start text-secondary text-sm transition-colors hover:bg-hover hover:text-primary"
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-secondary text-sm transition-colors hover:bg-hover hover:text-primary"
              >
                Preferences
              </Button>
              <div className="my-2 border-subtle border-t" />
              <Button
                variant="ghost"
                className="w-full justify-start text-secondary text-sm transition-colors hover:bg-hover hover:text-primary"
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default HeaderBar
