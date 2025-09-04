import { Button } from '@/components/ui/button'
import { openAgentSelector } from '@/stores/agents.store'
import { Users } from 'lucide-react'

export function SubAgentsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Users className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No sub-agents yet</h3>
      <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
        Add specialized agents to assist with specific tasks and collaborate with your main agent
      </p>
      <Button onClick={() => openAgentSelector('sub')}>Add Sub-agents</Button>
    </div>
  )
}
