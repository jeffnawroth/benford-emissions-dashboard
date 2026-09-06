'use client'

import type { BenfordAnalysisOk } from '@benford/stats'
import { useState } from 'react'
import { DistributionChart } from '@/components/dashboard/distribution-chart'
import { DistributionTable } from '@/components/dashboard/distribution-table'
import { SegmentedControl } from '@/components/ui/segmented-control'

export function DistributionView({ analysis }: { analysis: BenfordAnalysisOk }) {
  const [view, setView] = useState<'chart' | 'table'>('chart')

  return (
    <div>
      <SegmentedControl
        value={view}
        onValueChange={setView}
        aria-label="Chart or table view"
        className="mb-3"
        options={[
          { value: 'chart', label: 'Chart' },
          { value: 'table', label: 'Table' },
        ]}
      />

      {view === 'chart' ? <DistributionChart analysis={analysis} /> : <DistributionTable analysis={analysis} />}
    </div>
  )
}
