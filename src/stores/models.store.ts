import { atom, map } from 'nanostores';
import type { Provider, Model } from '../types/models';
import { mockProviders } from '../data/mock-models';

// Store for all providers
export const $providers = atom<Provider[]>(mockProviders);

// Store for selected provider ID
export const $selectedProviderId = atom<string | null>(mockProviders[0]?.id || null);

// Store for selected models (using Map for efficient lookups)
export const $selectedModels = map<Record<string, boolean>>({});

// Store for search query
export const $searchQuery = atom<string>('');

// Store for dialog visibility
export const $isAddProviderDialogOpen = atom<boolean>(false);

// Actions
export function selectProvider(providerId: string | null) {
  $selectedProviderId.set(providerId);
}

export function toggleModelSelection(modelId: string) {
  const current = $selectedModels.get();
  $selectedModels.setKey(modelId, !current[modelId]);
}

export function selectAllModels(modelIds: string[]) {
  const updates: Record<string, boolean> = {};
  for (const id of modelIds) {
    updates[id] = true;
  }
  $selectedModels.set(updates);
}

export function deselectAllModels() {
  $selectedModels.set({});
}

export function addProvider(provider: Provider) {
  const current = $providers.get();
  $providers.set([...current, provider]);
}

export function removeProvider(providerId: string) {
  const current = $providers.get();
  $providers.set(current.filter(p => p.id !== providerId));
  
  // If the removed provider was selected, select the first available
  if ($selectedProviderId.get() === providerId) {
    const remaining = current.filter(p => p.id !== providerId);
    $selectedProviderId.set(remaining[0]?.id || null);
  }
}

export function updateProvider(providerId: string, updates: Partial<Provider>) {
  const current = $providers.get();
  $providers.set(
    current.map(p => 
      p.id === providerId ? { ...p, ...updates } : p
    )
  );
}

export function setSearchQuery(query: string) {
  $searchQuery.set(query);
}

export function openAddProviderDialog() {
  $isAddProviderDialogOpen.set(true);
}

export function closeAddProviderDialog() {
  $isAddProviderDialogOpen.set(false);
}

// Computed values
export function getSelectedProvider(): Provider | null {
  const providers = $providers.get();
  const selectedId = $selectedProviderId.get();
  return providers.find(p => p.id === selectedId) || null;
}

export function getSelectedModelsCount(): number {
  const selected = $selectedModels.get();
  return Object.values(selected).filter(Boolean).length;
}

export function getFilteredModels(provider: Provider | null): Model[] {
  if (!provider) return [];
  
  const searchQuery = $searchQuery.get().toLowerCase();
  if (!searchQuery) return provider.models;
  
  return provider.models.filter(model => 
    model.name.toLowerCase().includes(searchQuery) ||
    model.description.toLowerCase().includes(searchQuery) ||
    model.capabilities.some(cap => cap.toLowerCase().includes(searchQuery))
  );
}