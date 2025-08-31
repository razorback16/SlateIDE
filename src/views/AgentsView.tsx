import { useStore } from '@nanostores/react'
import {
  $mainAgent,
  $subAgents,
  $activeSubAgentIds,
} from '@/stores/agents.store'
import { MainAgentCard } from '@/components/agents/main-agent-card'
import { MainAgentEmpty } from '@/components/agents/main-agent-empty'
import { SubAgentsList } from '@/components/agents/sub-agents-list'
import { SubAgentsEmpty } from '@/components/agents/sub-agents-empty'
import { ScrollArea } from '@/components/ui/scroll-area'
import AgentSelectorDialog from '@/components/agents/agent-selector-dialog'

const AgentsView = () => {
  const mainAgent = useStore($mainAgent)
  const subAgents = useStore($subAgents)
  const activeSubAgentIds = useStore($activeSubAgentIds)
  
  const subAgentsList = Object.values(subAgents)
  const activeSubAgents = subAgentsList.filter(agent => activeSubAgentIds.has(agent.id))

  return (
    <>
      <div className="flex h-full">
        <div className="w-1/3 min-w-[300px] max-w-[400px]">
          {/* Main Agent Panel */}
          <div className="flex flex-col h-full border-r">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Main Agent</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                CLI tool for coding orchestration
              </p>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                {mainAgent ? (
                  <MainAgentCard agent={mainAgent} />
                ) : (
                  <MainAgentEmpty />
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex-1">
          {/* Sub-Agents Panel */}
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Sub-Agents</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Domain-specific experts ({activeSubAgents.length} active)
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="p-4 h-full">
                {subAgentsList.length > 0 ? (
                  <SubAgentsList agents={subAgentsList} />
                ) : (
                  <SubAgentsEmpty />
                )}
              </div>
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
