import { useStore } from '@nanostores/react'
import {
  $mainAgent,
  $subAgents,
  $mainAgentMetrics,
} from '@/stores/agents.store'
import { MainAgentCard } from '@/components/agents/main-agent-card'
import { MainAgentEmpty } from '@/components/agents/main-agent-empty'
import { SubAgentsList } from '@/components/agents/sub-agents-list'
import { SubAgentsEmpty } from '@/components/agents/sub-agents-empty'
import AgentSelectorDialog from '@/components/agents/agent-selector-dialog'

const AgentsView = () => {
  const mainAgent = useStore($mainAgent)
  const subAgents = useStore($subAgents)
  const mainAgentMetrics = useStore($mainAgentMetrics)
  
  const subAgentsList = Object.values(subAgents)

  return (
    <>
      <div className="view-container h-full">
        <div className="panel-container">
          {/* Main Agent Panel */}
          <div
            className="panel flex flex-col"
            style={{ width: '320px', borderRight: '1px solid var(--color-border)' }}
          >
            <div className="p-4 border-b border-border">
              <h2 className="text-sm font-semibold">Main Agent</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Primary assistant for general tasks
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {mainAgent ? (
                <MainAgentCard agent={mainAgent} metrics={mainAgentMetrics} />
              ) : (
                <MainAgentEmpty />
              )}
            </div>
          </div>

          {/* Sub-Agents Panel */}
          <div className="panel flex flex-1 flex-col">
            <div className="p-4 border-b border-border">
              <h2 className="text-sm font-semibold">Sub-Agents</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Specialized agents for specific tasks
              </p>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              {subAgentsList.length > 0 ? (
                <SubAgentsList agents={subAgentsList} />
              ) : (
                <SubAgentsEmpty />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Agent Selector Dialog */}
      <AgentSelectorDialog />
    </>
  )
}

export default AgentsView