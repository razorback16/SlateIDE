import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import { ViewType } from '#/stores/ide.store'

interface SidebarItemProps {
  id: ViewType
  icon: LucideIcon
  label: string
  badge?: number
  active: boolean
  expanded: boolean
  onClick: () => void
}

const sidebarButtonVariants = cva('h-12 font-normal text-sm', {
  variants: {
    view: {
      codebase: '',
      chat: '',
      mcp: '',
      models: '',
      agents: '',
      hooks: '',
      git: '',
    },
    active: {
      true: '',
      false: '',
    },
    expanded: {
      true: 'justify-start',
      false: 'justify-center',
    },
  },
  compoundVariants: [
    {
      view: 'codebase',
      active: true,
      className: 'bg-[var(--sidebar-codebase-bg)]',
    },
    {
      view: 'chat',
      active: true,
      className: 'bg-[var(--sidebar-chat-bg)]',
    },
    {
      view: 'mcp',
      active: true,
      className: 'bg-[var(--sidebar-mcp-bg)]',
    },
    {
      view: 'models',
      active: true,
      className: 'bg-[var(--sidebar-models-bg)]',
    },
    {
      view: 'agents',
      active: true,
      className: 'bg-[var(--sidebar-agents-bg)]',
    },
    {
      view: 'hooks',
      active: true,
      className: 'bg-[var(--sidebar-hooks-bg)]',
    },
    {
      view: 'git',
      active: true,
      className: 'bg-[var(--sidebar-git-bg)]',
    },
  ],
})

const iconColorVariants = cva('flex flex-shrink-0 items-center justify-center', {
  variants: {
    view: {
      codebase: 'text-blue-500',
      chat: 'text-green-500',
      mcp: 'text-purple-500',
      models: 'text-yellow-500',
      agents: 'text-orange-500',
      hooks: 'text-pink-500',
      git: 'text-red-500',
    },
    expanded: {
      true: 'mr-3',
      false: '',
    },
  },
})

const SidebarItem = (props: SidebarItemProps) => {
  const IconComponent = props.icon

  return (
    <Button
      variant="ghost"
      onClick={props.onClick}
      className={cn(
        sidebarButtonVariants({
          view: props.id as any,
          active: props.active,
          expanded: props.expanded,
        })
      )}
      title={props.label}
    >
      <span
        className={cn(
          iconColorVariants({
            view: props.id as any,
            expanded: props.expanded,
          })
        )}
      >
        <IconComponent className="size-6" strokeWidth={2} />
      </span>

      {props.expanded && (
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{props.label}</span>
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
