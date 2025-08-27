import { useState } from 'react'
import { useStore } from '@nanostores/react'
import { Button } from '@/components/ui/button'
import { useTheme } from '#/components/theme/provider'
import {
  $sessionInfo,
  $mcpStatus,
  $subAgentsStatus,
  toggleCommandPalette,
} from '#/context/ide.store'

const HeaderBar = () => {
  const sessionInfo = useStore($sessionInfo)
  const mcpStatus = useStore($mcpStatus)
  const subAgentsStatus = useStore($subAgentsStatus)
  const { theme, setTheme } = useTheme()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className='z-50 flex h-12 items-center justify-between border-border border-b bg-background px-4'>
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
            <span className="font-bold text-primary-foreground text-xs">CC</span>
          </div>
          <span className="font-semibold text-foreground text-sm">Slate IDE</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-4">
        <div className='flex items-center gap-2 text-muted-foreground text-sm'>
          <span>{sessionInfo.projectName}</span>
          <span className="text-muted-foreground/60">›</span>
          <span>Session #{sessionInfo.sessionNumber}</span>
          <span className="text-muted-foreground/60">›</span>
          <span className="text-foreground">Branch: {sessionInfo.branch}</span>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            Resume
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            Branch
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            New Session
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Command Palette Trigger */}
        <Button 
          variant="outline" 
          onClick={toggleCommandPalette} 
          className='flex h-8 items-center gap-2 border-border bg-muted/50 px-3 text-muted-foreground hover:bg-muted hover:text-foreground'
        >
          <span className="text-sm">Search...</span>
          <kbd className='rounded border border-border bg-background px-2 py-0.5 font-mono text-xs'>⌘K</kbd>
        </Button>

        {/* Status Indicators */}
        <div className="flex items-center gap-2">
          {/* MCP Status */}
          <div className='flex items-center gap-2 rounded-md border border-border bg-muted/50 px-2 py-1'>
            <div className={`h-2 w-2 rounded-full ${
              mcpStatus.connected > 0 ? 'animate-pulse bg-green-500' : 'bg-red-500'
            }`} />
            <span className='text-muted-foreground text-xs'>
              MCP {mcpStatus.connected}/{mcpStatus.total}
            </span>
          </div>

          {/* Sub-agents Status */}
          {subAgentsStatus.active > 0 && (
            <div className='flex items-center gap-2 rounded-md border border-border bg-muted/50 px-2 py-1'>
              <div className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
              <span className='text-muted-foreground text-xs'>{subAgentsStatus.active} agents active</span>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleTheme}
          className="h-8 w-8 focus:ring-macos"
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
            className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            U
          </Button>

          {userMenuOpen && (
            <div className='absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border border-border bg-popover py-2 shadow-lg'>
              <Button
                variant="ghost"
                className='h-8 w-full justify-start text-sm hover:bg-accent hover:text-accent-foreground'
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                className='h-8 w-full justify-start text-sm hover:bg-accent hover:text-accent-foreground'
              >
                Preferences
              </Button>
              <div className='my-1 border-border border-t' />
              <Button
                variant="ghost"
                className='h-8 w-full justify-start text-sm hover:bg-accent hover:text-accent-foreground'
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
