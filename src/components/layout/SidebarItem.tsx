import { ViewType } from '#/stores/ide.store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SidebarItemProps {
  id: ViewType
  icon: string
  label: string
  badge?: number
  active: boolean
  expanded: boolean
  onClick: () => void
}

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <Button
      variant={props.active ? 'default' : 'ghost'}
      onClick={props.onClick}
      className={`sidebar-item ${props.active ? 'active' : ''} justify-start`}
      title={props.label}
    >
      <span className="sidebar-item-icon">{props.icon}</span>
      <span className="sidebar-item-label">{props.label}</span>

      {props.badge && props.badge > 0 && (
        <Badge variant="secondary" className="sidebar-item-badge ml-auto">
          {props.badge > 99 ? '99+' : props.badge}
        </Badge>
      )}
    </Button>
  )
}

export default SidebarItem
