import type { Data, Metadata } from '@/types'
import benfordsLawDistribution from '@/benfordsLawDistribution'
import { defineStore } from 'pinia'

export const useCountryEmissionStore = defineStore('countryEmission', () => {
  const loading = ref(false)
  const selectedCountriesIds = ref<Set<number>>(new Set())
  const selectedEmissionType = ref({ id: 944146, shortHand: 'CO₂', title: 'Annual CO₂ emissions' })
  const selectedYear = ref(0)
  const metadata = ref<Metadata>({} as Metadata)
  const data = ref<Data>({ entities: [], years: [], values: [] })

  // Computed properties

  const filteredData = computed(() => {
    if (!data.value.entities.length) {
      return { entities: [], values: [], years: [] }
    }

    return data.value.entities.reduce<Data>((acc, entity, index) => {
      if (selectedCountriesIds.value.has(entity) && data.value.values[index] !== 0) {
        acc.entities.push(entity)
        acc.values.push(data.value.values[index])
        acc.years.push(data.value.years[index])
      }
      return acc
    }, { entities: [], values: [], years: [] })
  })

  // Get the Benford's Law distribution of the filtered selected emissions
  const benfordsDistributionData = computed(() => {
    // if (!filteredData.value.values.length) {
    // return [] // Keine Berechnung, wenn es keine Werte gibt
    // }
    return benfordsLawDistribution(filteredData.value.values)
  })

  // Methods

  // Fetch emissions data from the API
  async function fetchData(id: number) {
    try {
      loading.value = true

      // Verwende Promise.all für parallele API-Aufrufe
      const [metadataResponse, dataResponse] = await Promise.all([
        fetch(`https://api.ourworldindata.org/v1/indicators/${id}.metadata.json`),
        fetch(`https://api.ourworldindata.org/v1/indicators/${id}.data.json`),
      ])

      // Überprüfe, ob beide Antworten erfolgreich waren
      if (!metadataResponse.ok) {
        throw new Error(`Failed to fetch metadata: ${metadataResponse.statusText}`)
      }

      if (!dataResponse.ok) {
        throw new Error(`Failed to fetch data: ${dataResponse.statusText}`)
      }

      // Beide JSON-Antworten verarbeiten
      [metadata.value, data.value] = await Promise.all([metadataResponse.json(), dataResponse.json()])
    }
    catch (error) {
      console.error('Error fetching data or metadata:', error)
    }
    finally {
      loading.value = false
    }
  }

  return { fetchData, loading, selectedCountriesIds, selectedYear, benfordsDistributionData, metadata, data, filteredData, selectedEmissionType }
})
