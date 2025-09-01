'use client'

import { cn } from '@/lib/utils'
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
  type PanelGroupProps,
  type PanelProps,
  type PanelResizeHandleProps,
} from 'react-resizable-panels'

export function ResizablePanelGroup({ className, ...props }: PanelGroupProps) {
  return <PanelGroup className={cn('flex', className)} {...props} />
}

export function ResizablePanel({ className, ...props }: PanelProps) {
  return <Panel className={cn(className)} {...props} />
}

export function ResizableHandle({ className, ...props }: PanelResizeHandleProps) {
  return <PanelResizeHandle className={cn('bg-border w-px', className)} {...props} />
}
