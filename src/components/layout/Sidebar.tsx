import { Component, For, createSignal, onMount } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { 
  $activeView, 
  $sidebarExpanded,
  navigationItems,
  setActiveView,
  ViewType
} from '#/stores/ide.store'
import SidebarItem from './SidebarItem'

const Sidebar: Component = () => {
  const activeView = useStore($activeView)
  const sidebarExpanded = useStore($sidebarExpanded)
  const [hovered, setHovered] = createSignal(false)
  
  // Expand sidebar on hover, collapse on leave
  const handleMouseEnter = () => {
    setHovered(true)
    if (!sidebarExpanded()) {
      $sidebarExpanded.set(true)
    }
  }
  
  const handleMouseLeave = () => {
    setHovered(false)
    if (!hovered()) {
      $sidebarExpanded.set(false)
    }
  }

  const handleItemClick = (viewId: ViewType) => {
    setActiveView(viewId)
  }

  // Add keyboard shortcuts
  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘1-7 for switching views
      if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '7') {
        e.preventDefault()
        const index = parseInt(e.key) - 1
        if (navigationItems[index]) {
          setActiveView(navigationItems[index].id)
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <aside
      class={`ide-sidebar ${sidebarExpanded() ? 'expanded' : 'collapsed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav class="sidebar-nav">
        <div class="flex-1">
          <For each={navigationItems.slice(0, -1)}>
            {(item) => (
              <SidebarItem
                id={item.id}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                active={activeView() === item.id}
                expanded={sidebarExpanded()}
                onClick={() => handleItemClick(item.id)}
              />
            )}
          </For>
        </div>
        
        {/* Settings at bottom */}
        <div class="border-t border-subtle pt-2 mt-2">
          <SidebarItem
            id={navigationItems[navigationItems.length - 1].id}
            icon={navigationItems[navigationItems.length - 1].icon}
            label={navigationItems[navigationItems.length - 1].label}
            active={activeView() === 'settings'}
            expanded={sidebarExpanded()}
            onClick={() => handleItemClick('settings')}
          />
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar