'use client'

import type { BenfordTestType } from '@benford/stats'
import { SegmentedControl } from '@/components/ui/segmented-control'
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
    <SegmentedControl<BenfordTestType>
      value={testType}
      onValueChange={setTestType}
      aria-label="Digit test type"
      options={OPTIONS}
    />
  )
}
