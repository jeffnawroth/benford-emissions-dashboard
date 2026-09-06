import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
  {
    variants: {
      variant: {
        'success': 'bg-success text-success-foreground',
        'success-muted': 'bg-success-muted text-success',
        'warning': 'bg-warning-muted text-warning',
        'error': 'bg-error-muted text-error',
        'info': 'bg-accent-muted text-accent',
        'neutral': 'bg-surface-elevated text-muted-foreground border border-border',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
