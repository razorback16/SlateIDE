import { useState } from 'react';
import { useStore } from '@nanostores/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Cloud, Key } from 'lucide-react';
import {
  $isAddProviderDialogOpen,
  closeAddProviderDialog,
  addProvider,
} from '@/stores/models.store';
import type { Provider, Model } from '@/types/models';
import { MODEL_CAPABILITIES } from '@/types/models';
import { cn } from '@/lib/utils';

// Mock available providers that can be added
const availableProviders: Provider[] = [
  {
    id: 'cohere',
    name: 'Cohere',
    description: 'Enterprise AI with multilingual models',
    apiKeyRequired: true,
    models: [
      {
        id: 'command-r-plus',
        name: 'Command R+',
        description: 'Advanced RAG and tool use capabilities',
        provider: 'cohere',
        contextLength: 128000,
        maxTokens: 4096,
        releaseDate: '2024-03',
        capabilities: ['chat', 'tools', 'json'],
        family: 'Command',
        size: 'Large',
      },
      {
        id: 'command-r',
        name: 'Command R',
        description: 'Efficient model for enterprise use',
        provider: 'cohere',
        contextLength: 128000,
        maxTokens: 4096,
        releaseDate: '2024-01',
        capabilities: ['chat', 'tools'],
        family: 'Command',
        size: 'Medium',
      },
    ],
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'Open source models and inference API',
    apiKeyRequired: true,
    models: [
      {
        id: 'mixtral-8x7b',
        name: 'Mixtral 8x7B',
        description: 'Mixture of experts model',
        provider: 'huggingface',
        contextLength: 32768,
        maxTokens: 4096,
        releaseDate: '2023-12',
        capabilities: ['chat', 'code'],
        family: 'Mixtral',
        size: 'Large',
      },
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'AI models with real-time web search',
    apiKeyRequired: true,
    models: [
      {
        id: 'sonar-large',
        name: 'Sonar Large',
        description: 'Model with integrated web search',
        provider: 'perplexity',
        contextLength: 32768,
        maxTokens: 4096,
        releaseDate: '2024-01',
        capabilities: ['chat', 'tools'],
        family: 'Sonar',
        size: 'Large',
      },
    ],
  },
];

export function AddProviderDialog() {
  const isOpen = useStore($isAddProviderDialogOpen);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set());
  const [apiKey, setApiKey] = useState('');

  const filteredProviders = availableProviders.filter(
    (provider) =>
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProvider = () => {
    if (selectedProvider) {
      const modelsToAdd = selectedProvider.models.filter((m) =>
        selectedModels.has(m.id)
      );
      
      addProvider({
        ...selectedProvider,
        models: modelsToAdd,
        isConnected: !!apiKey || !selectedProvider.apiKeyRequired,
      });
      
      handleClose();
    }
  };

  const handleClose = () => {
    setSearchQuery('');
    setSelectedProvider(null);
    setSelectedModels(new Set());
    setApiKey('');
    closeAddProviderDialog();
  };

  const toggleModelSelection = (modelId: string) => {
    const newSelection = new Set(selectedModels);
    if (newSelection.has(modelId)) {
      newSelection.delete(modelId);
    } else {
      newSelection.add(modelId);
    }
    setSelectedModels(newSelection);
  };

  const selectAllModels = () => {
    if (selectedProvider) {
      setSelectedModels(new Set(selectedProvider.models.map((m) => m.id)));
    }
  };

  const deselectAllModels = () => {
    setSelectedModels(new Set());
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Provider</DialogTitle>
          <DialogDescription>
            Select a provider and choose which models to enable
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!selectedProvider ? (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search providers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <ScrollArea className="h-[300px] border rounded-lg p-2">
                <div className="space-y-2">
                  {filteredProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer transition-colors",
                        "hover:bg-accent"
                      )}
                      onClick={() => {
                        setSelectedProvider(provider);
                        selectAllModels();
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Cloud className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{provider.name}</h4>
                            {provider.apiKeyRequired && (
                              <Key className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {provider.description}
                          </p>
                          <Badge variant="secondary" className="mt-2">
                            {provider.models.length} models available
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div className="flex items-center gap-3">
                  <Cloud className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{selectedProvider.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedProvider.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProvider(null)}
                >
                  Change
                </Button>
              </div>

              {selectedProvider.apiKeyRequired && (
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your API key (optional)"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    You can add the API key later in settings
                  </p>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Select Models</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={selectAllModels}
                    >
                      Select All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={deselectAllModels}
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                <ScrollArea className="h-[200px] border rounded-lg p-2">
                  <div className="space-y-2">
                    {selectedProvider.models.map((model) => (
                      <div
                        key={model.id}
                        className="flex items-start gap-3 p-2 rounded hover:bg-accent"
                      >
                        <Checkbox
                          checked={selectedModels.has(model.id)}
                          onCheckedChange={() => toggleModelSelection(model.id)}
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{model.name}</div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {model.description}
                          </p>
                          <div className="flex gap-1 mt-1">
                            {model.capabilities.slice(0, 3).map((cap) => {
                              const capInfo = MODEL_CAPABILITIES[cap.toLowerCase()];
                              return (
                                <Badge
                                  key={cap}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {capInfo?.name || cap}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAddProvider}
            disabled={!selectedProvider || selectedModels.size === 0}
          >
            Add Provider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}