import { getCurrentWindow } from '@tauri-apps/api/window'
import { useEffect, useState } from 'react'
import { ThemeProvider } from '#/components/theme/provider'
import { useUpdateHandler } from '#/hooks/use-updater'
import { cn } from '#/lib/utils'

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    const checkMaximized = async () => {
      const appWindow = getCurrentWindow()
      const maximized = await appWindow.isMaximized()
      setIsMaximized(maximized)
    }

    checkMaximized()
  }, [])

  // Handler for update events
  useUpdateHandler()

  return (
    <ThemeProvider>
      <div
        className={cn(
          'disable-select relative flex size-full h-svh flex-col overflow-hidden',
          !isMaximized && 'rounded-[10px]'
        )}
      >
        {children}
      </div>
    </ThemeProvider>
  )
}

export default RootLayout
