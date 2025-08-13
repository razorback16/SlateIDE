import { useState } from 'react'
import { IDELayout } from '@/components/layout/IDELayout'
import { CodebaseView } from '@/components/views/CodebaseView'
import { ChatView } from '@/components/views/ChatView'
import { MCPView } from '@/components/views/MCPView'
import { SubAgentsView } from '@/components/views/SubAgentsView'
import { HooksView } from '@/components/views/HooksView'
import { GitView } from '@/components/views/GitView'
import { SettingsView } from '@/components/views/SettingsView'

type ViewType = 'codebase' | 'chat' | 'mcp' | 'sub-agents' | 'hooks' | 'git' | 'settings'

function App() {
  const [activeView, setActiveView] = useState<ViewType>('codebase')

  const renderView = () => {
    switch (activeView) {
      case 'codebase':
        return <CodebaseView />
      case 'chat':
        return <ChatView />
      case 'mcp':
        return <MCPView />
      case 'sub-agents':
        return <SubAgentsView />
      case 'hooks':
        return <HooksView />
      case 'git':
        return <GitView />
      case 'settings':
        return <SettingsView />
      default:
        return <CodebaseView />
    }
  }

  return (
    <IDELayout activeView={activeView} onViewChange={setActiveView}>
      {renderView()}
    </IDELayout>
  )
}

export default App