import type { NormalizedDataset } from '@/lib/types'
import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useDashboardStore } from '@/store/dashboard-store'
import { useDefaultOwidSelection } from './use-benford-analysis'

const dataset: NormalizedDataset = {
  name: 'Test dataset',
  unit: 'tonnes',
  citation: 'Test citation',
  countries: [
    { id: 1, name: 'Alpha', code: 'ALP' },
    { id: 2, name: 'Beta', code: 'BET' },
    { id: 3, name: 'Gamma', code: 'GAM' },
  ],
  years: [2018, 2019, 2021, 2020],
  records: [],
}

describe('useDefaultOwidSelection', () => {
  beforeEach(() => {
    useDashboardStore.setState({
      selectedCountryIds: new Set(),
      selectedYear: null,
    })
  })

  it('selects every country and the latest year when the selection is empty', () => {
    renderHook(() => useDefaultOwidSelection(dataset))

    const state = useDashboardStore.getState()
    expect(state.selectedCountryIds).toEqual(new Set([1, 2, 3]))
    expect(state.selectedYear).toBe(2021)
  })

  it('does nothing when a dataset has not loaded yet', () => {
    renderHook(() => useDefaultOwidSelection(undefined))

    const state = useDashboardStore.getState()
    expect(state.selectedCountryIds.size).toBe(0)
    expect(state.selectedYear).toBeNull()
  })

  it('leaves an existing selection alone', () => {
    useDashboardStore.setState({ selectedCountryIds: new Set([2]), selectedYear: 2019 })

    renderHook(() => useDefaultOwidSelection(dataset))

    const state = useDashboardStore.getState()
    expect(state.selectedCountryIds).toEqual(new Set([2]))
    expect(state.selectedYear).toBe(2019)
  })
})
