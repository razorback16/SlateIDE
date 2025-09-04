import { cn } from '@/lib/utils'

export type GitStatus = 'modified' | 'added' | 'deleted' | 'renamed' | 'untracked' | 'error' | null

interface StatusIndicatorProps {
  status: GitStatus
  hasErrors?: boolean
  className?: string
}

const statusConfig = {
  modified: {
    color: 'bg-orange-500',
    title: 'Modified',
  },
  added: {
    color: 'bg-green-500',
    title: 'Added (new file)',
  },
  deleted: {
    color: 'bg-red-500',
    title: 'Deleted',
  },
  renamed: {
    color: 'bg-blue-500',
    title: 'Renamed',
  },
  untracked: {
    color: 'bg-green-400',
    title: 'Untracked (new file)',
  },
  error: {
    color: 'bg-red-500',
    title: 'Has errors',
  },
} as const

export function StatusIndicator({ status, hasErrors, className }: StatusIndicatorProps) {
  // Prioritize error status over git status
  const displayStatus = hasErrors ? 'error' : status
  
  if (!displayStatus) return null

  const config = statusConfig[displayStatus]

  return (
    <div
      className={cn(
        'w-2 h-2 rounded-full flex-shrink-0',
        config.color,
        className
      )}
      title={config.title}
    />
  )
}