import { Suspense, lazy } from 'react'
import { useStore } from '@nanostores/react'
import { $activeView } from '#/stores/ide.store'
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
  <div className="flex h-full items-center justify-center">
    <div className="text-center">
      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-accent-primary border-b-2" />
      <p className="mt-4 text-secondary text-sm">Loading view...</p>
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
    <div className="ide-container">
      <HeaderBar />
      <Sidebar />
      <main className="ide-content">
        <Suspense fallback={<LoadingView />}>
          {renderActiveView()}
        </Suspense>
      </main>
      <CommandPalette />
    </div>
  )
}

export default IDELayout
