import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { $selectedSubAgentIds, clearSubAgentSelection, removeSubAgent } from '@/stores/agents.store'
import { useStore } from '@nanostores/react'
import { ArrowUpDown, Trash2, UserCheck, X } from 'lucide-react'

interface BulkActionsToolbarProps {
  selectedCount: number
}

export function BulkActionsToolbar({ selectedCount }: BulkActionsToolbarProps) {
  const selectedIds = useStore($selectedSubAgentIds)

  const handleRemoveSelected = () => {
    for (const id of selectedIds) {
      removeSubAgent(id)
    }
    clearSubAgentSelection()
  }

  const handleAssignRole = (role: string) => {
    // This would update the role for all selected agents
    console.log(`Assigning role ${role} to ${selectedCount} agents`)
    // Implementation would go here
  }

  return (
    <div className="flex items-center justify-between p-2 mb-2 bg-muted/50 rounded-lg border">
      <span className="text-sm font-medium">{selectedCount} selected</span>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={handleRemoveSelected} className="h-8">
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>

        <Button variant="ghost" size="sm" className="h-8" disabled>
          <ArrowUpDown className="h-4 w-4 mr-1" />
          Reorder
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8">
              <UserCheck className="h-4 w-4 mr-1" />
              Assign Role
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleAssignRole('reader')}>Reader</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAssignRole('reviewer')}>
              Reviewer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAssignRole('tester')}>Tester</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAssignRole('assistant')}>
              Assistant
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clearSubAgentSelection}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
