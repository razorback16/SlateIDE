export interface Provider {
  id: string;
  name: string;
  icon?: string;
  description: string;
  models: Model[];
  isConnected?: boolean;
  apiKeyRequired?: boolean;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  provider: string;
  contextLength: number;
  maxTokens: number;
  releaseDate: string;
  capabilities: string[];
  family?: string;
  size?: string;
  costPerMillion?: {
    input: number;
    output: number;
  };
  isDefault?: boolean;
}

export interface ModelCapability {
  name: string;
  color: string;
}

export const MODEL_CAPABILITIES: Record<string, ModelCapability> = {
  chat: { name: 'Chat', color: 'bg-blue-500' },
  code: { name: 'Code', color: 'bg-green-500' },
  vision: { name: 'Vision', color: 'bg-purple-500' },
  tools: { name: 'Tools', color: 'bg-orange-500' },
  json: { name: 'JSON', color: 'bg-yellow-500' },
  streaming: { name: 'Streaming', color: 'bg-cyan-500' },
};