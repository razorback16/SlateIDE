export type AgentStatus = 'idle' | 'active' | 'unavailable';
export type AgentProvider = 'openai' | 'anthropic' | 'google' | 'mistral' | 'cohere' | 'local';
export type AgentRole = 'reader' | 'reviewer' | 'tester' | 'assistant';
export type AgentCapability = 'code' | 'web' | 'tools' | 'files' | 'vision' | 'voice';

export interface Agent {
  id: string;
  name: string;
  provider: AgentProvider;
  version: string;
  avatar?: string;
  description: string;
  status: AgentStatus;
  capabilities: AgentCapability[];
  model: string;
  temperature: number;
  contextWindow: number;
  maxTokens: number;
  lastUpdated: Date;
  owner: string;
  createdAt: Date;
  tags: string[];
  notes?: string;
}

export interface AgentMetrics {
  tokensToday: number;
  tokensSession: number;
  estimatedCost: number;
  requestCount: number;
  usageTrend: number[];
  lastUsed?: Date;
}

export interface SubAgent extends Agent {
  role?: AgentRole;
  selected?: boolean;
}

export interface AgentFilter {
  provider?: AgentProvider;
  capabilities?: AgentCapability[];
  searchQuery?: string;
}