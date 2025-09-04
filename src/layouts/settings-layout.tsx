import { cn } from '@/lib/utils'
import { Suspense } from 'react'
import AppLoader from '#/components/loaders/app-loader'
import Titlebar from '#/components/titlebar/titlebar'

interface SettingsLayoutProps {
  children: React.ReactNode
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  return (
    <>
      <Titlebar className="debug border-0 shadow-none" />
      <main className={cn('custom-scrollbar relative flex-1 overflow-auto')}>
        <div className={cn('mx-auto size-full')}>
          <Suspense fallback={<AppLoader />}>{children}</Suspense>
        </div>
      </main>
    </>
  )
}

export default SettingsLayout
