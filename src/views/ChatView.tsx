const ChatView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* Claude Trail Panel */}
        <div className="panel" style={{width: '280px', borderRight: '1px solid var(--color-border)'}}>
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">Claude Trail</div>
            <div className="ml-2 space-y-4 border-l-2 border-border pl-4">
              <div className="relative">
                <div className="-left-6 absolute h-3 w-3 rounded-full bg-primary" />
                <div className="text-muted-foreground text-xs">14:32</div>
                <div className="text-foreground text-sm font-medium">Read</div>
                <div className="ml-2 text-muted-foreground text-xs">└ auth.ts</div>
              </div>
              <div className="relative">
                <div className="-left-6 absolute h-3 w-3 rounded-full bg-chart-2" />
                <div className="text-muted-foreground text-xs">14:33</div>
                <div className="text-foreground text-sm font-medium">Edit</div>
                <div className="ml-2 text-muted-foreground text-xs">└ auth.ts:45</div>
              </div>
              <div className="relative">
                <div className="-left-6 absolute h-3 w-3 rounded-full bg-chart-3" />
                <div className="text-muted-foreground text-xs">14:33</div>
                <div className="text-foreground text-sm font-medium">Test</div>
                <div className="ml-2 text-muted-foreground text-xs">└ auth.test.ts</div>
              </div>
              <div className="relative">
                <div className="-left-6 absolute h-3 w-3 rounded-full bg-chart-4" />
                <div className="text-muted-foreground text-xs">14:34</div>
                <div className="text-foreground text-sm font-medium">MCP Call</div>
                <div className="ml-2 text-muted-foreground text-xs">└ database</div>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-4">
              <button type="button" className="mr-2 rounded border border-border px-3 py-1 text-muted-foreground text-xs hover:bg-accent hover:text-accent-foreground transition-colors">
                Filter
              </button>
              <button type="button" className="rounded border border-border px-3 py-1 text-muted-foreground text-xs hover:bg-accent hover:text-accent-foreground transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Conversation Panel */}
        <div className="panel flex flex-1 flex-col">
          <div className="flex-1 overflow-auto p-6">
            {/* Messages */}
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground font-medium">
                  U
                </div>
                <div className="flex-1">
                  <div className="mb-1 font-medium text-foreground text-sm">User</div>
                  <div className="rounded-lg bg-card border border-border p-3 text-foreground text-sm shadow-sm">
                    Fix the auth bug
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm text-white font-medium">
                  C
                </div>
                <div className="flex-1">
                  <div className="mb-1 font-medium text-foreground text-sm">Claude</div>
                  <div className="rounded-lg bg-card border border-border p-3 text-foreground text-sm shadow-sm">
                    I&apos;ll help fix the auth bug. Let me examine the code first...
                    <div className="mt-3 rounded border border-border bg-muted p-3 font-mono text-xs">
                      <div className="mb-2 text-muted-foreground">// Analysis in progress...</div>
                      <div className="text-foreground">const user = await authenticate(credentials);</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-background">
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
                    <button type="button" className="rounded px-2 py-1 text-muted-foreground text-xs hover:bg-accent hover:text-accent-foreground transition-colors">
                      <span className="font-bold">B</span>
                    </button>
                    <button type="button" className="rounded px-2 py-1 text-muted-foreground text-xs hover:bg-accent hover:text-accent-foreground transition-colors">
                      <span className="italic">I</span>
                    </button>
                    <button type="button" className="rounded px-2 py-1 text-muted-foreground text-xs hover:bg-accent hover:text-accent-foreground transition-colors">
                      {'</>'}
                    </button>
                    <button type="button" className="rounded px-2 py-1 text-muted-foreground text-xs hover:bg-accent hover:text-accent-foreground transition-colors">
                      Link
                    </button>
                    <span className="ml-2 text-muted-foreground text-xs">@ mention sub-agent</span>
                  </div>
                  <button type="button" className="rounded bg-primary px-4 py-1.5 text-sm text-primary-foreground hover:opacity-90 transition-opacity shadow-sm">
                    Send
                  </button>
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
