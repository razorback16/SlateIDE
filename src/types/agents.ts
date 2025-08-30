export type MainAgentStatus = 'installed' | 'available' | 'updating' | 'error';
export type SubAgentColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink' | 'cyan';
export type SubAgentDomain = 'frontend' | 'backend' | 'styling' | 'testing' | 'devops' | 'database' | 'mobile' | 'ai' | 'security';

// Main Agent - CLI tools for orchestration (only 1 active at a time)
export interface MainAgent {
  id: string;
  name: string; // e.g., "Claude Code", "Gemini CLI", "Qwen CLI"
  version: string;
  company: string; // e.g., "Anthropic", "Google", "Alibaba"
  description: string;
  status: MainAgentStatus;
  installPath?: string; // File system path where installed
  executable?: string; // Command to run the tool
  lastUpdated: Date;
  icon?: string; // Visual representation
  usageMetrics?: MainAgentMetrics;
}

// Sub Agent - Domain-specific experts (multiple can be active)
export interface SubAgent {
  id: string;
  name: string; // e.g., "Frontend Expert", "TailwindCSS Expert"
  model: string; // AI model to use (e.g., "gpt-4", "claude-3-sonnet")
  systemPrompt: string; // Specialized instructions
  mcpTools: string[]; // Array of MCP tools the agent has access to
  color: SubAgentColor; // Visual identifier
  domain: SubAgentDomain; // Area of expertise
  capabilities: string[]; // Specific skills within the domain
  description: string;
  isActive?: boolean; // Whether currently active
}

// Metrics for Main Agents
export interface MainAgentMetrics {
  totalProjects: number;
  successRate: number; // Percentage
  avgSessionTime: number; // Minutes
  tokensUsed: number;
  lastUsed?: Date;
  usageTrend: number[]; // Usage over time
}

// Filters for agent selection
export interface MainAgentFilter {
  status?: MainAgentStatus;
  company?: string;
  searchQuery?: string;
}

export interface SubAgentFilter {
  domain?: SubAgentDomain;
  color?: SubAgentColor;
  isActive?: boolean;
  searchQuery?: string;
}

// Legacy types for backward compatibility (can be removed later)
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

export interface AgentFilter {
  provider?: AgentProvider;
  capabilities?: AgentCapability[];
  searchQuery?: string;
}
