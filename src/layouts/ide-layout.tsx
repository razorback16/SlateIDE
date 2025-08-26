import { Component, Show, lazy, Suspense } from 'solid-js'
import { useStore } from '@nanostores/solid'
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

const LoadingView: Component = () => (
  <div class="flex h-full items-center justify-center">
    <div class="text-center">
      <div class="mx-auto h-12 w-12 animate-spin rounded-full border-accent-primary border-b-2" />
      <p class="mt-4 text-secondary text-sm">Loading view...</p>
    </div>
  </div>
)

const IDELayout: Component = () => {
  const activeView = useStore($activeView)

  return (
    <div class="ide-container">
      <HeaderBar />
      <Sidebar />
      <main class="ide-content">
        <Suspense fallback={<LoadingView />}>
          <Show when={activeView() === 'codebase'}>
            <CodebaseView />
          </Show>
          <Show when={activeView() === 'chat'}>
            <ChatView />
          </Show>
          <Show when={activeView() === 'mcp'}>
            <MCPView />
          </Show>
          <Show when={activeView() === 'agents'}>
            <AgentsView />
          </Show>
          <Show when={activeView() === 'hooks'}>
            <HooksView />
          </Show>
          <Show when={activeView() === 'git'}>
            <GitView />
          </Show>
        </Suspense>
      </main>
      <CommandPalette />
    </div>
  )
}

export default IDELayout
