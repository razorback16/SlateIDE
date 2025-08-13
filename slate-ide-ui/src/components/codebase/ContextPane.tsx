import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Hash, 
  Zap, 
  Package, 
  ExternalLink, 
  FileText, 
  Users, 
  Clock 
} from 'lucide-react'

// Mock outline data
const outline = [
  { id: '1', name: 'authenticate', type: 'function', line: 3 },
  { id: '2', name: 'logout', type: 'function', line: 23 },
  { id: '3', name: 'Credentials', type: 'interface', line: 1 },
  { id: '4', name: 'User', type: 'type', line: 1 },
]

const relatedFiles = [
  { id: '1', name: 'login.ts', reason: 'Imports authenticate' },
  { id: '2', name: 'session.ts', reason: 'Uses logout function' },
  { id: '3', name: 'types.ts', reason: 'Defines User interface' },
]

const recentActivity = [
  { id: '1', action: 'Modified', file: 'auth.ts', time: '2 min ago', user: 'You' },
  { id: '2', action: 'Created', file: 'user.ts', time: '15 min ago', user: 'You' },
  { id: '3', action: 'Deleted', file: 'old-auth.ts', time: '1 hour ago', user: 'You' },
]

export function ContextPane() {
  return (
    <div className="ide-panel h-full">
      <Tabs defaultValue="outline" className="h-full">
        <div className="p-3 border-b border-border">
          <TabsList className="grid w-full grid-cols-3 h-8">
            <TabsTrigger value="outline" className="text-xs">Outline</TabsTrigger>
            <TabsTrigger value="related" className="text-xs">Related</TabsTrigger>
            <TabsTrigger value="activity" className="text-xs">Activity</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="outline" className="h-full m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-3 space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Functions
                </h4>
                <div className="space-y-1">
                  {outline.filter(item => item.type === 'function').map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-muted/50 cursor-pointer"
                    >
                      <Hash className="h-3 w-3 text-blue-400" />
                      <span className="text-sm flex-1">{item.name}</span>
                      <span className="text-xs text-muted-foreground">:{item.line}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Types
                </h4>
                <div className="space-y-1">
                  {outline.filter(item => item.type !== 'function').map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-muted/50 cursor-pointer"
                    >
                      <Hash className="h-3 w-3 text-green-400" />
                      <span className="text-sm flex-1">{item.name}</span>
                      <Badge variant="outline" className="text-xs h-4">
                        {item.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="related" className="h-full m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-3 space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Related Files
                </h4>
                <div className="space-y-1">
                  {relatedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-start gap-2 px-2 py-2 rounded hover:bg-muted/50 cursor-pointer"
                    >
                      <FileText className="h-4 w-4 text-blue-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{file.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="activity" className="h-full m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-3 space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent Activity
                </h4>
                <div className="space-y-2">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-2 px-2 py-2 rounded hover:bg-muted/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Badge variant="outline" className="text-xs h-4">
                            {activity.action}
                          </Badge>
                          <span className="font-medium">{activity.file}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Users className="h-3 w-3" />
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}