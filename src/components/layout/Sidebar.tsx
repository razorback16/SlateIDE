import { useState, useEffect, useRef } from 'react'
import { useStore } from '@nanostores/react'
import {
  $activeView,
  $sidebarExpanded,
  navigationItems,
  setActiveView,
  ViewType,
} from '#/context/ide.store'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
  const activeView = useStore($activeView)
  const sidebarExpanded = useStore($sidebarExpanded)
  const isHoveredRef = useRef(false)

  // Expand sidebar on hover, collapse on leave
  const handleMouseEnter = () => {
    isHoveredRef.current = true
    $sidebarExpanded.set(true)
  }

  const handleMouseLeave = () => {
    isHoveredRef.current = false
    // Use setTimeout to allow for smooth transition and prevent flickering
    setTimeout(() => {
      if (!isHoveredRef.current) {
        $sidebarExpanded.set(false)
      }
    }, 150)
  }

  const handleItemClick = (viewId: ViewType) => {
    setActiveView(viewId)
    // Keep sidebar expanded briefly after selection, then collapse if not hovered
    setTimeout(() => {
      if (!isHoveredRef.current) {
        $sidebarExpanded.set(false)
      }
    }, 300)
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
      className={`${
        sidebarExpanded ? 'w-70' : 'w-16'
      } flex flex-col border-sidebar-border/50 border-r bg-sidebar/95 backdrop-blur-xl transition-all duration-300 ease-in-out`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="flex flex-1 flex-col space-y-1 px-2 py-3">
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
      </nav>
    </aside>
  )
}

export default Sidebar
