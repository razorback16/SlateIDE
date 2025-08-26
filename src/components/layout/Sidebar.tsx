import { useState, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import {
  $activeView,
  $sidebarExpanded,
  navigationItems,
  setActiveView,
  ViewType,
} from '#/stores/ide.store'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
  const activeView = useStore($activeView)
  const sidebarExpanded = useStore($sidebarExpanded)
  const [hovered, setHovered] = useState(false)

  // Expand sidebar on hover, collapse on leave
  const handleMouseEnter = () => {
    setHovered(true)
    if (!sidebarExpanded) {
      $sidebarExpanded.set(true)
    }
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (!hovered) {
      $sidebarExpanded.set(false)
    }
  }

  const handleItemClick = (viewId: ViewType) => {
    setActiveView(viewId)
  }

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘1-7 for switching views
      if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '7') {
        e.preventDefault()
        const index = Number.parseInt(e.key) - 1
        if (navigationItems[index]) {
          setActiveView(navigationItems[index].id)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <aside
      className={`ide-sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="sidebar-nav">
        <div className="flex-1">
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              active={activeView === item.id}
              expanded={sidebarExpanded}
              onClick={() => handleItemClick(item.id)}
            />
          ))}
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
