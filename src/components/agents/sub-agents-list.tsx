import { Button } from '@/components/ui/button'
import { openSubAgentSelector } from '@/stores/agents.store'
import { $activeSubAgentIds } from '@/stores/agents.store'
import type { SubAgent } from '@/types/agents'
import { useStore } from '@nanostores/react'
import { Plus, Settings } from 'lucide-react'
import { AgentRow } from './agent-row'
import { BulkActionsToolbar } from './bulk-actions-toolbar'

interface SubAgentsListProps {
  agents: SubAgent[]
}

export function SubAgentsList({ agents }: SubAgentsListProps) {
  const activeIds = useStore($activeSubAgentIds)
  const activeCount = activeIds.size
  const activeAgents = agents.filter((agent) => activeIds.has(agent.id))
  const inactiveAgents = agents.filter((agent) => !activeIds.has(agent.id))

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium">Domain Experts ({agents.length})</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {activeCount} active • {agents.length - activeCount} available
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => openSubAgentSelector()}>
            <Settings className="h-4 w-4 mr-1" />
            Configure
          </Button>
          <Button size="sm" onClick={() => openSubAgentSelector()}>
            <Plus className="h-4 w-4 mr-1" />
            Add Expert
          </Button>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto min-h-0">
        {/* Active Agents */}
        {activeAgents.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              Active ({activeAgents.length})
            </h4>
            <div className="space-y-2">
              {activeAgents.map((agent) => (
                <AgentRow key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        )}

        {/* Inactive Agents */}
        {inactiveAgents.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              Available ({inactiveAgents.length})
            </h4>
            <div className="space-y-2">
              {inactiveAgents.map((agent) => (
                <AgentRow key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 mt-3 border-t">
        <p className="text-xs text-muted-foreground text-center">
          {activeCount > 0
            ? `${activeCount} expert${activeCount > 1 ? 's' : ''} actively helping`
            : 'No experts currently active'}
        </p>
      </div>
    </div>
  )
}
