'use client'

import type { BenfordAnalysisOk } from '@benford/stats'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Tooltip as ChartTooltip,
  Legend,
  LinearScale,
  Title,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { digitLabels } from '@/lib/digit-labels'

ChartJS.register(Title, ChartTooltip, Legend, BarElement, CategoryScale, LinearScale)

export function DistributionChart({ analysis }: { analysis: BenfordAnalysisOk }) {
  const labels = digitLabels(analysis.testType, analysis.observedProportions.length)

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: 'Expected',
            data: analysis.expectedProportions.map(p => p * 100),
            backgroundColor: 'oklch(0.62 0.19 260 / 0.5)',
          },
          {
            label: 'Observed',
            data: analysis.observedProportions.map(p => p * 100),
            backgroundColor: 'oklch(0.62 0.19 260)',
          },
        ],
      }}
      options={{
        responsive: true,
        scales: {
          y: {
            title: { display: true, text: '% of values' },
          },
        },
      }}
    />
  )
}
