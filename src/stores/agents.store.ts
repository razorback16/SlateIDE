import type {
  // Legacy types for backward compatibility
  Agent,
  AgentFilter,
  AgentMetrics,
  MainAgent,
  MainAgentFilter,
  MainAgentMetrics,
  SubAgent,
  SubAgentFilter,
} from '@/types/agents'
import { atom, map } from 'nanostores'

// Main agent management (single instance)
export const $mainAgent = atom<MainAgent | null>(null)
export const $availableMainAgents = atom<MainAgent[]>([])

// Sub-agents management (multiple instances)
export const $subAgents = map<Record<string, SubAgent>>({})
export const $activeSubAgentIds = atom<Set<string>>(new Set())

// UI state
export const $isMainAgentSelectorOpen = atom(false)
export const $isSubAgentSelectorOpen = atom(false)
export const $mainAgentFilter = atom<MainAgentFilter>({})
export const $subAgentFilter = atom<SubAgentFilter>({})

// Legacy stores for backward compatibility
export const $mainAgentMetrics = atom<AgentMetrics | null>(null)
export const $selectedSubAgentIds = atom<Set<string>>(new Set())
export const $isAgentSelectorOpen = atom(false)
export const $agentSelectorMode = atom<'main' | 'sub'>('main')
export const $agentFilter = atom<AgentFilter>({})

// Initialize mock data for available main agents
$availableMainAgents.set([
  {
    id: 'claude-code',
    name: 'Claude Code',
    version: '2.1.0',
    company: 'Anthropic',
    description: 'Advanced AI coding assistant with deep reasoning capabilities',
    status: 'installed',
    installPath: '/usr/local/bin/claude-code',
    executable: 'claude-code',
    lastUpdated: new Date('2024-08-15'),
    icon: '🤖',
    usageMetrics: {
      totalProjects: 47,
      successRate: 94.2,
      avgSessionTime: 45,
      tokensUsed: 2847392,
      lastUsed: new Date(),
      usageTrend: [120, 135, 98, 156, 142, 178, 165],
    },
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    version: '1.5.2',
    company: 'Google',
    description: "Google's multimodal AI development tool with ultra-long context",
    status: 'available',
    lastUpdated: new Date('2024-08-10'),
    icon: '💎',
  },
  {
    id: 'qwen-cli',
    name: 'Qwen CLI',
    version: '2.0.1',
    company: 'Alibaba',
    description: 'Multilingual coding assistant optimized for diverse programming languages',
    status: 'available',
    lastUpdated: new Date('2024-08-05'),
    icon: '🌟',
  },
  {
    id: 'codex-cli',
    name: 'Codex CLI',
    version: '1.8.3',
    company: 'OpenAI',
    description: 'Code-focused AI assistant built on GPT architecture',
    status: 'available',
    lastUpdated: new Date('2024-07-28'),
    icon: '🧠',
  },
  {
    id: 'open-code',
    name: 'Open Code',
    version: '3.1.0',
    company: 'Community',
    description: 'Open-source AI coding assistant with privacy-first approach',
    status: 'available',
    lastUpdated: new Date('2024-08-12'),
    icon: '🦙',
  },
])

// Initialize mock data for sub agents
$subAgents.set({
  'frontend-expert': {
    id: 'frontend-expert',
    name: 'Frontend Expert',
    model: 'claude-3-sonnet',
    systemPrompt:
      'You are a frontend development expert specializing in React, Vue, Angular, and modern web technologies. Focus on component architecture, state management, and user experience.',
    mcpTools: ['browser-automation', 'css-analyzer', 'component-generator'],
    color: 'blue',
    domain: 'frontend',
    capabilities: ['React', 'Vue', 'Angular', 'TypeScript', 'CSS', 'HTML', 'Responsive Design'],
    description: 'Specialized in modern frontend frameworks and user interface development',
    isActive: true,
  },
  'backend-expert': {
    id: 'backend-expert',
    name: 'Backend Expert',
    model: 'gpt-4',
    systemPrompt:
      'You are a backend development expert specializing in server-side technologies, APIs, databases, and system architecture. Focus on scalability, security, and performance.',
    mcpTools: ['database-tools', 'api-tester', 'performance-monitor'],
    color: 'green',
    domain: 'backend',
    capabilities: ['Node.js', 'Python', 'Go', 'Java', 'REST APIs', 'GraphQL', 'Databases'],
    description: 'Expert in server-side development and system architecture',
    isActive: true,
  },
  'tailwind-expert': {
    id: 'tailwind-expert',
    name: 'TailwindCSS Expert',
    model: 'claude-3-haiku',
    systemPrompt:
      'You are a TailwindCSS expert focused on utility-first CSS, responsive design, and modern styling patterns. Help create beautiful, maintainable user interfaces.',
    mcpTools: ['tailwind-analyzer', 'design-tokens'],
    color: 'cyan',
    domain: 'styling',
    capabilities: ['TailwindCSS', 'CSS', 'Responsive Design', 'Design Systems', 'UI Components'],
    description: 'Specialized in TailwindCSS and utility-first styling approaches',
  },
  'testing-expert': {
    id: 'testing-expert',
    name: 'Testing Expert',
    model: 'gpt-4-turbo',
    systemPrompt:
      'You are a testing expert specializing in unit tests, integration tests, e2e testing, and test automation. Focus on test quality, coverage, and maintainability.',
    mcpTools: ['test-runner', 'coverage-analyzer', 'mock-generator'],
    color: 'yellow',
    domain: 'testing',
    capabilities: [
      'Jest',
      'Cypress',
      'Playwright',
      'Unit Testing',
      'Integration Testing',
      'E2E Testing',
    ],
    description: 'Expert in comprehensive testing strategies and automation',
  },
  'devops-expert': {
    id: 'devops-expert',
    name: 'DevOps Expert',
    model: 'claude-3-sonnet',
    systemPrompt:
      'You are a DevOps expert specializing in CI/CD, containerization, cloud infrastructure, and deployment automation. Focus on reliability, scalability, and security.',
    mcpTools: ['docker-tools', 'k8s-manager', 'ci-cd-builder'],
    color: 'orange',
    domain: 'devops',
    capabilities: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Monitoring'],
    description: 'Specialized in deployment, infrastructure, and operational excellence',
  },
})

