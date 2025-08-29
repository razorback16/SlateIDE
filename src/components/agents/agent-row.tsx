import { GripVertical, ChevronUp, Trash2, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { SubAgent } from '@/types/agents';
import { removeSubAgent, promoteSubAgentToMain, toggleSubAgentSelection } from '@/stores/agents.store';
import { useStore } from '@nanostores/react';
import { $selectedSubAgentIds } from '@/stores/agents.store';

interface AgentRowProps {
  agent: SubAgent;
}

const capabilityIcons: Record<string, string> = {
  code: '💻',
  web: '🌐',
  tools: '🔧',
  files: '📁',
  vision: '👁️',
  voice: '🎤',
};

const statusColors = {
  idle: 'bg-gray-500',
  active: 'bg-green-500',
  unavailable: 'bg-red-500',
};

export function AgentRow({ agent }: AgentRowProps) {
  const selectedIds = useStore($selectedSubAgentIds);
  const isSelected = selectedIds.has(agent.id);

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => toggleSubAgentSelection(agent.id)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-xl">{agent.avatar || '🤖'}</div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-sm truncate">{agent.name}</h4>
          <Badge variant="outline" className="text-xs">
            {agent.provider}
          </Badge>
          <div className={`h-1.5 w-1.5 rounded-full ${statusColors[agent.status]}`} />
        </div>
        <p className="text-xs text-muted-foreground truncate">{agent.description}</p>
        <div className="flex gap-1 mt-1.5">
          {agent.capabilities.slice(0, 3).map((capability) => (
            <Badge key={capability} variant="secondary" className="text-xs h-5">
              <span className="mr-0.5">{capabilityIcons[capability]}</span>
              {capability}
            </Badge>
          ))}
          {agent.capabilities.length > 3 && (
            <Badge variant="secondary" className="text-xs h-5">
              +{agent.capabilities.length - 3}
            </Badge>
          )}
        </div>
        {agent.role && (
          <Badge variant="outline" className="text-xs mt-1 capitalize">
            {agent.role}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => promoteSubAgentToMain(agent.id)}
          title="Promote to main agent"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => removeSubAgent(agent.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => promoteSubAgentToMain(agent.id)}>
              <ChevronUp className="mr-2 h-4 w-4" />
              Promote to Main
            </DropdownMenuItem>
            <DropdownMenuItem>
              Assign Role
            </DropdownMenuItem>
            <DropdownMenuItem>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => removeSubAgent(agent.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}