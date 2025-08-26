import './styles/global.css'
import './styles/colors.css'
import './styles/scrollbar.css'

/* @refresh reload */
import { render } from 'solid-js/web'
import { onMount } from 'solid-js'
import IDELayout from '#/layouts/ide-layout'
import { $theme } from '#/stores/ide.store'
import { listen } from '@tauri-apps/api/event'

// This is the entry point of the application.
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found. Check if the id is correct.')
}

const MainApp = () => {
  onMount(async () => {
    if ('__TAURI__' in window) {
      // Listen for theme changes from settings window
      const unlistenTheme = await listen('theme-changed', (event) => {
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
      })

      // Cleanup on unmount (though this rarely happens for main app)
      return () => unlistenTheme()
    }
  })

  return !('__TAURI__' in window) ? (
    <div class="flex size-full min-h-screen items-center justify-center bg-background p-4">
      <p class="font-medium text-foreground tracking-wide">
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
render(() => <MainApp />, rootElement)
