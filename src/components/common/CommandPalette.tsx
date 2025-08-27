import { useState, useEffect, useMemo } from 'react'
import { useStore } from '@nanostores/react'
import {
  $commandPaletteOpen,
  toggleCommandPalette,
  setActiveView,
  navigationItems,
  ViewType,
} from '#/context/ide.store'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from '@/components/ui/command'

interface Command {
  id: string
  label: string
  shortcut?: string
  action: () => void
  category: string
}

const CommandPalette = () => {
  const isOpen = useStore($commandPaletteOpen)
  const [search, setSearch] = useState('')

  const commands: Command[] = useMemo(() => [
    // Navigation commands
    ...navigationItems.map((item) => ({
      id: `nav-${item.id}`,
      label: `Go to ${item.label}`,
      shortcut: `⌘${navigationItems.indexOf(item) + 1}`,
      action: () => {
        setActiveView(item.id)
        toggleCommandPalette()
      },
      category: 'Navigation',
    })),
    // File commands
    {
      id: 'file-new',
      label: 'New File',
      shortcut: '⌘N',
      action: () => {
        // TODO: Implement new file functionality
        toggleCommandPalette()
      },
      category: 'File',
    },
    {
      id: 'file-open',
      label: 'Open File',
      shortcut: '⌘O',
      action: () => {
        // TODO: Implement open file functionality
        toggleCommandPalette()
      },
      category: 'File',
    },
    {
      id: 'file-save',
      label: 'Save File',
      shortcut: '⌘S',
      action: () => {
        // TODO: Implement save file functionality
        toggleCommandPalette()
      },
      category: 'File',
    },
    // Chat commands
    {
      id: 'chat-new',
      label: 'New Chat Session',
      action: () => {
        setActiveView('chat')
        toggleCommandPalette()
      },
      category: 'Chat',
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
      category: 'Git',
    },
    // MCP commands
    {
      id: 'mcp-connect',
      label: 'MCP: Connect Server',
      action: () => {
        setActiveView('mcp')
        toggleCommandPalette()
      },
      category: 'MCP',
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
      category: 'Sub-agents',
    },
  ], [])

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, Command[]> = {}
    commands.forEach(command => {
      if (!groups[command.category]) {
        groups[command.category] = []
      }
      groups[command.category].push(command)
    })
    return groups
  }, [commands])

  const handleSelect = (commandId: string) => {
    const command = commands.find(cmd => cmd.id === commandId)
    if (command) {
      command.action()
    }
  }


  useEffect(() => {
    // Global shortcut to open command palette
    const globalShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleCommandPalette()
      }
    }
    document.addEventListener('keydown', globalShortcut)

    return () => {
      document.removeEventListener('keydown', globalShortcut)
    }
  }, [])

  // Reset search when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSearch('')
    }
  }, [isOpen])

  return (
    <CommandDialog open={isOpen} onOpenChange={(open) => !open && toggleCommandPalette()}>
      <CommandInput placeholder="Type a command or search..." value={search} onValueChange={setSearch} />
      <CommandList>
        <CommandEmpty>No commands found</CommandEmpty>
        {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
          <CommandGroup key={category} heading={category}>
            {categoryCommands.map((command) => (
              <CommandItem
                key={command.id}
                value={command.label}
                onSelect={() => handleSelect(command.id)}
              >
                <span>{command.label}</span>
                {command.shortcut && (
                  <CommandShortcut>{command.shortcut}</CommandShortcut>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}

export default CommandPalette
