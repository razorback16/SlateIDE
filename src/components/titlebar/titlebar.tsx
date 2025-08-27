import { getCurrentWindow } from '@tauri-apps/api/window'
import { platform } from '@tauri-apps/plugin-os'
import * as Lucide from 'lucide-react'
import { ComponentProps, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TitlebarProps extends ComponentProps<'div'> {
  title?: string
}

const Titlebar = ({ title = 'Slate IDE', ...props }: TitlebarProps) => {
  const [appPlatform, setAppPlatform] = useState<string>('')
  const [isMaximized, setIsMaximized] = useState(false)
  const appWindow = getCurrentWindow()

  useEffect(() => {
    const initPlatform = async () => {
      const platformName = await platform()
      setAppPlatform(platformName)
    }
    
    const checkMaximized = async () => {
      const maximized = await appWindow.isMaximized()
      setIsMaximized(maximized)
    }

    initPlatform()
    checkMaximized()

    // Listen for window resize events to update maximized state
    const unlisten = appWindow.listen('tauri://resize', checkMaximized)
    
    return () => {
      unlisten.then((fn: () => void) => fn())
    }
  }, [appWindow])

  const isMacOS = appPlatform === 'macos'

  const handleMinimize = () => {
    appWindow.minimize()
  }

  const handleMaximize = () => {
    appWindow.toggleMaximize()
  }

  const handleClose = () => {
    appWindow.close()
  }

  return (
    <div
      data-tauri-drag-region
      className={cn(
        'relative flex h-8 w-full select-none items-center justify-center',
        'border-border/50 border-b bg-background/95 backdrop-blur-sm',
        !isMaximized ? 'rounded-t-[10px]' : 'rounded-none',
        props.className
      )}
    >
      {/* Center Title - draggable area */}
      <div
        data-tauri-drag-region
        className={cn(
          'flex flex-1 items-center justify-center',
          isMacOS ? 'pr-4 pl-20' : 'px-4'
        )}
      >
        <span className='truncate font-medium text-foreground/80 text-sm'>
          {title}
        </span>
      </div>

      {/* Windows Controls - only show on non-macOS */}
      {!isMacOS && (
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleMinimize}
            className='inline-flex h-8 w-12 items-center justify-center text-foreground/60 transition-colors hover:bg-accent hover:text-foreground'
            title="Minimize"
          >
            <Lucide.Minus className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={handleMaximize}
            className='inline-flex h-8 w-12 items-center justify-center text-foreground/60 transition-colors hover:bg-accent hover:text-foreground'
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? (
              <Lucide.Copy className="h-3.5 w-3.5" strokeWidth={2} />
            ) : (
              <Lucide.Square className="h-3.5 w-3.5" strokeWidth={2} />
            )}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className='inline-flex h-8 w-12 items-center justify-center rounded-tr-[10px] text-foreground/60 transition-colors hover:bg-red-500 hover:text-white'
            title="Close"
          >
            <Lucide.X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Titlebar
