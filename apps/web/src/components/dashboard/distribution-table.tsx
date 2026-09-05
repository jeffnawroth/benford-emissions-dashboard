'use client'

import type { BenfordAnalysisOk } from '@benford/stats'
import { digitLabels } from '@/lib/digit-labels'

function formatPercent(value: number) {
  return `${(value * 100).toFixed(2)}%`
}

export function DistributionTable({ analysis }: { analysis: BenfordAnalysisOk }) {
  const labels = digitLabels(analysis.testType, analysis.observedProportions.length)

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-muted-foreground">
          <th className="py-1.5 font-medium">Digit</th>
          <th className="py-1.5 font-medium">Expected</th>
          <th className="py-1.5 font-medium">Observed</th>
          <th className="py-1.5 font-medium">Deviation</th>
        </tr>
      </thead>
      <tbody>
        {labels.map((label, i) => {
          const expected = analysis.expectedProportions[i]!
          const observed = analysis.observedProportions[i]!
          const deviation = observed - expected
          return (
            <tr key={label} className="border-b border-border/50">
              <td className="py-1">{label}</td>
              <td className="py-1">{formatPercent(expected)}</td>
              <td className="py-1">{formatPercent(observed)}</td>
              <td className={`py-1 ${deviation > 0 ? 'text-positive' : deviation < 0 ? 'text-negative' : ''}`}>
                {deviation >= 0 ? '+' : ''}
                {formatPercent(deviation)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
