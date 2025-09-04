import { Card } from '@/components/ui/card'
import type { AgentMetrics } from '@/types/agents'
import { Activity, DollarSign, TrendingUp, Zap } from 'lucide-react'

interface AgentMetricsProps {
  metrics: AgentMetrics
}

export function AgentMetricsDisplay({ metrics }: AgentMetricsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num.toString()
  }

  const maxTrend = Math.max(...metrics.usageTrend)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-3.5 w-3.5 text-yellow-500" />
            <span className="text-xs text-muted-foreground">Tokens Today</span>
          </div>
          <p className="text-lg font-semibold">{formatNumber(metrics.tokensToday)}</p>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-xs text-muted-foreground">Session Tokens</span>
          </div>
          <p className="text-lg font-semibold">{formatNumber(metrics.tokensSession)}</p>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-3.5 w-3.5 text-green-500" />
            <span className="text-xs text-muted-foreground">Est. Cost</span>
          </div>
          <p className="text-lg font-semibold">${metrics.estimatedCost.toFixed(2)}</p>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-purple-500" />
            <span className="text-xs text-muted-foreground">Requests</span>
          </div>
          <p className="text-lg font-semibold">{metrics.requestCount}</p>
        </Card>
      </div>

      <Card className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Usage Trend (7 days)</span>
        </div>
        <div className="flex items-end gap-1 h-12">
          {metrics.usageTrend.map((value, index) => (
            <div
              key={`trend-${index}`}
              className="flex-1 bg-primary/20 rounded-t"
              style={{
                height: `${maxTrend > 0 ? (value / maxTrend) * 100 : 0}%`,
                minHeight: '2px',
              }}
            />
          ))}
        </div>
      </Card>

      {metrics.lastUsed && (
        <div className="text-xs text-muted-foreground text-center">
          Last used: {new Date(metrics.lastUsed).toLocaleString()}
        </div>
      )}
    </div>
  )
}
