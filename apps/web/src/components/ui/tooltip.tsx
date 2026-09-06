'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export function TooltipContent({ className = '', ...props }: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={6}
        className={`z-50 max-w-xs rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground shadow-elevation-lg ${className}`}
        {...props}
      />
    </TooltipPrimitive.Portal>
  )
}
