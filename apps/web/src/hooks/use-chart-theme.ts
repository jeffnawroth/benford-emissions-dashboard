'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export interface ChartTheme {
  observed: string
  expected: string
  grid: string
  axisText: string
  flag05: string
  flag01: string
}

// Hardcoded fallbacks are load-bearing, not decorative: (a) Chart.js/canvas
// cannot resolve var(--x) itself — getComputedStyle is mandatory — and
// (b) under Vitest/jsdom, getComputedStyle(...).getPropertyValue() returns
// '' because globals.css is never loaded into the test tree, so without a
// fallback Chart.js would receive an empty color string and render nothing.
const FALLBACK: Record<'light' | 'dark', ChartTheme> = {
  light: {
    observed: 'oklch(0.52 0.12 215)',
    expected: 'oklch(0.55 0.01 75 / 0.5)',
    grid: 'oklch(0.88 0.006 75 / 0.6)',
    axisText: 'oklch(0.5 0.01 75)',
    flag05: 'oklch(0.68 0.15 70)',
    flag01: 'oklch(0.55 0.2 25)',
  },
  dark: {
    observed: 'oklch(0.72 0.13 215)',
    expected: 'oklch(0.8 0.01 250 / 0.45)',
    grid: 'oklch(0.32 0.008 250 / 0.6)',
    axisText: 'oklch(0.68 0.01 250)',
    flag05: 'oklch(0.76 0.14 70)',
    flag01: 'oklch(0.68 0.19 25)',
  },
}

const VAR_NAMES: Record<keyof ChartTheme, string> = {
  observed: '--chart-observed',
  expected: '--chart-expected',
  grid: '--chart-grid',
  axisText: '--chart-axis-text',
  flag05: '--chart-flag-05',
  flag01: '--chart-flag-01',
}

export function useChartTheme(): ChartTheme {
  const { resolvedTheme } = useTheme()
  const mode = resolvedTheme === 'light' ? 'light' : 'dark'
  const [theme, setTheme] = useState<ChartTheme>(FALLBACK[mode])

  useEffect(() => {
    // next-themes flips the dark/light class on <html> synchronously on
    // toggle, but this effect can still run in the same tick as that class
    // change lands — defer one frame so getComputedStyle sees the settled
    // class, not a stale one.
    const raf = requestAnimationFrame(() => {
      const styles = getComputedStyle(document.documentElement)
      const read = (key: keyof ChartTheme) => {
        const value = styles.getPropertyValue(VAR_NAMES[key]).trim()
        return value.length > 0 ? value : FALLBACK[mode][key]
      }
      setTheme({
        observed: read('observed'),
        expected: read('expected'),
        grid: read('grid'),
        axisText: read('axisText'),
        flag05: read('flag05'),
        flag01: read('flag01'),
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [resolvedTheme, mode])

  return theme
}
