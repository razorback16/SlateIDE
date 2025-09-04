import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  $providers,
  $selectedProviderId,
  openAddProviderDialog,
  removeProvider,
  selectProvider,
} from '@/stores/models.store'
import type { Provider } from '@/types/models'
import { useStore } from '@nanostores/react'
import { CheckCircle, Cloud, Key, Plus, Server, Settings, Trash2, XCircle } from 'lucide-react'

export function ProvidersSection() {
  const providers = useStore($providers)
  const selectedProviderId = useStore($selectedProviderId)

  const handleRemoveProvider = (e: React.MouseEvent, providerId: string) => {
    e.stopPropagation()
    removeProvider(providerId)
  }

  const getProviderIcon = (provider: Provider) => {
    if (provider.id === 'local') {
      return <Server className="h-4 w-4" />
    }
    return <Cloud className="h-4 w-4" />
  }

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Providers</h2>
          <Button size="sm" variant="outline" onClick={openAddProviderDialog} className="h-8">
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Manage your AI model providers</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {providers.length === 0 ? (
            <div className="text-center py-8 px-4">
              <Cloud className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-3">No providers configured</p>
              <Button size="sm" onClick={openAddProviderDialog}>
                <Plus className="h-3 w-3 mr-1" />
                Add Provider
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className={cn(
                    'group relative rounded-lg p-3 cursor-pointer transition-colors',
                    'hover:bg-accent',
                    selectedProviderId === provider.id && 'bg-accent'
                  )}
                  onClick={() => selectProvider(provider.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-0.5">{getProviderIcon(provider)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium truncate">{provider.name}</h3>
                          {provider.isConnected ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-red-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {provider.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {provider.models.length} models
                          </Badge>
                          {provider.apiKeyRequired && (
                            <Key className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                      {provider.id !== 'local' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={(e) => handleRemoveProvider(e, provider.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
