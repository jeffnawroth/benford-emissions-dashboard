'use client'

import type { BenfordAnalysisOk } from '@benford/stats'
import type { ChartData, ChartOptions } from 'chart.js'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Tooltip as ChartTooltip,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from 'chart.js'
import { useTheme } from 'next-themes'
import { Chart } from 'react-chartjs-2'
import { useChartTheme } from '@/hooks/use-chart-theme'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { digitLabels } from '@/lib/digit-labels'

ChartJS.register(Title, ChartTooltip, Legend, BarController, BarElement, LineController, LineElement, PointElement, CategoryScale, LinearScale)

export function DistributionChart({ analysis }: { analysis: BenfordAnalysisOk }) {
  const { resolvedTheme } = useTheme()
  const theme = useChartTheme()
  const reducedMotion = usePrefersReducedMotion()
  const labels = digitLabels(analysis.testType, analysis.observedProportions.length)

  const barBorderColors = analysis.zScores.map(z =>
    z.significantAt01 ? theme.flag01 : z.significantAt05 ? theme.flag05 : 'transparent')

  const options: ChartOptions<'bar'> = {
    responsive: true,
    animation: reducedMotion ? false : { duration: 220 },
    scales: {
      x: {
        grid: { color: theme.grid },
        ticks: { color: theme.axisText },
      },
      y: {
        title: { display: true, text: '% of values', color: theme.axisText },
        grid: { color: theme.grid },
        ticks: { color: theme.axisText },
      },
    },
    plugins: {
      legend: { labels: { color: theme.axisText } },
    },
  }

  // Chart.js supports mixing dataset types (a 'line' dataset on a 'bar'
  // chart) at runtime, but its TS types key ChartDataset to a single chart
  // type — cast is safe since the runtime rendering respects each dataset's
  // own `type` field regardless of the declared generic.
  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Expected (Benford)',
        data: analysis.expectedProportions.map(p => p * 100),
        borderColor: theme.expected,
        backgroundColor: 'transparent',
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.35,
      },
      {
        type: 'bar',
        label: 'Observed',
        data: analysis.observedProportions.map(p => p * 100),
        backgroundColor: theme.observed,
        borderColor: barBorderColors,
        borderWidth: 2,
      },
    ],
  } as unknown as ChartData<'bar'>

  return (
    <Chart
      key={resolvedTheme}
      type="bar"
      data={data}
      options={options}
    />
  )
}
