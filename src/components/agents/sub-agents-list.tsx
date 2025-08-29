import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgentRow } from './agent-row';
import { BulkActionsToolbar } from './bulk-actions-toolbar';
import type { SubAgent } from '@/types/agents';
import { openAgentSelector } from '@/stores/agents.store';
import { useStore } from '@nanostores/react';
import { $selectedSubAgentIds } from '@/stores/agents.store';

interface SubAgentsListProps {
  agents: SubAgent[];
}

export function SubAgentsList({ agents }: SubAgentsListProps) {
  const selectedIds = useStore($selectedSubAgentIds);
  const selectedCount = selectedIds.size;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium">
            Sub-agents ({agents.length})
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Specialized agents for specific tasks
          </p>
        </div>
        <Button 
          size="sm" 
          onClick={() => openAgentSelector('sub')}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Sub-agents
        </Button>
      </div>

      {selectedCount > 0 && (
        <BulkActionsToolbar selectedCount={selectedCount} />
      )}

      <div className="flex-1 space-y-2 overflow-y-auto">
        {agents.map((agent) => (
          <AgentRow key={agent.id} agent={agent} />
        ))}
      </div>

      <div className="pt-3 mt-3 border-t">
        <p className="text-xs text-muted-foreground text-center">
          {selectedCount > 0 
            ? `${selectedCount} agent${selectedCount > 1 ? 's' : ''} selected`
            : `${agents.length} sub-agent${agents.length !== 1 ? 's' : ''} available`
          }
        </p>
      </div>
    </div>
  );
}