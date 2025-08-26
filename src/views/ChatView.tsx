import { Component } from 'solid-js'

const ChatView: Component = () => {
  return (
    <div class="view-container">
      <div class="panel-container">
        {/* Claude Trail Panel */}
        <div class="panel" style="width: 280px; border-right: 1px solid var(--border-subtle);">
          <div class="p-4">
            <div class="text-sm font-semibold text-primary mb-4">Claude Trail</div>
            <div class="border-l-2 border-subtle ml-2 pl-4 space-y-4">
              <div class="relative">
                <div class="absolute -left-6 w-3 h-3 rounded-full bg-accent-primary"></div>
                <div class="text-xs text-secondary">14:32</div>
                <div class="text-sm text-primary">Read</div>
                <div class="text-xs text-secondary ml-2">└ auth.ts</div>
              </div>
              <div class="relative">
                <div class="absolute -left-6 w-3 h-3 rounded-full bg-accent-success"></div>
                <div class="text-xs text-secondary">14:33</div>
                <div class="text-sm text-primary">Edit</div>
                <div class="text-xs text-secondary ml-2">└ auth.ts:45</div>
              </div>
              <div class="relative">
                <div class="absolute -left-6 w-3 h-3 rounded-full bg-accent-warning"></div>
                <div class="text-xs text-secondary">14:33</div>
                <div class="text-sm text-primary">Test</div>
                <div class="text-xs text-secondary ml-2">└ auth.test.ts</div>
              </div>
              <div class="relative">
                <div class="absolute -left-6 w-3 h-3 rounded-full bg-accent-info"></div>
                <div class="text-xs text-secondary">14:34</div>
                <div class="text-sm text-primary">MCP Call</div>
                <div class="text-xs text-secondary ml-2">└ database</div>
              </div>
            </div>
            
            <div class="mt-8 pt-4 border-t border-subtle">
              <button class="text-xs px-3 py-1 rounded border border-subtle hover:bg-hover text-secondary mr-2">
                Filter
              </button>
              <button class="text-xs px-3 py-1 rounded border border-subtle hover:bg-hover text-secondary">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Conversation Panel */}
        <div class="panel flex-1 flex flex-col">
          <div class="flex-1 p-6 overflow-auto">
            {/* Messages */}
            <div class="max-w-4xl mx-auto space-y-6">
              <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-white text-sm">
                  U
                </div>
                <div class="flex-1">
                  <div class="text-sm font-medium text-primary mb-1">User</div>
                  <div class="text-sm text-primary bg-elevated rounded-lg p-3">
                    Fix the auth bug
                  </div>
                </div>
              </div>
              
              <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm">
                  C
                </div>
                <div class="flex-1">
                  <div class="text-sm font-medium text-primary mb-1">Claude</div>
                  <div class="text-sm text-primary bg-elevated rounded-lg p-3">
                    I'll help fix the auth bug. Let me examine the code first...
                    <div class="mt-3 p-3 bg-primary rounded border border-subtle font-mono text-xs">
                      <div class="text-secondary mb-2">// Analysis in progress...</div>
                      <div>const user = await authenticate(credentials);</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Input Area */}
          <div class="border-t border-subtle p-4">
            <div class="max-w-4xl mx-auto">
              <div class="bg-elevated rounded-lg border border-subtle">
                <div class="p-3">
                  <textarea 
                    placeholder="Send a message to Claude..."
                    class="w-full bg-transparent text-primary placeholder-secondary resize-none outline-none"
                    rows="3"
                  />
                </div>
                <div class="flex items-center justify-between px-3 pb-3">
                  <div class="flex items-center gap-2">
                    <button class="text-xs px-2 py-1 rounded hover:bg-hover text-secondary">
                      <span class="font-bold">B</span>
                    </button>
                    <button class="text-xs px-2 py-1 rounded hover:bg-hover text-secondary">
                      <span class="italic">I</span>
                    </button>
                    <button class="text-xs px-2 py-1 rounded hover:bg-hover text-secondary">
                      {'</>'}
                    </button>
                    <button class="text-xs px-2 py-1 rounded hover:bg-hover text-secondary">
                      Link
                    </button>
                    <span class="text-xs text-secondary ml-2">@ mention sub-agent</span>
                  </div>
                  <button class="px-4 py-1.5 bg-accent-primary text-white rounded text-sm hover:opacity-90">
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