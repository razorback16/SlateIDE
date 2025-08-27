import { Suspense, lazy } from 'react'
import { useStore } from '@nanostores/react'
import { $activeView } from '#/context/ide.store'
import Titlebar from '#/components/titlebar/titlebar'
import HeaderBar from '#/components/layout/HeaderBar'
import Sidebar from '#/components/layout/Sidebar'
import CommandPalette from '#/components/common/CommandPalette'

// Lazy load views for better performance
const CodebaseView = lazy(() => import('#/views/CodebaseView'))
const ChatView = lazy(() => import('#/views/ChatView'))
const MCPView = lazy(() => import('#/views/MCPView'))
const AgentsView = lazy(() => import('#/views/AgentsView'))
const HooksView = lazy(() => import('#/views/HooksView'))
const GitView = lazy(() => import('#/views/GitView'))

const LoadingView = () => (
  <div className="flex h-full items-center justify-center bg-background">
    <div className="text-center">
      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-primary border-b-2" />
      <p className="mt-4 text-muted-foreground text-sm">Loading view...</p>
    </div>
  </div>
)

const IDELayout = () => {
  const activeView = useStore($activeView)

  const renderActiveView = () => {
    switch (activeView) {
      case 'codebase':
        return <CodebaseView />
      case 'chat':
        return <ChatView />
      case 'mcp':
        return <MCPView />
      case 'agents':
        return <AgentsView />
      case 'hooks':
        return <HooksView />
      case 'git':
        return <GitView />
      default:
        return <CodebaseView />
    }
  }

  return (
    <div className="settings-window flex h-screen flex-col bg-background font-sans text-foreground">
      <Titlebar />
      <HeaderBar />
      <div className="flex h-full min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-hidden bg-background">
          <Suspense fallback={<LoadingView />}>{renderActiveView()}</Suspense>
        </main>
      </div>
      <CommandPalette />
    </div>
  )
}

export default IDELayout
