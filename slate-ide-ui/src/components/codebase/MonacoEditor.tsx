import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, MoreHorizontal } from 'lucide-react'

// Mock open files
const openFiles = [
  { id: 'auth.ts', name: 'auth.ts', modified: true, active: true },
  { id: 'user.ts', name: 'user.ts', modified: false, active: false },
  { id: 'api.ts', name: 'api.ts', modified: true, active: false },
]

const mockCode = `import { User } from './types';

export async function authenticate(
  credentials: Credentials
): Promise<User> {
  // Improved implementation
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  const user = await response.json();
  return user;
}

export function logout(): void {
  localStorage.removeItem('auth_token');
  window.location.href = '/login';
}`

export function MonacoEditor() {
  const [activeFileId, setActiveFileId] = useState('auth.ts')

  const handleEditorDidMount = (editor: any, monaco: any) => {
    // Configure Monaco for IDE-like experience
    monaco.editor.defineTheme('slate-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#0A0B0D',
        'editor.foreground': '#E4E4E7',
        'editorLineNumber.foreground': '#A1A1AA',
        'editorCursor.foreground': '#3B82F6',
        'editor.selectionBackground': '#3B82F640',
        'editor.inactiveSelectionBackground': '#3B82F620',
      }
    })
    monaco.editor.setTheme('slate-dark')
  }

  return (
    <div className="h-full flex flex-col bg-card">
      {/* File Tabs */}
      <div className="border-b border-border bg-muted/30">
        <div className="flex items-center">
          {openFiles.map((file) => (
            <div
              key={file.id}
              className={`
                flex items-center gap-2 px-3 py-2 text-sm border-r border-border cursor-pointer
                transition-colors hover:bg-muted/50
                ${file.active ? 'bg-card text-foreground' : 'bg-muted/30 text-muted-foreground'}
              `}
              onClick={() => setActiveFileId(file.id)}
            >
              <span>{file.name}</span>
              {file.modified && (
                <div className="h-2 w-2 rounded-full bg-accent" />
              )}
              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 hover:bg-muted">
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          defaultValue={mockCode}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            rulers: [80],
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: false,
            folding: true,
            foldingStrategy: 'auto',
            showFoldingControls: 'always',
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
          }}
        />
        
        {/* Diff Overlay (when active) */}
        {false && (
          <div className="absolute inset-x-0 bottom-0 bg-card border-t border-border p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="destructive">- old line</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">+ new line</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="default">Accept</Button>
                <Button size="sm" variant="outline">Reject</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}