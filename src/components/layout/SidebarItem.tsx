import { Component, Show } from 'solid-js'
import { ViewType } from '#/stores/ide.store'

interface SidebarItemProps {
  id: ViewType
  icon: string
  label: string
  badge?: number
  active: boolean
  expanded: boolean
  onClick: () => void
}

const SidebarItem: Component<SidebarItemProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      class={`sidebar-item ${props.active ? 'active' : ''}`}
      title={props.label}
    >
      <span class="sidebar-item-icon">{props.icon}</span>
      <span class="sidebar-item-label">{props.label}</span>
      
      <Show when={props.badge && props.badge > 0}>
        <span class="sidebar-item-badge">
          {props.badge > 99 ? '99+' : props.badge}
        </span>
      </Show>
    </button>
  )
}

export default SidebarItem