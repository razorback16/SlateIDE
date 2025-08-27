import { ViewType } from '#/stores/ide.store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  id: ViewType
  icon: LucideIcon
  label: string
  badge?: number
  active: boolean
  expanded: boolean
  onClick: () => void
}

const SidebarItem = (props: SidebarItemProps) => {
  const IconComponent = props.icon
  
  // Define colors and background colors for each icon type
  const getIconStyles = (id: string, active: boolean) => {
    const styles = {
      codebase: {
        color: 'text-blue-500',
        bg: active ? 'bg-blue-100 dark:bg-blue-900/30' : ''
      },
      chat: {
        color: 'text-green-500',
        bg: active ? 'bg-green-100 dark:bg-green-900/30' : ''
      },
      mcp: {
        color: 'text-purple-500',
        bg: active ? 'bg-purple-100 dark:bg-purple-900/30' : ''
      },
      agents: {
        color: 'text-orange-500',
        bg: active ? 'bg-orange-100 dark:bg-orange-900/30' : ''
      },
      hooks: {
        color: 'text-pink-500',
        bg: active ? 'bg-pink-100 dark:bg-pink-900/30' : ''
      },
      git: {
        color: 'text-red-500',
        bg: active ? 'bg-red-100 dark:bg-red-900/30' : ''
      }
    }
    return styles[id as keyof typeof styles] || { color: 'text-gray-500', bg: '' }
  }
  
  const iconStyles = getIconStyles(props.id, props.active)
  
  return (
    <Button
      variant="ghost"
      onClick={props.onClick}
      className={`h-12 text-sm font-normal ${props.expanded ? 'justify-start' : 'justify-center'} ${iconStyles.bg}`}
      title={props.label}
    >
      <span className={`${props.expanded ? 'mr-3' : ''} flex items-center justify-center flex-shrink-0 ${iconStyles.color}`}>
        <IconComponent className="size-6" strokeWidth={2} />
      </span>
      
      {props.expanded && (
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          {props.label}
        </span>
      )}

      {props.badge && props.badge > 0 && props.expanded && (
        <Badge variant="secondary" className="ml-auto">
          {props.badge > 99 ? '99+' : props.badge}
        </Badge>
      )}
    </Button>
  )
}

export default SidebarItem
