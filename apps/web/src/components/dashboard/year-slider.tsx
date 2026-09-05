'use client'

import * as Slider from '@radix-ui/react-slider'
import { useMemo } from 'react'
import { useDashboardStore } from '@/store/dashboard-store'

export function YearSlider({ years }: { years: number[] }) {
  const selectedYear = useDashboardStore(state => state.selectedYear)
  const setSelectedYear = useDashboardStore(state => state.setSelectedYear)

  const { min, max } = useMemo(
    () => ({ min: Math.min(...years), max: Math.max(...years) }),
    [years],
  )

  const value = selectedYear ?? max

  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">
          Year cutoff:
          {' '}
          {value}
        </span>
        <span className="text-muted-foreground">
          {min}
          {' '}
          –
          {' '}
          {max}
        </span>
      </div>
      <Slider.Root
        className="relative flex h-5 w-full touch-none items-center"
        min={min}
        max={max}
        step={1}
        value={[value]}
        onValueChange={([next]) => {
          if (next !== undefined)
            setSelectedYear(next)
        }}
      >
        <Slider.Track className="relative h-1 grow rounded-full bg-border">
          <Slider.Range className="absolute h-full rounded-full bg-accent" />
        </Slider.Track>
        <Slider.Thumb className="block size-4 rounded-full bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Year cutoff" />
      </Slider.Root>
      <p className="mt-1 text-xs text-muted-foreground">
        Includes all data through
        {' '}
        {value}
        .
      </p>
    </div>
  )
}
