import { useState, useMemo } from 'react'
import { useStore } from '@nanostores/react'
import { Search, Plus, Check } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  $availableAgents,
  $isAgentSelectorOpen,
  $agentSelectorMode,
  $mainAgent,
  $subAgents,
  setMainAgent,
  addSubAgent,
  closeAgentSelector,
} from '@/stores/agents.store'
import type { Agent } from '@/types/agents'

const AgentSelectorDialog = () => {
  const isOpen = useStore($isAgentSelectorOpen)
  const mode = useStore($agentSelectorMode)
  const availableAgents = useStore($availableAgents)
  const mainAgent = useStore($mainAgent)
  const subAgents = useStore($subAgents)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAgents = useMemo(() => {
    return availableAgents.filter((agent) => {
      const matchesSearch =
        searchQuery === '' ||
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.provider.toLowerCase().includes(searchQuery.toLowerCase())

      const isNotMainAgent = mainAgent?.id !== agent.id
      const isNotSubAgent = !Object.keys(subAgents).includes(agent.id)

      if (mode === 'main') {
        return matchesSearch && isNotSubAgent
      }
      return matchesSearch && isNotMainAgent && isNotSubAgent
    })
  }, [availableAgents, searchQuery, mainAgent, subAgents, mode])

  const handleSelectAgent = (agent: Agent) => {
    if (mode === 'main') {
      setMainAgent(agent)
    } else {
      addSubAgent(agent)
    }
    closeAgentSelector()
    setSearchQuery('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'idle':
        return 'bg-yellow-500'
      case 'unavailable':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeAgentSelector()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {mode === 'main' ? 'Select Main Agent' : 'Add Sub-Agent'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'main'
              ? 'Choose an agent to be your primary assistant'
              : 'Select additional agents to assist with specific tasks'}
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents by name, provider, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {filteredAgents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No agents found matching your search
            </div>
          ) : (
            filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleSelectAgent(agent)}
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {agent.avatar || agent.name[0]}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        {agent.name}
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(agent.status)}`} />
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {agent.provider} • v{agent.version}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant={mode === 'main' ? 'default' : 'secondary'}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectAgent(agent)
                      }}
                    >
                      {mode === 'main' ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Select
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {agent.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {agent.capabilities.slice(0, 4).map((capability) => (
                      <Badge key={capability} variant="secondary" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                    {agent.capabilities.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{agent.capabilities.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Context: {agent.contextWindow.toLocaleString()} tokens</span>
                    <span>Max output: {agent.maxTokens.toLocaleString()} tokens</span>
                    <span>Temp: {agent.temperature}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AgentSelectorDialog