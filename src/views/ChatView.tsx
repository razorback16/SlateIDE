const ChatView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* Claude Trail Panel */}
        <div
          className="panel"
          style={{ width: '280px', borderRight: '1px solid var(--color-border)' }}
        >
          <div className="p-4">
            <div className="mb-4 font-semibold text-foreground text-sm">Claude Trail</div>
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
              <button
                type="button"
                className="mr-2 rounded border border-border px-3 py-1 text-muted-foreground text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Filter
              </button>
              <button
                type="button"
                className="rounded border border-border px-3 py-1 text-muted-foreground text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
              >
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
                    <button
                      type="button"
                      className="rounded px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="font-bold">B</span>
                    </button>
                    <button
                      type="button"
                      className="rounded px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="italic">I</span>
                    </button>
                    <button
                      type="button"
                      className="rounded px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {'</>'}
                    </button>
                    <button
                      type="button"
                      className="rounded px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Link
                    </button>
                    <span className="ml-2 text-muted-foreground text-xs">@ mention sub-agent</span>
                  </div>
                  <button
                    type="button"
                    className="rounded bg-primary px-4 py-1.5 text-primary-foreground text-sm shadow-sm transition-opacity hover:opacity-90"
                  >
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
