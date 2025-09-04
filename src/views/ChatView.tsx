import { Button } from '@/components/ui/button'
import { useStore } from '@nanostores/react'
import { $chatSidebarCollapsed } from '#/context/ide.store'

const ChatView = () => {
  const sidebarCollapsed = useStore($chatSidebarCollapsed)

  return (
    <div className="flex h-full overflow-hidden">
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarCollapsed
            ? 'w-0 min-w-0 max-w-0 -translate-x-full opacity-0'
            : 'w-1/3 min-w-[300px] max-w-[400px] translate-x-0 opacity-100'
        }`}
      >
        {/* Claude Trail Panel */}
        <div className="flex flex-col h-full border-r">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Claude Trail</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Action history and tool usage</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="ml-2 space-y-4 border-border border-l-2 pl-4">
              <div className="relative">
                <div className="-left-6 absolute h-3 w-3 rounded-full bg-primary" />
                <div className="text-muted-foreground text-xs">14:32</div>
                <div className="font-medium text-foreground text-sm">Read</div>
                <div className="ml-2 text-muted-foreground text-xs">└ auth.ts</div>
              </div>
              <div className="relative">
                <div className="-left-6 absolute h-3 w-3 rounded-full bg-chart-2" />
                <div className="text-muted-foreground text-xs">14:33</div>
                <div className="font-medium text-foreground text-sm">Edit</div>
                <div className="ml-2 text-muted-foreground text-xs">└ auth.ts:45</div>
              </div>
              <div className="relative">
                <div className="-left-6 absolute h-3 w-3 rounded-full bg-chart-3" />
                <div className="text-muted-foreground text-xs">14:33</div>
                <div className="font-medium text-foreground text-sm">Test</div>
                <div className="ml-2 text-muted-foreground text-xs">└ auth.test.ts</div>
              </div>
              <div className="relative">
                <div className="-left-6 absolute h-3 w-3 rounded-full bg-chart-4" />
                <div className="text-muted-foreground text-xs">14:34</div>
                <div className="font-medium text-foreground text-sm">MCP Call</div>
                <div className="ml-2 text-muted-foreground text-xs">└ database</div>
              </div>
            </div>

            <div className="mt-8 border-border border-t pt-4">
              <Button variant="outline" size="sm" className="mr-2">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        {/* Conversation Panel */}
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Conversation</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Chat with Claude Code</p>
          </div>
          <div className="flex-1 overflow-auto p-6">
            {/* Messages */}
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-sm">
                  U
                </div>
                <div className="flex-1">
                  <div className="mb-1 font-medium text-foreground text-sm">User</div>
                  <div className="rounded-lg border border-border bg-card p-3 text-foreground text-sm shadow-sm">
                    Fix the auth bug
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 font-medium text-sm text-white">
                  C
                </div>
                <div className="flex-1">
                  <div className="mb-1 font-medium text-foreground text-sm">Claude</div>
                  <div className="rounded-lg border border-border bg-card p-3 text-foreground text-sm shadow-sm">
                    I&apos;ll help fix the auth bug. Let me examine the code first...
                    <div className="mt-3 rounded border border-border bg-muted p-3 font-mono text-xs">
                      <div className="mb-2 text-muted-foreground">// Analysis in progress...</div>
                      <div className="text-foreground">
                        const user = await authenticate(credentials);
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-border border-t bg-background p-4">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg border border-border bg-card shadow-sm">
                <div className="p-3">
                  <textarea
                    placeholder="Send a message to Claude..."
                    className="w-full resize-none bg-transparent text-foreground placeholder-muted-foreground outline-none"
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between px-3 pb-3">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <span className="font-bold">B</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <span className="italic">I</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      {'</>'}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      Link
                    </Button>
                    <span className="ml-2 text-muted-foreground text-xs">@ mention sub-agent</span>
                  </div>
                  <Button size="sm" className="shadow-sm">
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatView
