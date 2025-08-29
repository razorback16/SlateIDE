import { useStore } from '@nanostores/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter,
  CheckSquare,
  Square,
  Brain
} from 'lucide-react';
import { 
  $providers,
  $selectedProviderId,
  $selectedModels,
  $searchQuery,
  toggleModelSelection,
  selectAllModels,
  deselectAllModels,
  setSearchQuery,
  getFilteredModels
} from '@/stores/models.store';
import { ModelCard } from './model-card';
import type { Provider } from '@/types/models';

export function ModelsSection() {
  const providers = useStore($providers);
  const selectedProviderId = useStore($selectedProviderId);
  const selectedModels = useStore($selectedModels);
  const searchQuery = useStore($searchQuery);

  const selectedProvider = providers.find(p => p.id === selectedProviderId) || null;
  const models = getFilteredModels(selectedProvider);
  const selectedCount = Object.values(selectedModels).filter(Boolean).length;
  const allSelected = models.length > 0 && models.every(m => selectedModels[m.id]);

  const handleSelectAll = () => {
    if (allSelected) {
      deselectAllModels();
    } else {
      selectAllModels(models.map(m => m.id));
    }
  };

  if (!selectedProvider) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-semibold mb-1">No Provider Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a provider from the list to view available models
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold">Models</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {selectedProvider.name} - {models.length} model{models.length !== 1 ? 's' : ''} available
            </p>
          </div>
          {selectedCount > 0 && (
            <Badge variant="secondary">
              {selectedCount} selected
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            className="gap-1"
          >
            {allSelected ? (
              <>
                <CheckSquare className="h-3 w-3" />
                Deselect All
              </>
            ) : (
              <>
                <Square className="h-3 w-3" />
                Select All
              </>
            )}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {models.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'No models match your search' : 'No models available for this provider'}
              </p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
              {models.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  isSelected={!!selectedModels[model.id]}
                  onToggleSelection={toggleModelSelection}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}