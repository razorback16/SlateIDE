import { Search, Settings, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function HeaderBar() {
  return (
    <header className="lm-header mb-4 mx-4 mt-4 rounded-lg">
      {/* Left: Logo/Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg lm-text-primary">Slate IDE</span>
        </div>
      </div>
      
      {/* Center: Session breadcrumb and quick actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm lm-text-muted">
          <span>AuthProject</span>
          <span>›</span>
          <span>Session #12</span>
          <span>›</span>
          <span className="lm-text-primary">Branch: feature-auth</span>
        </div>
        
        <Separator orientation="vertical" className="h-4" />
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="lm-btn-ghost">Resume</Button>
          <Button variant="ghost" size="sm" className="lm-btn-ghost">Branch</Button>
          <Button variant="ghost" size="sm" className="lm-btn-ghost">New Session</Button>
        </div>
      </div>
      
      {/* Right: Command palette trigger, status indicators, user avatar */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="lm-btn-ghost flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm">⌘K</span>
        </Button>
        
        <Separator orientation="vertical" className="h-4" />
        
        {/* Status indicators */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="lm-status-online lm-badge">
            <div className="h-2 w-2 rounded-full mr-1" style={{backgroundColor: 'var(--color-success)'}} />
            3 MCP
          </Badge>
          <Badge variant="outline" className="lm-badge">
            <div className="h-2 w-2 rounded-full mr-1" style={{backgroundColor: 'var(--color-info)'}} />
            2 Agents
          </Badge>
        </div>
        
        <Separator orientation="vertical" className="h-4" />
        
        <Button variant="ghost" size="sm" className="lm-btn-ghost">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}