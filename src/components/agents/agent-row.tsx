import { Settings, Trash2, MoreVertical, Power, PowerOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { SubAgent } from '@/types/agents';
import { removeSubAgent, toggleSubAgentActive, updateSubAgentConfig } from '@/stores/agents.store';
import { useStore } from '@nanostores/react';
import { $activeSubAgentIds } from '@/stores/agents.store';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface AgentRowProps {
  agent: SubAgent;
}

const agentRowVariants = cva(
  'flex items-center gap-3 p-3 rounded-lg border-l-4 border-r border-t border-b hover:bg-accent/50 transition-colors group',
  {
    variants: {
      color: {
        red: 'border-l-red-500 bg-[var(--agent-red-bg)]',
        blue: 'border-l-blue-500 bg-[var(--agent-blue-bg)]',
        green: 'border-l-green-500 bg-[var(--agent-green-bg)]',
        yellow: 'border-l-yellow-500 bg-[var(--agent-yellow-bg)]',
        purple: 'border-l-purple-500 bg-[var(--agent-purple-bg)]',
        orange: 'border-l-orange-500 bg-[var(--agent-orange-bg)]',
        pink: 'border-l-pink-500 bg-[var(--agent-pink-bg)]',
        cyan: 'border-l-cyan-500 bg-[var(--agent-cyan-bg)]',
      }
    }
  }
);

const badgeColorVariants = cva(
  'text-xs',
  {
    variants: {
      color: {
        red: 'bg-[var(--agent-red-badge-bg)] text-[var(--agent-red-badge-text)]',
        blue: 'bg-[var(--agent-blue-badge-bg)] text-[var(--agent-blue-badge-text)]',
        green: 'bg-[var(--agent-green-badge-bg)] text-[var(--agent-green-badge-text)]',
        yellow: 'bg-[var(--agent-yellow-badge-bg)] text-[var(--agent-yellow-badge-text)]',
        purple: 'bg-[var(--agent-purple-badge-bg)] text-[var(--agent-purple-badge-text)]',
        orange: 'bg-[var(--agent-orange-badge-bg)] text-[var(--agent-orange-badge-text)]',
        pink: 'bg-[var(--agent-pink-badge-bg)] text-[var(--agent-pink-badge-text)]',
        cyan: 'bg-[var(--agent-cyan-badge-bg)] text-[var(--agent-cyan-badge-text)]',
      }
    }
  }
);

const domainIcons = {
  frontend: '🎨',
  backend: '⚙️',
  styling: '💅',
  testing: '🧪',
  devops: '🚀',
  database: '🗄️',
  mobile: '📱',
  ai: '🤖',
  security: '🔒',
};

export function AgentRow({ agent }: AgentRowProps) {
  const activeIds = useStore($activeSubAgentIds);
  const isActive = activeIds.has(agent.id);

  return (
    <div className={cn(agentRowVariants({ color: agent.color as any }))}>
      {/* Color indicator and domain icon */}
      <div className="flex items-center gap-2">
        <div className="text-lg">{domainIcons[agent.domain] || '🔧'}</div>
        <Switch
          checked={isActive}
          onCheckedChange={() => toggleSubAgentActive(agent.id)}
        />
      </div>

      {/* Agent info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-sm truncate">{agent.name}</h4>
          <Badge className={cn(badgeColorVariants({ color: agent.color as any }))}>
            {agent.domain}
          </Badge>
          {isActive && (
            <div className="flex items-center gap-1">
              <Power className="h-3 w-3 text-green-500" />
              <span className="text-xs text-[var(--status-active-text)]">Active</span>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">{agent.description}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <Badge variant="outline" className="text-xs">
            {agent.model}
          </Badge>
          <div className="flex gap-1">
            {agent.capabilities.slice(0, 2).map((capability) => (
              <Badge key={capability} variant="secondary" className="text-xs h-5">
                {capability}
              </Badge>
            ))}
            {agent.capabilities.length > 2 && (
              <Badge variant="secondary" className="text-xs h-5">
                +{agent.capabilities.length - 2}
              </Badge>
            )}
          </div>
        </div>
        {agent.mcpTools.length > 0 && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-muted-foreground">Tools:</span>
            <div className="flex gap-1">
              {agent.mcpTools.slice(0, 2).map((tool) => (
                <Badge key={tool} variant="outline" className="text-xs h-4">
                  {tool}
                </Badge>
              ))}
              {agent.mcpTools.length > 2 && (
                <Badge variant="outline" className="text-xs h-4">
                  +{agent.mcpTools.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions - Temporary simple buttons for testing */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          title="Configure agent"
          onClick={() => {
            alert(`Configure ${agent.name}\n\nModel: ${agent.model}\nDomain: ${agent.domain}\nSystem Prompt: ${agent.systemPrompt.substring(0, 100)}...`);
          }}
        >
          <Settings className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          title="Remove agent"
          onClick={() => {
            if (confirm(`Are you sure you want to remove ${agent.name}?`)) {
              console.log('Removing agent:', agent.id);
              removeSubAgent(agent.id);
            }
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
