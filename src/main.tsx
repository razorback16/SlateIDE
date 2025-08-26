import './styles/global.css'
import './styles/colors.css'
import './styles/scrollbar.css'

import { createRoot } from 'react-dom/client'
import { useEffect } from 'react'
import IDELayout from '#/layouts/ide-layout'
import { $theme } from '#/stores/ide.store'
import { listen } from '@tauri-apps/api/event'

// This is the entry point of the application.
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found. Check if the id is correct.')
}

const MainApp = () => {
  useEffect(() => {
    let unlistenTheme: (() => void) | undefined

    if ('__TAURI__' in window) {
      // Listen for theme changes from settings window
      listen('theme-changed', (event) => {
        const newTheme = event.payload as string

        // Update the IDE store
        if (newTheme === 'light' || newTheme === 'dark') {
          $theme.set(newTheme)
        }

        // Apply theme to document
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute(
            'data-theme',
            newTheme === 'system' ? $theme.get() : newTheme
          )
        }
      }).then((unlisten) => {
        unlistenTheme = unlisten
      })
    }

    // Cleanup on unmount
    return () => {
      if (unlistenTheme) {
        unlistenTheme()
      }
    }
  }, [])

  return !('__TAURI__' in window) ? (
    <div className="flex size-full min-h-screen items-center justify-center bg-background p-4">
      <p className="font-medium text-foreground tracking-wide">
        This application will not work in Browser.
      </p>
    </div>
  ) : (
    <IDELayout />
  )
}

// Set `withGlobalTauri` to `true` in `tauri.conf.json`.
// If the frontend running in browser, throw an error because
// this application will not work in Browser.
const root = createRoot(rootElement)
root.render(<MainApp />)
