import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { openMainAgentSelector, setMainAgent } from '@/stores/agents.store'
import type { MainAgent } from '@/types/agents'
import {
  Building,
  Calendar,
  Clock,
  Eye,
  FolderOpen,
  MoreVertical,
  RefreshCw,
  Target,
  Terminal,
  Trash2,
  TrendingUp,
  Zap,
} from 'lucide-react'

interface MainAgentCardProps {
  agent: MainAgent
}

const statusColors = {
  installed: 'bg-green-500',
  available: 'bg-gray-500',
  updating: 'bg-yellow-500',
  error: 'bg-red-500',
}

const statusLabels = {
  installed: 'Installed',
  available: 'Available',
  updating: 'Updating',
  error: 'Error',
}

export function MainAgentCard({ agent }: MainAgentCardProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{agent.icon || '🤖'}</div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  {agent.name}
                  <Badge variant="outline" className="text-xs">
                    v{agent.version}
                  </Badge>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <span>{agent.company}</span>
                  <span className="text-xs">•</span>
                  <div className="flex items-center gap-1">
                    <div className={`h-2 w-2 rounded-full ${statusColors[agent.status]}`} />
                    <span className="text-xs">{statusLabels[agent.status]}</span>
                  </div>
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="Switch Tool"
                onClick={() => {
                  console.log('Switch Tool clicked')
                  openMainAgentSelector()
                }}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                title="Uninstall Tool"
                onClick={() => {
                  if (confirm('Are you sure you want to uninstall this tool?')) {
                    setMainAgent(null)
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{agent.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Installation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid gap-2 text-sm">
            {agent.installPath && (
              <div className="flex items-center gap-2">
                <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Path:</span>
                <span
                  className="font-mono text-xs truncate max-w-[200px]"
                  title={agent.installPath}
                >
                  {agent.installPath}
                </span>
              </div>
            )}
            {agent.executable && (
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Command:</span>
                <span className="font-mono text-xs">{agent.executable}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Updated:</span>
              <span>{new Date(agent.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {agent.usageMetrics && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Target className="h-3.5 w-3.5 text-blue-500" />
                <div>
                  <div className="text-lg font-semibold">{agent.usageMetrics.totalProjects}</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                <div>
                  <div className="text-lg font-semibold">{agent.usageMetrics.successRate}%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-orange-500" />
                <div>
                  <div className="text-lg font-semibold">{agent.usageMetrics.avgSessionTime}m</div>
                  <div className="text-xs text-muted-foreground">Avg Session</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-purple-500" />
                <div>
                  <div className="text-lg font-semibold">
                    {(agent.usageMetrics.tokensUsed / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-muted-foreground">Tokens Used</div>
                </div>
              </div>
            </div>

            {agent.usageMetrics.lastUsed && (
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Last used:</span>
                  <span>{new Date(agent.usageMetrics.lastUsed).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Tool Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Building className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Developer:</span>
              <span>{agent.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Version:</span>
              <span>{agent.version}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
