import { Button } from '@/components/ui/button'
import { openAgentSelector } from '@/stores/agents.store'
import { Bot } from 'lucide-react'

export function MainAgentEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Bot className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No main agent selected</h3>
      <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
        Select a primary agent to handle your main tasks and coordinate with sub-agents
      </p>
      <Button onClick={() => openAgentSelector('main')}>Add Agent</Button>
    </div>
  )
}
