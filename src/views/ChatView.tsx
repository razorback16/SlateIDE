const ChatView = () => {
  return (
    <div className="view-container">
      <div className="panel-container">
        {/* Claude Trail Panel */}
        <div className="panel" style={{width: '280px', borderRight: '1px solid var(--border-subtle)'}}>
          <div className="p-4">
            <div className="mb-4 font-semibold text-primary text-sm">Claude Trail</div>
            <div className="ml-2 space-y-4 border-subtle border-l-2 pl-4">
              <div className="relative">
                <div className="-left-6 absolute h-3 w-3 rounded-full bg-accent-primary" />
                <div className="text-secondary text-xs">14:32</div>
                <div className="text-primary text-sm">Read</div>
                <div className="ml-2 text-secondary text-xs">└ auth.ts</div>
              </div>
              <div className="relative">
                <div className="-left-6 absolute h-3 w-3 rounded-full bg-accent-success" />
                <div className="text-secondary text-xs">14:33</div>
                <div className="text-primary text-sm">Edit</div>
                <div className="ml-2 text-secondary text-xs">└ auth.ts:45</div>
              </div>
              <div className="relative">
                <div className="-left-6 absolute h-3 w-3 rounded-full bg-accent-warning" />
                <div className="text-secondary text-xs">14:33</div>
                <div className="text-primary text-sm">Test</div>
                <div className="ml-2 text-secondary text-xs">└ auth.test.ts</div>
              </div>
              <div className="relative">
                <div className="-left-6 absolute h-3 w-3 rounded-full bg-accent-info" />
                <div className="text-secondary text-xs">14:34</div>
                <div className="text-primary text-sm">MCP Call</div>
                <div className="ml-2 text-secondary text-xs">└ database</div>
              </div>
            </div>

            <div className="mt-8 border-subtle border-t pt-4">
              <button type="button" className="mr-2 rounded border border-subtle px-3 py-1 text-secondary text-xs hover:bg-hover">
                Filter
              </button>
              <button type="button" className="rounded border border-subtle px-3 py-1 text-secondary text-xs hover:bg-hover">
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
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary text-sm text-white">
                  U
                </div>
                <div className="flex-1">
                  <div className="mb-1 font-medium text-primary text-sm">User</div>
                  <div className="rounded-lg bg-elevated p-3 text-primary text-sm">
                    Fix the auth bug
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm text-white">
                  C
                </div>
                <div className="flex-1">
                  <div className="mb-1 font-medium text-primary text-sm">Claude</div>
                  <div className="rounded-lg bg-elevated p-3 text-primary text-sm">
                    I&apos;ll help fix the auth bug. Let me examine the code first...
                    <div className="mt-3 rounded border border-subtle bg-primary p-3 font-mono text-xs">
                      <div className="mb-2 text-secondary">// Analysis in progress...</div>
                      <div>const user = await authenticate(credentials);</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-subtle border-t p-4">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg border border-subtle bg-elevated">
                <div className="p-3">
                  <textarea
                    placeholder="Send a message to Claude..."
                    className="w-full resize-none bg-transparent text-primary placeholder-secondary outline-none"
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between px-3 pb-3">
                  <div className="flex items-center gap-2">
                    <button type="button" className="rounded px-2 py-1 text-secondary text-xs hover:bg-hover">
                      <span className="font-bold">B</span>
                    </button>
                    <button type="button" className="rounded px-2 py-1 text-secondary text-xs hover:bg-hover">
                      <span className="italic">I</span>
                    </button>
                    <button type="button" className="rounded px-2 py-1 text-secondary text-xs hover:bg-hover">
                      {'</>'}
                    </button>
                    <button type="button" className="rounded px-2 py-1 text-secondary text-xs hover:bg-hover">
                      Link
                    </button>
                    <span className="ml-2 text-secondary text-xs">@ mention sub-agent</span>
                  </div>
                  <button type="button" className="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
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
