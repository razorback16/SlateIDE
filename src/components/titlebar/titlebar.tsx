import { getCurrentWindow } from '@tauri-apps/api/window'
import { platform } from '@tauri-apps/plugin-os'
import * as Lucide from 'lucide-react'
import { ComponentProps } from 'react'
import { cn } from '#/libs/utils'

interface TitlebarProps extends ComponentProps<'div'> {}

const Titlebar = (props: TitlebarProps) => {
  const appPlatform = platform()
  const appWindow = getCurrentWindow()
  const isMaximized = appWindow.isMaximized()
  const isMacOS = appPlatform === 'macos'

  return (
    <div
      data-tauri-drag-region
      className={cn(
        'relative flex h-7 w-full items-center justify-between',
        'border-border/40 border-b bg-transparent backdrop-blur-sm',
        !isMaximized ? 'rounded-t-[10px]' : 'rounded-none',
        isMacOS ? 'pl-14' : 'p-0',
        props.className
      )}
    >
      <div
        data-tauri-drag-region
        className={cn(
          !isMacOS ? 'mr-2 rounded-tl-[10px]' : 'rounded-tr-[10px]',
          'flex size-full items-center gap-2'
        )}
      >
        {/* App title or logo */}
      </div>

      {!isMacOS && (
        <div className="flex size-full max-w-max items-center justify-end gap-0">
          <button
            type="button"
            id="minimize-button"
            className="inline-flex h-full w-9 items-center justify-center text-muted-foreground hover:bg-gray-200 hover:text-primary dark:hover:bg-gray-600"
            onClick={() => appWindow.minimize()}
          >
            <Lucide.Minus className="size-4" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            id="maximize-button"
            onClick={() => appWindow.toggleMaximize()}
            className="inline-flex h-full w-9 items-center justify-center text-muted-foreground hover:bg-gray-200 hover:text-primary dark:hover:bg-gray-600"
          >
            <Lucide.Square className="size-3" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            id="close-button"
            onClick={() => appWindow.close()}
            className="grup inline-flex h-full w-9 items-center justify-center rounded-tr-[10px] text-muted-foreground hover:bg-red-500 hover:text-white"
          >
            <Lucide.X className="size-4" strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Titlebar
