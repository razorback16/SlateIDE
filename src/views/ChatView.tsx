import { Component } from 'solid-js'

const ChatView: Component = () => {
  return (
    <div class="view-container">
      <div class="panel-container">
        {/* Claude Trail Panel */}
        <div class="panel" style="width: 280px; border-right: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="mb-4 font-semibold text-primary text-sm">Claude Trail</div>
            <div class="ml-2 space-y-4 border-subtle border-l-2 pl-4">
              <div class="relative">
                <div class="-left-6 absolute h-3 w-3 rounded-full bg-accent-primary" />
                <div class="text-secondary text-xs">14:32</div>
                <div class="text-primary text-sm">Read</div>
                <div class="ml-2 text-secondary text-xs">└ auth.ts</div>
              </div>
              <div class="relative">
                <div class="-left-6 absolute h-3 w-3 rounded-full bg-accent-success" />
                <div class="text-secondary text-xs">14:33</div>
                <div class="text-primary text-sm">Edit</div>
                <div class="ml-2 text-secondary text-xs">└ auth.ts:45</div>
              </div>
              <div class="relative">
                <div class="-left-6 absolute h-3 w-3 rounded-full bg-accent-warning" />
                <div class="text-secondary text-xs">14:33</div>
                <div class="text-primary text-sm">Test</div>
                <div class="ml-2 text-secondary text-xs">└ auth.test.ts</div>
              </div>
              <div class="relative">
                <div class="-left-6 absolute h-3 w-3 rounded-full bg-accent-info" />
                <div class="text-secondary text-xs">14:34</div>
                <div class="text-primary text-sm">MCP Call</div>
                <div class="ml-2 text-secondary text-xs">└ database</div>
              </div>
            </div>

            <div class="mt-8 border-subtle border-t pt-4">
              <button type="button" class="mr-2 rounded border border-subtle px-3 py-1 text-secondary text-xs hover:bg-hover">
                Filter
              </button>
              <button type="button" class="rounded border border-subtle px-3 py-1 text-secondary text-xs hover:bg-hover">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Conversation Panel */}
        <div class="panel flex flex-1 flex-col">
          <div class="flex-1 overflow-auto p-6">
            {/* Messages */}
            <div class="mx-auto max-w-4xl space-y-6">
              <div class="flex gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary text-sm text-white">
                  U
                </div>
                <div class="flex-1">
                  <div class="mb-1 font-medium text-primary text-sm">User</div>
                  <div class="rounded-lg bg-elevated p-3 text-primary text-sm">
                    Fix the auth bug
                  </div>
                </div>
              </div>

              <div class="flex gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm text-white">
                  C
                </div>
                <div class="flex-1">
                  <div class="mb-1 font-medium text-primary text-sm">Claude</div>
                  <div class="rounded-lg bg-elevated p-3 text-primary text-sm">
                    I'll help fix the auth bug. Let me examine the code first...
                    <div class="mt-3 rounded border border-subtle bg-primary p-3 font-mono text-xs">
                      <div class="mb-2 text-secondary">// Analysis in progress...</div>
                      <div>const user = await authenticate(credentials);</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div class="border-subtle border-t p-4">
            <div class="mx-auto max-w-4xl">
              <div class="rounded-lg border border-subtle bg-elevated">
                <div class="p-3">
                  <textarea
                    placeholder="Send a message to Claude..."
                    class="w-full resize-none bg-transparent text-primary placeholder-secondary outline-none"
                    rows="3"
                  />
                </div>
                <div class="flex items-center justify-between px-3 pb-3">
                  <div class="flex items-center gap-2">
                    <button type="button" class="rounded px-2 py-1 text-secondary text-xs hover:bg-hover">
                      <span class="font-bold">B</span>
                    </button>
                    <button type="button" class="rounded px-2 py-1 text-secondary text-xs hover:bg-hover">
                      <span class="italic">I</span>
                    </button>
                    <button type="button" class="rounded px-2 py-1 text-secondary text-xs hover:bg-hover">
                      {'</>'}
                    </button>
                    <button type="button" class="rounded px-2 py-1 text-secondary text-xs hover:bg-hover">
                      Link
                    </button>
                    <span class="ml-2 text-secondary text-xs">@ mention sub-agent</span>
                  </div>
                  <button type="button" class="rounded bg-accent-primary px-4 py-1.5 text-sm text-white hover:opacity-90">
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
