import { getCurrentWindow } from '@tauri-apps/api/window'
import { ReactNode, Suspense } from 'react'
import AppLoader from '#/components/loaders/app-loader'
import Titlebar from '#/components/titlebar/titlebar'
import { cn } from '#/libs/utils'

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout = (props: AppLayoutProps) => {
  const appWindow = getCurrentWindow()
  const isMaximized = appWindow.isMaximized()

  return (
    <>
      <Titlebar />
      <main
        className={cn(
          'custom-scrollbar relative flex-1 overflow-auto',
          !isMaximized && 'rounded-b-[10px]'
        )}
      >
        <div className={cn('mx-auto size-full', !isMaximized && 'rounded-bl-[10px]')}>
          <Suspense fallback={<AppLoader />}>{props.children}</Suspense>
        </div>
      </main>
    </>
  )
}

export default AppLayout
