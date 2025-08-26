import { Component, Show, For, createSignal, onMount, onCleanup } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { 
  $commandPaletteOpen, 
  toggleCommandPalette,
  setActiveView,
  navigationItems,
  ViewType
} from '#/stores/ide.store'
import Fuse from 'fuse.js'

interface Command {
  id: string
  label: string
  shortcut?: string
  action: () => void
  category: string
}

const CommandPalette: Component = () => {
  const isOpen = useStore($commandPaletteOpen)
  const [search, setSearch] = createSignal('')
  const [filteredCommands, setFilteredCommands] = createSignal<Command[]>([])
  const [selectedIndex, setSelectedIndex] = createSignal(0)
  
  const commands: Command[] = [
    // Navigation commands
    ...navigationItems.map(item => ({
      id: `nav-${item.id}`,
      label: `Go to ${item.label}`,
      shortcut: `⌘${navigationItems.indexOf(item) + 1}`,
      action: () => {
        setActiveView(item.id)
        toggleCommandPalette()
      },
      category: 'Navigation'
    })),
    // File commands
    {
      id: 'file-new',
      label: 'New File',
      shortcut: '⌘N',
      action: () => {
        console.log('New file')
        toggleCommandPalette()
      },
      category: 'File'
    },
    {
      id: 'file-open',
      label: 'Open File',
      shortcut: '⌘O',
      action: () => {
        console.log('Open file')
        toggleCommandPalette()
      },
      category: 'File'
    },
    {
      id: 'file-save',
      label: 'Save File',
      shortcut: '⌘S',
      action: () => {
        console.log('Save file')
        toggleCommandPalette()
      },
      category: 'File'
    },
    // Chat commands
    {
      id: 'chat-new',
      label: 'New Chat Session',
      action: () => {
        setActiveView('chat')
        toggleCommandPalette()
      },
      category: 'Chat'
    },
    // Git commands
    {
      id: 'git-commit',
      label: 'Git: Commit Changes',
      shortcut: '⌘⇧C',
      action: () => {
        setActiveView('git')
        toggleCommandPalette()
      },
      category: 'Git'
    },
    // MCP commands
    {
      id: 'mcp-connect',
      label: 'MCP: Connect Server',
      action: () => {
        setActiveView('mcp')
        toggleCommandPalette()
      },
      category: 'MCP'
    },
    // Sub-agent commands
    {
      id: 'agent-invoke',
      label: 'Sub-agent: Invoke Testing',
      shortcut: '⌘⇧T',
      action: () => {
        setActiveView('agents')
        toggleCommandPalette()
      },
      category: 'Sub-agents'
    }
  ]
  
  const fuse = new Fuse(commands, {
    keys: ['label', 'category'],
    threshold: 0.3
  })
  
  const handleSearch = (value: string) => {
    setSearch(value)
    setSelectedIndex(0)
    
    if (value.trim() === '') {
      setFilteredCommands(commands)
    } else {
      const results = fuse.search(value)
      setFilteredCommands(results.map(r => r.item))
    }
  }
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen()) return
    
    if (e.key === 'Escape') {
      toggleCommandPalette()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, filteredCommands().length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const command = filteredCommands()[selectedIndex()]
      if (command) {
        command.action()
      }
    }
  }
  
  onMount(() => {
    document.addEventListener('keydown', handleKeyDown)
    
    // Global shortcut to open command palette
    const globalShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleCommandPalette()
      }
    }
    document.addEventListener('keydown', globalShortcut)
    
    // Initialize with all commands
    setFilteredCommands(commands)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keydown', globalShortcut)
    }
  })
  
  onCleanup(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
  
  return (
    <Show when={isOpen()}>
      <div class="fixed inset-0 z-50 flex items-start justify-center pt-32">
        {/* Backdrop */}
        <div 
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleCommandPalette}
        />
        
        {/* Command Palette */}
        <div class="relative w-full max-w-2xl animate-fade-in">
          <div class="bg-elevated rounded-lg shadow-2xl border border-subtle overflow-hidden">
            {/* Search Input */}
            <div class="flex items-center gap-3 px-4 py-3 border-b border-subtle">
              <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Type a command or search..."
                class="flex-1 bg-transparent text-primary placeholder-secondary outline-none text-sm"
                value={search()}
                onInput={(e) => handleSearch(e.currentTarget.value)}
                autofocus
              />
              <kbd class="kbd">ESC</kbd>
            </div>
            
            {/* Command List */}
            <div class="max-h-96 overflow-y-auto py-2">
              <Show when={filteredCommands().length > 0} fallback={
                <div class="px-4 py-8 text-center text-sm text-secondary">
                  No commands found
                </div>
              }>
                <For each={filteredCommands()}>
                  {(command, index) => (
                    <div
                      class={`px-4 py-2 flex items-center justify-between cursor-pointer transition-colors ${
                        index() === selectedIndex() ? 'bg-hover' : ''
                      }`}
                      onMouseEnter={() => setSelectedIndex(index())}
                      onClick={() => command.action()}
                    >
                      <div class="flex items-center gap-3">
                        <span class="text-xs text-secondary opacity-50">{command.category}</span>
                        <span class="text-sm text-primary">{command.label}</span>
                      </div>
                      <Show when={command.shortcut}>
                        <kbd class="kbd text-xs">{command.shortcut}</kbd>
                      </Show>
                    </div>
                  )}
                </For>
              </Show>
            </div>
          </div>
        </div>
      </div>
    </Show>
  )
}

export default CommandPalette