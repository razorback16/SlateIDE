import { type Theme, commands } from '@/lib/bindings'
import { listen } from '@tauri-apps/api/event'
import { createConsola } from 'consola/basic'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const log = createConsola({ defaults: { tag: 'theme-provider' } })
  const [resolvedTheme, setResolvedTheme] = useState<Theme>('system')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await commands.getTheme()
        log.debug('Theme loaded:', savedTheme)
        if (savedTheme.status === 'ok') {
          setResolvedTheme(savedTheme.data)
        }
      } catch (error) {
        log.error('Failed to get theme:', error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadTheme()

    // Listen for theme changes from other windows
    const setupThemeListener = async () => {
      try {
        const unlisten = await listen('theme-changed', (event) => {
          const newTheme = event.payload as Theme
          log.debug('Theme changed event received:', newTheme)
          setResolvedTheme(newTheme)
        })

        return unlisten
      } catch (error) {
        log.error('Failed to setup theme listener:', error)
      }
    }

    const unlistenPromise = setupThemeListener()

    return () => {
      unlistenPromise.then((unlisten) => unlisten?.())
    }
  }, [log])

  useEffect(() => {
    const root = document.documentElement

    function applyTheme(selectedTheme: Theme) {
      if (selectedTheme !== 'system') {
        root.dataset.theme = selectedTheme
        return
      }

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      root.dataset.theme = mediaQuery.matches ? 'dark' : 'light'

      function handleChange(event: MediaQueryListEvent) {
        root.dataset.theme = event.matches ? 'dark' : 'light'
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    const cleanup = applyTheme(resolvedTheme)
    return cleanup
  }, [resolvedTheme])

  const value = {
    theme: resolvedTheme,
    setTheme: (newTheme: Theme) => {
      commands
        .setThemeAndNotify(newTheme)
        .then(() => {
          // The theme will be updated via the event listener
          log.debug('Theme set successfully:', newTheme)
        })
        .catch((error) => log.error('Failed to set theme:', error))
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {isLoaded && children}
    </ThemeProviderContext.Provider>
  )
}
