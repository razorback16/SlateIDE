import './styles/theme.css'
import './styles/global.css'
import './styles/scrollbar.css'

import { createRoot } from 'react-dom/client'
import IDELayout from '#/layouts/ide-layout'
import { ThemeProvider } from '#/components/theme/provider'

// This is the entry point of the application.
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found. Check if the id is correct.')
}

const MainApp = () => {
  return !('__TAURI__' in window) ? (
    <div className="flex size-full min-h-screen items-center justify-center bg-background p-4">
      <p className="font-medium text-foreground tracking-wide">
        This application will not work in Browser.
      </p>
    </div>
  ) : (
    <ThemeProvider>
      <IDELayout />
    </ThemeProvider>
  )
}

const root = createRoot(rootElement)
root.render(<MainApp />)
