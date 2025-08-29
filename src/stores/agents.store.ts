import { atom, map } from 'nanostores';
import type { Agent, SubAgent, AgentMetrics, AgentFilter } from '@/types/agents';

// Main agent selection
export const $mainAgent = atom<Agent | null>(null);
export const $mainAgentMetrics = atom<AgentMetrics | null>(null);

// Sub-agents management
export const $subAgents = map<Record<string, SubAgent>>({});
export const $selectedSubAgentIds = atom<Set<string>>(new Set());

// UI state
export const $isAgentSelectorOpen = atom(false);
export const $agentSelectorMode = atom<'main' | 'sub'>('main');
export const $agentFilter = atom<AgentFilter>({});

// Mock data for available agents
export const $availableAgents = atom<Agent[]>([
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    version: '3.0',
    avatar: '🤖',
    description: 'Most capable model for complex reasoning and analysis',
    status: 'idle',
    capabilities: ['code', 'web', 'tools', 'files', 'vision'],
    model: 'claude-3-opus-20240229',
    temperature: 0.7,
    contextWindow: 200000,
    maxTokens: 4096,
    lastUpdated: new Date('2024-02-29'),
    owner: 'Anthropic',
    createdAt: new Date('2024-02-29'),
    tags: ['advanced', 'multimodal', 'long-context'],
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    version: '1.0',
    avatar: '🧠',
    description: 'Latest GPT-4 with vision capabilities and improved performance',
    status: 'active',
    capabilities: ['code', 'web', 'tools', 'vision'],
    model: 'gpt-4-turbo-preview',
    temperature: 0.8,
    contextWindow: 128000,
    maxTokens: 4096,
    lastUpdated: new Date('2024-01-25'),
    owner: 'OpenAI',
    createdAt: new Date('2024-01-25'),
    tags: ['multimodal', 'fast'],
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'google',
    version: '1.5',
    avatar: '💎',
    description: 'Google\'s most capable multimodal AI model',
    status: 'idle',
    capabilities: ['code', 'web', 'vision'],
    model: 'gemini-1.5-pro',
    temperature: 0.9,
    contextWindow: 1000000,
    maxTokens: 8192,
    lastUpdated: new Date('2024-02-15'),
    owner: 'Google',
    createdAt: new Date('2024-02-15'),
    tags: ['multimodal', 'ultra-long-context'],
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'mistral',
    version: '2.0',
    avatar: '🌊',
    description: 'Flagship model with strong multilingual capabilities',
    status: 'idle',
    capabilities: ['code', 'tools'],
    model: 'mistral-large-latest',
    temperature: 0.7,
    contextWindow: 32000,
    maxTokens: 2048,
    lastUpdated: new Date('2024-02-26'),
    owner: 'Mistral AI',
    createdAt: new Date('2024-02-26'),
    tags: ['multilingual', 'efficient'],
  },
  {
    id: 'command-r-plus',
    name: 'Command R+',
    provider: 'cohere',
    version: '1.0',
    avatar: '🔮',
    description: 'Optimized for RAG and tool use with long context',
    status: 'unavailable',
    capabilities: ['code', 'web', 'tools'],
    model: 'command-r-plus',
    temperature: 0.6,
    contextWindow: 128000,
    maxTokens: 4000,
    lastUpdated: new Date('2024-03-01'),
    owner: 'Cohere',
    createdAt: new Date('2024-03-01'),
    tags: ['rag', 'tools', 'long-context'],
  },
  {
    id: 'llama-3-70b',
    name: 'Llama 3 70B',
    provider: 'local',
    version: '3.0',
    avatar: '🦙',
    description: 'Open-source model running locally',
    status: 'idle',
    capabilities: ['code', 'files'],
    model: 'llama-3-70b-instruct',
    temperature: 0.7,
    contextWindow: 8192,
    maxTokens: 2048,
    lastUpdated: new Date('2024-04-18'),
    owner: 'Meta',
    createdAt: new Date('2024-04-18'),
    tags: ['open-source', 'local', 'privacy'],
  },
]);

// Actions
export function setMainAgent(agent: Agent | null) {
  $mainAgent.set(agent);
  if (agent) {
    // Generate mock metrics
    $mainAgentMetrics.set({
      tokensToday: Math.floor(Math.random() * 50000) + 10000,
      tokensSession: Math.floor(Math.random() * 5000) + 1000,
      estimatedCost: Math.random() * 10 + 0.5,
      requestCount: Math.floor(Math.random() * 100) + 10,
      usageTrend: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10000)),
      lastUsed: new Date(),
    });
  } else {
    $mainAgentMetrics.set(null);
  }
}

export function addSubAgent(agent: Agent) {
  const subAgent: SubAgent = { ...agent, selected: false };
  $subAgents.setKey(agent.id, subAgent);
}

export function removeSubAgent(agentId: string) {
  const agents = { ...$subAgents.get() };
  delete agents[agentId];
  $subAgents.set(agents);
  
  const selected = new Set($selectedSubAgentIds.get());
  selected.delete(agentId);
  $selectedSubAgentIds.set(selected);
}

export function toggleSubAgentSelection(agentId: string) {
  const selected = new Set($selectedSubAgentIds.get());
  if (selected.has(agentId)) {
    selected.delete(agentId);
  } else {
    selected.add(agentId);
  }
  $selectedSubAgentIds.set(selected);
}

export function clearSubAgentSelection() {
  $selectedSubAgentIds.set(new Set());
}

export function promoteSubAgentToMain(agentId: string) {
  const subAgent = $subAgents.get()[agentId];
  if (subAgent) {
    setMainAgent(subAgent);
    removeSubAgent(agentId);
  }
}

export function openAgentSelector(mode: 'main' | 'sub') {
  $agentSelectorMode.set(mode);
  $isAgentSelectorOpen.set(true);
}

export function closeAgentSelector() {
  $isAgentSelectorOpen.set(false);
  $agentFilter.set({});
}