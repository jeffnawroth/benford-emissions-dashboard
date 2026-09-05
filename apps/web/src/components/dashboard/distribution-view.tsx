'use client'

import type { BenfordAnalysisOk } from '@benford/stats'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useState } from 'react'
import { DistributionChart } from '@/components/dashboard/distribution-chart'
import { DistributionTable } from '@/components/dashboard/distribution-table'

export function DistributionView({ analysis }: { analysis: BenfordAnalysisOk }) {
  const [view, setView] = useState<'chart' | 'table'>('chart')

  return (
    <div>
      <ToggleGroup.Root
        type="single"
        value={view}
        onValueChange={(value) => {
          if (value)
            setView(value as 'chart' | 'table')
        }}
        className="mb-3 inline-flex overflow-hidden rounded-md border border-border"
      >
        <ToggleGroup.Item value="chart" className="px-3 py-1 text-sm data-[state=on]:bg-accent data-[state=on]:text-accent-foreground">
          Chart
        </ToggleGroup.Item>
        <ToggleGroup.Item value="table" className="px-3 py-1 text-sm data-[state=on]:bg-accent data-[state=on]:text-accent-foreground">
          Table
        </ToggleGroup.Item>
      </ToggleGroup.Root>

      {view === 'chart' ? <DistributionChart analysis={analysis} /> : <DistributionTable analysis={analysis} />}
    </div>
  )
}
