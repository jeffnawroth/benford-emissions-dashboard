import type { NormalizedDataset } from '@/lib/types'
import { analyzeBenford } from '@benford/stats'
import { useEffect, useMemo } from 'react'
import { useEmissionsDataset } from '@/hooks/use-emissions-dataset'
import { useDashboardStore } from '@/store/dashboard-store'

/**
 * Default to every country selected through the latest available year, so a
 * cold page load clears the stats core's minimum-sample-size guards instead
 * of landing on "insufficient data". Re-applies whenever the emission type
 * changes (that reset clears selectedCountryIds, which is exactly the signal
 * to re-default). The old app defaulted to a single country, which is well
 * under the firstDigit test's n>=300 threshold on its own.
 */
export function useDefaultOwidSelection(dataset: NormalizedDataset | undefined) {
  const selectedCountryIds = useDashboardStore(state => state.selectedCountryIds)
  const setSelectedCountryIds = useDashboardStore(state => state.setSelectedCountryIds)
  const setSelectedYear = useDashboardStore(state => state.setSelectedYear)

  useEffect(() => {
    if (!dataset || selectedCountryIds.size > 0)
      return
    setSelectedCountryIds(dataset.countries.map(country => country.id))
    setSelectedYear(Math.max(...dataset.years))
  }, [dataset, selectedCountryIds.size, setSelectedCountryIds, setSelectedYear])
}

export function useBenfordAnalysis() {
  const dataSource = useDashboardStore(state => state.dataSource)
  const selectedCountryIds = useDashboardStore(state => state.selectedCountryIds)
  const selectedYear = useDashboardStore(state => state.selectedYear)
  const testType = useDashboardStore(state => state.testType)
  const uploadedDataset = useDashboardStore(state => state.uploadedDataset)
  const emissionKind = useDashboardStore(state => state.emissionKind)

  const emissionsQuery = useEmissionsDataset(emissionKind)
  const dataset = dataSource === 'owid' ? emissionsQuery.data : undefined

  useDefaultOwidSelection(dataset)

  const values = useMemo(() => {
    if (dataSource === 'upload')
      return uploadedDataset?.values ?? []

    if (!dataset || selectedYear === null)
      return []

    const result: number[] = []
    for (const record of dataset.records) {
      if (
        selectedCountryIds.has(record.countryId)
        && record.year <= selectedYear
        && record.value !== 0
      ) {
        result.push(record.value)
      }
    }
    return result
  }, [dataSource, uploadedDataset, dataset, selectedCountryIds, selectedYear])

  const analysis = useMemo(() => analyzeBenford(values, testType), [values, testType])

  return {
    emissionsQuery,
    dataset,
    values,
    analysis,
  }
}