// Set initial active sub agents
$activeSubAgentIds.set(new Set(['frontend-expert', 'backend-expert']))

// Set initial main agent (Claude Code as it's installed)
$mainAgent.set($availableMainAgents.get().find((agent) => agent.id === 'claude-code') || null)

// New Actions for Main Agents
export function setMainAgent(agent: MainAgent | null) {
  $mainAgent.set(agent)
}

export function installMainAgent(agentId: string) {
  const agents = $availableMainAgents.get()
  const updatedAgents = agents.map((agent) =>
    agent.id === agentId
      ? {
          ...agent,
          status: 'installed' as const,
          installPath: `/usr/local/bin/${agent.id}`,
          executable: agent.id,
        }
      : agent
  )
  $availableMainAgents.set(updatedAgents)

  // Set as current main agent if installed
  const installedAgent = updatedAgents.find((agent) => agent.id === agentId)
  if (installedAgent) {
    setMainAgent(installedAgent)
  }
}

export function uninstallMainAgent(agentId: string) {
  const agents = $availableMainAgents.get()
  const updatedAgents = agents.map((agent) =>
    agent.id === agentId
      ? { ...agent, status: 'available' as const, installPath: undefined, executable: undefined }
      : agent
  )
  $availableMainAgents.set(updatedAgents)

  // Clear main agent if it was the uninstalled one
  const currentMainAgent = $mainAgent.get()
  if (currentMainAgent && currentMainAgent.id === agentId) {
    setMainAgent(null)
  }
}

// New Actions for Sub Agents
export function addSubAgent(agent: SubAgent) {
  $subAgents.setKey(agent.id, agent)
}

export function removeSubAgent(agentId: string) {
  const agents = { ...$subAgents.get() }
  delete agents[agentId]
  $subAgents.set(agents)

  const active = new Set($activeSubAgentIds.get())
  active.delete(agentId)
  $activeSubAgentIds.set(active)
}

export function toggleSubAgentActive(agentId: string) {
  const active = new Set($activeSubAgentIds.get())
  if (active.has(agentId)) {
    active.delete(agentId)
  } else {
    active.add(agentId)
  }
  $activeSubAgentIds.set(active)

  // Update the agent's isActive property
  const agent = $subAgents.get()[agentId]
  if (agent) {
    $subAgents.setKey(agentId, { ...agent, isActive: active.has(agentId) })
  }
}

export function updateSubAgentConfig(agentId: string, updates: Partial<SubAgent>) {
  const agent = $subAgents.get()[agentId]
  if (agent) {
    $subAgents.setKey(agentId, { ...agent, ...updates })
  }
}

// UI Actions
export function openMainAgentSelector() {
  $isMainAgentSelectorOpen.set(true)
}

export function closeMainAgentSelector() {
  $isMainAgentSelectorOpen.set(false)
  $mainAgentFilter.set({})
}

export function openSubAgentSelector() {
  $isSubAgentSelectorOpen.set(true)
}

export function closeSubAgentSelector() {
  $isSubAgentSelectorOpen.set(false)
  $subAgentFilter.set({})
}

// Legacy Actions (for backward compatibility)
export const $availableAgents = atom<Agent[]>([])

export function addSubAgentLegacy(agent: Agent) {
  // Convert legacy Agent to SubAgent format
  const subAgent: SubAgent = {
    id: agent.id,
    name: agent.name,
    model: agent.model,
    systemPrompt: `You are a ${agent.name} specialized in ${agent.capabilities.join(', ')}.`,
    mcpTools: [],
    color: 'blue',
    domain: 'frontend',
    capabilities: agent.capabilities,
    description: agent.description,
    isActive: false,
  }
  $subAgents.setKey(agent.id, subAgent)
}

export function toggleSubAgentSelection(agentId: string) {
  toggleSubAgentActive(agentId)

  // Also update legacy store
  const selected = new Set($selectedSubAgentIds.get())
  if (selected.has(agentId)) {
    selected.delete(agentId)
  } else {
    selected.add(agentId)
  }
  $selectedSubAgentIds.set(selected)
}

export function clearSubAgentSelection() {
  $selectedSubAgentIds.set(new Set())
  $activeSubAgentIds.set(new Set())
}

export function openAgentSelector(mode: 'main' | 'sub') {
  $agentSelectorMode.set(mode)
  $isAgentSelectorOpen.set(true)

  if (mode === 'main') {
    openMainAgentSelector()
  } else {
    openSubAgentSelector()
  }
}

export function closeAgentSelector() {
  $isAgentSelectorOpen.set(false)
  $agentFilter.set({})
  closeMainAgentSelector()
  closeSubAgentSelector()
}
