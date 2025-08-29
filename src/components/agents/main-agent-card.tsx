import { MoreVertical, RefreshCw, Eye, Trash2, Calendar, User, Hash, StickyNote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import type { Agent, AgentMetrics } from '@/types/agents';
import { AgentMetricsDisplay } from './agent-metrics';
import { setMainAgent, openAgentSelector } from '@/stores/agents.store';

interface MainAgentCardProps {
  agent: Agent;
  metrics: AgentMetrics | null;
}

const statusColors = {
  idle: 'bg-gray-500',
  active: 'bg-green-500',
  unavailable: 'bg-red-500',
};

const capabilityIcons: Record<string, string> = {
  code: '💻',
  web: '🌐',
  tools: '🔧',
  files: '📁',
  vision: '👁️',
  voice: '🎤',
};

export function MainAgentCard({ agent, metrics }: MainAgentCardProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{agent.avatar || '🤖'}</div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  {agent.name}
                  <Badge variant="outline" className="text-xs">
                    v{agent.version}
                  </Badge>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <span className="capitalize">{agent.provider}</span>
                  <span className="text-xs">•</span>
                  <div className="flex items-center gap-1">
                    <div className={`h-2 w-2 rounded-full ${statusColors[agent.status]}`} />
                    <span className="text-xs capitalize">{agent.status}</span>
                  </div>
                </CardDescription>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openAgentSelector('main')}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Replace
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => setMainAgent(null)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{agent.description}</p>
          
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.map((capability) => (
              <Badge key={capability} variant="secondary" className="text-xs">
                <span className="mr-1">{capabilityIcons[capability]}</span>
                {capability}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Properties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model:</span>
              <span className="font-mono text-xs truncate max-w-[150px]" title={agent.model}>
                {agent.model}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Temperature:</span>
              <span>{agent.temperature}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Context:</span>
              <span>{(agent.contextWindow / 1000).toFixed(0)}k</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Max Tokens:</span>
              <span>{agent.maxTokens}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {metrics && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Usage Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <AgentMetricsDisplay metrics={metrics} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Owner:</span>
              <span>{agent.owner}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Created:</span>
              <span>{new Date(agent.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Updated:</span>
              <span>{new Date(agent.lastUpdated).toLocaleDateString()}</span>
            </div>
            {agent.tags.length > 0 && (
              <div className="flex items-start gap-2">
                <Hash className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                <div className="flex flex-wrap gap-1">
                  {agent.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {agent.notes && (
              <div className="flex items-start gap-2">
                <StickyNote className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">Notes:</span>
                <span className="text-xs">{agent.notes}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}