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

interface AgentRowProps {
  agent: SubAgent;
}

const colorClasses = {
  red: 'border-l-red-500 bg-red-50/50 dark:bg-red-950/20',
  blue: 'border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20',
  green: 'border-l-green-500 bg-green-50/50 dark:bg-green-950/20',
  yellow: 'border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20',
  purple: 'border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/20',
  orange: 'border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20',
  pink: 'border-l-pink-500 bg-pink-50/50 dark:bg-pink-950/20',
  cyan: 'border-l-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20',
};

const colorBadgeClasses = {
  red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
};

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
    <div className={`flex items-center gap-3 p-3 rounded-lg border-l-4 border-r border-t border-b hover:bg-accent/50 transition-colors group ${colorClasses[agent.color]}`}>
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
          <Badge className={`text-xs ${colorBadgeClasses[agent.color]}`}>
            {agent.domain}
          </Badge>
          {isActive && (
            <div className="flex items-center gap-1">
              <Power className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-600 dark:text-green-400">Active</span>
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
