import type { BenfordTestType } from '@benford/stats'
import type { EmissionKind, UploadedDataset } from '@/lib/types'
import { create } from 'zustand'

export type DataSource = 'owid' | 'upload'

interface DashboardState {
  dataSource: DataSource
  emissionKind: EmissionKind
  selectedCountryIds: Set<number>
  selectedYear: number | null
  testType: BenfordTestType
  uploadedDataset: UploadedDataset | null

  setDataSource: (source: DataSource) => void
  setEmissionKind: (kind: EmissionKind) => void
  toggleCountry: (id: number) => void
  setSelectedCountryIds: (ids: number[]) => void
  setSelectedYear: (year: number) => void
  setTestType: (type: BenfordTestType) => void
  setUploadedDataset: (dataset: UploadedDataset | null) => void
}

export const useDashboardStore = create<DashboardState>(set => ({
  dataSource: 'owid',
  emissionKind: 'co2',
  selectedCountryIds: new Set(),
  selectedYear: null,
  testType: 'firstDigit',
  uploadedDataset: null,

  setDataSource: source => set({ dataSource: source }),

  setEmissionKind: kind => set({
    emissionKind: kind,
    selectedCountryIds: new Set(),
    selectedYear: null,
  }),

  toggleCountry: id => set((state) => {
    const next = new Set(state.selectedCountryIds)
    if (next.has(id))
      next.delete(id)
    else
      next.add(id)
    return { selectedCountryIds: next }
  }),

  setSelectedCountryIds: ids => set({ selectedCountryIds: new Set(ids) }),

  setSelectedYear: year => set({ selectedYear: year }),

  setTestType: type => set({ testType: type }),

  setUploadedDataset: dataset => set({
    uploadedDataset: dataset,
    dataSource: dataset ? 'upload' : 'owid',
  }),
}))
