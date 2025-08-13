import { File, FileText, Circle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

// Mock working set data
const workingFiles = [
  { id: 'auth.ts', name: 'auth.ts', modified: true, type: 'typescript' },
  { id: 'user.ts', name: 'user.ts', modified: false, type: 'typescript' },
  { id: 'api.ts', name: 'api.ts', modified: true, type: 'typescript' },
]

const aiSuggestedFiles = [
  { id: 'types.ts', name: 'types.ts', type: 'typescript', reason: 'Missing type definitions' },
  { id: 'config.ts', name: 'config.ts', type: 'typescript', reason: 'Configuration setup' },
]

export function WorkingSet() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-border">
        <h3 className="text-sm font-medium">Working Set</h3>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {/* Current Working Files */}
          {workingFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted/50 cursor-pointer group"
            >
              <div className="flex items-center gap-2 flex-1">
                {file.modified ? (
                  <div className="h-2 w-2 rounded-full bg-accent" />
                ) : (
                  <Circle className="h-3 w-3 text-muted-foreground" />
                )}
                <FileText className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{file.name}</span>
              </div>
              {file.modified && (
                <span className="text-xs text-muted-foreground">*</span>
              )}
            </div>
          ))}
          
          <Separator className="my-3" />
          
          {/* AI Suggested Files */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-2 py-1">
              <Sparkles className="h-3 w-3 text-accent" />
              <span className="text-xs font-medium text-muted-foreground">AI Suggested:</span>
            </div>
            
            {aiSuggestedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted/50 cursor-pointer group"
              >
                <Circle className="h-3 w-3 text-muted-foreground" />
                <FileText className="h-4 w-4 text-yellow-400" />
                <div className="flex-1">
                  <div className="text-sm">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{file.reason}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-12 text-xs opacity-0 group-hover:opacity-100"
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}