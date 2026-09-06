import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { cn } from '@/lib/cn'

// Shared class strings so the data-source switch on the home page (which
// must stay a plain <button> pair — see app/page.tsx — because
// app/page.test.tsx asserts getByRole('button', ...) and Radix ToggleGroup
// renders role="radio", not role="button") can reuse the exact same visual
// language as the Radix-backed SegmentedControl below.
export const segmentedGroupClass = 'inline-flex overflow-hidden rounded-sm border border-border'
export const segmentedItemBaseClass = 'px-3 py-1.5 text-sm font-medium transition-colors'
export const segmentedItemActiveClass = 'bg-accent text-accent-foreground'
export const segmentedItemInactiveClass = 'text-foreground hover:bg-surface-elevated'

interface SegmentedControlOption<T extends string> {
  value: T
  label: React.ReactNode
}

interface SegmentedControlProps<T extends string> {
  'value': T
  'onValueChange': (value: T) => void
  'options': SegmentedControlOption<T>[]
  'aria-label': string
  'className'?: string
}

export function SegmentedControl<T extends string>({
  value,
  onValueChange,
  options,
  className,
  ...props
}: SegmentedControlProps<T>) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(next) => {
        if (next)
          onValueChange(next as T)
      }}
      aria-label={props['aria-label']}
      className={cn(segmentedGroupClass, className)}
    >
      {options.map(option => (
        <ToggleGroup.Item
          key={option.value}
          value={option.value}
          className={cn(
            segmentedItemBaseClass,
            'data-[state=off]:text-foreground data-[state=off]:hover:bg-surface-elevated data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
          )}
        >
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
