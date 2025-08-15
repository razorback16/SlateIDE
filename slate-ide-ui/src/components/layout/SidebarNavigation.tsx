import { 
  FolderOpen, 
  MessageCircle, 
  Plug, 
  Bot, 
  Link, 
  GitBranch, 
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type ViewType = 'codebase' | 'chat' | 'mcp' | 'sub-agents' | 'hooks' | 'git' | 'settings'

interface SidebarItem {
  id: ViewType
  label: string
  icon: React.ElementType
  badge?: number
  isActive?: boolean
}

const sidebarItems: SidebarItem[] = [
  { id: 'codebase', label: 'Codebase', icon: FolderOpen },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'mcp', label: 'MCP', icon: Plug, badge: 3 },
  { id: 'sub-agents', label: 'Sub-agents', icon: Bot, badge: 2 },
  { id: 'hooks', label: 'Hooks', icon: Link },
  { id: 'git', label: 'Git', icon: GitBranch, badge: 5 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

interface SidebarNavigationProps {
  activeView?: ViewType
  onViewChange?: (view: ViewType) => void
}

export function SidebarNavigation({ 
  activeView = 'codebase', 
  onViewChange 
}: SidebarNavigationProps) {

  const handleItemClick = (viewId: ViewType) => {
    onViewChange?.(viewId)
  }

  return (
    <nav className="h-full relative w-full">
      <div className="py-3 px-2 space-y-2 sidebar-nav-container">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start p-3 h-12 ide-sidebar-item sidebar-button",
                isActive && "active"
              )}
              onClick={() => handleItemClick(item.id)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-accent-foreground")} />
                
                {/* Labels - hidden by default, shown on sidebar hover */}
                <span className="sidebar-label font-medium text-sm whitespace-nowrap overflow-hidden">
                  {item.label}
                </span>
                
                {/* Badges - hidden by default, shown on sidebar hover */}
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="sidebar-badge ml-auto h-5 min-w-5 text-xs px-1.5 lm-badge"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Button>
          )
        })}
      </div>
      
      {/* Subtle expand indicator - only visible when not hovered */}
      <div className="sidebar-indicator absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="w-1 h-8 rounded-full" style={{backgroundColor: 'var(--color-border-subtle)'}}></div>
      </div>
    </nav>
  )
}