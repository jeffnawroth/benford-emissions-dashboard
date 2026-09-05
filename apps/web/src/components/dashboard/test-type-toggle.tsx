'use client'

import type { BenfordTestType } from '@benford/stats'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useDashboardStore } from '@/store/dashboard-store'

const OPTIONS: { value: BenfordTestType, label: string }[] = [
  { value: 'firstDigit', label: 'First digit' },
  { value: 'secondDigit', label: 'Second digit' },
  { value: 'firstTwoDigits', label: 'First two digits' },
]

export function TestTypeToggle() {
  const testType = useDashboardStore(state => state.testType)
  const setTestType = useDashboardStore(state => state.setTestType)

  return (
    <ToggleGroup.Root
      type="single"
      value={testType}
      onValueChange={(value) => {
        if (value)
          setTestType(value as BenfordTestType)
      }}
      className="inline-flex overflow-hidden rounded-md border border-border"
    >
      {OPTIONS.map(option => (
        <ToggleGroup.Item
          key={option.value}
          value={option.value}
          className="px-3 py-1.5 text-sm data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        >
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
