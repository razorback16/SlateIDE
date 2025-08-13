import { Search, Settings, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function HeaderBar() {
  return (
    <header className="h-12 px-4 flex items-center justify-between glass-subtle border-b border-white/10 mb-4 mx-4 mt-4 rounded-lg">
      {/* Left: Logo/Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">Slate IDE</span>
        </div>
      </div>
      
      {/* Center: Session breadcrumb and quick actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>AuthProject</span>
          <span>›</span>
          <span>Session #12</span>
          <span>›</span>
          <span className="text-foreground">Branch: feature-auth</span>
        </div>
        
        <Separator orientation="vertical" className="h-4" />
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="btn-glass">Resume</Button>
          <Button variant="ghost" size="sm" className="btn-glass">Branch</Button>
          <Button variant="ghost" size="sm" className="btn-glass">New Session</Button>
        </div>
      </div>
      
      {/* Right: Command palette trigger, status indicators, user avatar */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="btn-glass flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm">⌘K</span>
        </Button>
        
        <Separator orientation="vertical" className="h-4" />
        
        {/* Status indicators */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="ide-status-indicator online">
            <div className="h-2 w-2 rounded-full bg-green-400 mr-1" />
            3 MCP
          </Badge>
          <Badge variant="outline" className="ide-status-indicator">
            <div className="h-2 w-2 rounded-full bg-blue-400 mr-1" />
            2 Agents
          </Badge>
        </div>
        
        <Separator orientation="vertical" className="h-4" />
        
        <Button variant="ghost" size="sm" className="btn-glass">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}