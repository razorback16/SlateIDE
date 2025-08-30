import { useState, useMemo } from 'react'
import { useStore } from '@nanostores/react'
import { Search, Plus, Check, Download, Terminal, Building, Trash2 } from 'lucide-react'
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
  $availableMainAgents,
  $isMainAgentSelectorOpen,
  $isSubAgentSelectorOpen,
  $mainAgent,
  $subAgents,
  setMainAgent,
  addSubAgent,
  installMainAgent,
  uninstallMainAgent,
  closeMainAgentSelector,
  closeSubAgentSelector,
} from '@/stores/agents.store'
import type { MainAgent, SubAgent } from '@/types/agents'

// Mock sub agents library for selection
const mockSubAgentLibrary: SubAgent[] = [
  {
    id: 'react-expert',
    name: 'React Expert',
    model: 'gpt-4',
    systemPrompt: 'You are a React expert specializing in modern React patterns, hooks, and component architecture.',
    mcpTools: ['react-devtools', 'component-analyzer'],
    color: 'blue',
    domain: 'frontend',
    capabilities: ['React', 'JSX', 'Hooks', 'State Management'],
    description: 'Expert in React development and modern patterns'
  },
  {
    id: 'python-expert',
    name: 'Python Expert',
    model: 'claude-3-sonnet',
    systemPrompt: 'You are a Python expert specializing in backend development, APIs, and data processing.',
    mcpTools: ['python-linter', 'pytest-runner'],
    color: 'green',
    domain: 'backend',
    capabilities: ['Python', 'FastAPI', 'Django', 'Data Processing'],
    description: 'Expert in Python backend development and data science'
  },
  {
    id: 'security-expert',
    name: 'Security Expert',
    model: 'gpt-4-turbo',
    systemPrompt: 'You are a cybersecurity expert specializing in secure coding practices and vulnerability assessment.',
    mcpTools: ['security-scanner', 'vulnerability-checker'],
    color: 'red',
    domain: 'security',
    capabilities: ['Security Auditing', 'Penetration Testing', 'Secure Coding'],
    description: 'Expert in application security and secure development practices'
  }
];

const AgentSelectorDialog = () => {
  const isMainAgentSelectorOpen = useStore($isMainAgentSelectorOpen)
  const isSubAgentSelectorOpen = useStore($isSubAgentSelectorOpen)
  const availableMainAgents = useStore($availableMainAgents)
  const mainAgent = useStore($mainAgent)
  const subAgents = useStore($subAgents)
  const [searchQuery, setSearchQuery] = useState('')

  const isOpen = isMainAgentSelectorOpen || isSubAgentSelectorOpen
  const mode = isMainAgentSelectorOpen ? 'main' : 'sub'

  const filteredMainAgents = useMemo(() => {
    return availableMainAgents.filter((agent) => {
      const matchesSearch =
        searchQuery === '' ||
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.company.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesSearch
    })
  }, [availableMainAgents, searchQuery])

  const filteredSubAgents = useMemo(() => {
    const existingSubAgentIds = Object.keys(subAgents)
    return mockSubAgentLibrary.filter((agent) => {
      const matchesSearch =
        searchQuery === '' ||
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.domain.toLowerCase().includes(searchQuery.toLowerCase())

      const isNotAlreadyAdded = !existingSubAgentIds.includes(agent.id)
      return matchesSearch && isNotAlreadyAdded
    })
  }, [subAgents, searchQuery])

  const handleSelectMainAgent = (agent: MainAgent) => {
    if (agent.status === 'available') {
      installMainAgent(agent.id)
    } else {
      // If clicking on the currently selected agent, deselect it
      if (mainAgent?.id === agent.id) {
        setMainAgent(null)
      } else {
        setMainAgent(agent)
      }
    }
    closeMainAgentSelector()
    setSearchQuery('')
  }

  const handleSelectSubAgent = (agent: SubAgent) => {
    addSubAgent(agent)
    closeSubAgentSelector()
    setSearchQuery('')
  }

  const handleClose = () => {
    if (mode === 'main') {
      closeMainAgentSelector()
    } else {
      closeSubAgentSelector()
    }
    setSearchQuery('')
  }

  const getMainAgentStatusColor = (status: string) => {
    switch (status) {
      case 'installed':
        return 'bg-green-500'
      case 'available':
        return 'bg-blue-500'
      case 'updating':
        return 'bg-yellow-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getMainAgentStatusLabel = (status: string) => {
    switch (status) {
      case 'installed':
        return 'Installed'
      case 'available':
        return 'Available'
      case 'updating':
        return 'Updating'
      case 'error':
        return 'Error'
      default:
        return 'Unknown'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {mode === 'main' ? 'Select Main Agent' : 'Add Domain Expert'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'main'
              ? 'Choose a CLI tool to orchestrate your coding workflow'
              : 'Add specialized experts to assist with specific domains'}
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={mode === 'main' ? "Search CLI tools..." : "Search domain experts..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {mode === 'main' ? (
            // Main Agent Selection
            filteredMainAgents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No CLI tools found matching your search
              </div>
            ) : (
              filteredMainAgents.map((agent) => (
                <div
                  key={agent.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-colors cursor-pointer ${
                    mainAgent?.id === agent.id 
                      ? 'bg-primary/10 border-primary/50 hover:bg-primary/15' 
                      : 'bg-card hover:bg-accent/50'
                  }`}
                  onClick={() => handleSelectMainAgent(agent)}
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                      {agent.icon || agent.name[0]}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                          {agent.name}
                          <div className={`h-2 w-2 rounded-full ${getMainAgentStatusColor(agent.status)}`} />
                          <span className="text-xs text-muted-foreground">
                            {getMainAgentStatusLabel(agent.status)}
                          </span>
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                          <Building className="h-3 w-3" />
                          {agent.company} • v{agent.version}
                        </p>
                      </div>
                      {agent.status === 'installed' ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation()
                            uninstallMainAgent(agent.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Uninstall
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectMainAgent(agent)
                          }}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Install
                        </Button>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {agent.description}
                    </p>

                    {agent.installPath && (
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Terminal className="h-3 w-3" />
                        <span className="font-mono">{agent.executable || agent.installPath}</span>
                      </div>
                    )}

                    {agent.usageMetrics && (
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{agent.usageMetrics.totalProjects} projects</span>
                        <span>{agent.usageMetrics.successRate}% success rate</span>
                        <span>{agent.usageMetrics.avgSessionTime}m avg session</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )
          ) : (
            // Sub Agent Selection
            filteredSubAgents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No domain experts found matching your search
              </div>
            ) : (
              filteredSubAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => handleSelectSubAgent(agent)}
                >
                  <div className="flex-shrink-0">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-2xl border-2 border-${agent.color}-500`}>
                      {agent.domain === 'frontend' ? '🎨' : 
                       agent.domain === 'backend' ? '⚙️' : 
                       agent.domain === 'security' ? '🔒' : '🔧'}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                          {agent.name}
                          <Badge className={`text-xs bg-${agent.color}-100 text-${agent.color}-800`}>
                            {agent.domain}
                          </Badge>
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {agent.model}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectSubAgent(agent)
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Expert
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

                    {agent.mcpTools.length > 0 && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <span>Tools:</span>
                        {agent.mcpTools.slice(0, 2).map((tool) => (
                          <Badge key={tool} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                        {agent.mcpTools.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{agent.mcpTools.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AgentSelectorDialog
