import { defineStore } from 'pinia'
import benfordsLawDistribution from '@/benfordsLawDistribution'

interface CO2EmissionData {
  country: string
  iso_code: string
  year: number
  co2: number
}

interface GHGEmissionData {
  country: string
  iso_code: string
  year: number
  total_ghg: number
}

export const useCountryEmissionStore = defineStore('countryEmission', () => {
  const rawCo2EmissionsData = ref<CO2EmissionData[]>([])
  const rawGhgEmissionsData = ref<GHGEmissionData[]>([])
  const loading = ref(false)
  const selectedCountries = ref<Set<string>>(new Set())
  const selectedEmissionType = ref('CO₂')
  const selectedYear = ref(0)

  // Computed properties

  // Get the raw emissions data based on the selected type
  const rawSelectedEmissionTypeEmissions = computed(() => selectedEmissionType.value === 'CO₂' ? rawCo2EmissionsData.value : rawGhgEmissionsData.value)

  // Filter out invalid data
  const validCo2EmissionsData = computed(() => rawCo2EmissionsData.value.filter(data => data.iso_code))
  const validGhgEmissionsData = computed(() => rawGhgEmissionsData.value.filter(data => data.iso_code))

  // Get the emissions data based on the selected type
  const validSelectedEmissionTypeEmissions = computed(() => selectedEmissionType.value === 'CO₂' ? validCo2EmissionsData.value : validGhgEmissionsData.value)

  // Get a list of countries from the emissions data
  const countries = computed(() => [...new Set(validSelectedEmissionTypeEmissions.value.map(data => data.country))])

  // Get a list of CO2 emissions from the selected countries
  const filteredCo2Emissions = computed(() => {
    return rawCo2EmissionsData.value
      .filter(data => selectedCountries.value.has(data.country) && data.year >= selectedYear.value)
      .map(data => data.co2)
      .filter(co2 => co2 !== null && co2 !== undefined)
  })

  // Get a list of GHG emissions from the selected countries
  const filteredGhgEmissions = computed(() => {
    return rawGhgEmissionsData.value
      .filter(data => selectedCountries.value.has(data.country) && data.year >= selectedYear.value)
      .map(data => data.total_ghg)
      .filter(ghg => ghg !== null && ghg !== undefined)
  })

  // Get the emissions to be displayed based on the selected type
  const filteredSelectedEmissionTypeEmissions = computed(() => selectedEmissionType.value === 'CO₂' ? filteredCo2Emissions.value : filteredGhgEmissions.value)

  // Get the Benford's Law distribution of the filtered selected emissions
  const benfordsDistributionData = computed(() => benfordsLawDistribution(filteredSelectedEmissionTypeEmissions.value))

  // Methods

  const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'

  // Fetch emissions data from the API
  async function fetchCO2EmissionsData() {
    try {
      loading.value = true
      const response = await fetch(`${URL}/co2_emissions`)
      const data = await response.json()
      rawCo2EmissionsData.value = data
    }
    catch (e) {
      console.error(e)
    }
    finally {
      loading.value = false
    }
  }

  // Fetch emissions data from the API
  async function fetchGHGEmissionsData() {
    try {
      loading.value = true
      const response = await fetch(`${URL}/ghg_emissions`)
      const data = await response.json()
      rawGhgEmissionsData.value = data
    }
    catch (e) {
      console.error(e)
    }
    finally {
      loading.value = false
    }
  }

  return { fetchCO2EmissionsData, fetchGHGEmissionsData, rawCo2EmissionsData, rawGhgEmissionsData, loading, countries, filteredCo2Emissions, filteredGhgEmissions, selectedCountries, selectedEmissionType, validSelectedEmissionTypeEmissions, filteredSelectedEmissionTypeEmissions, selectedYear, benfordsDistributionData, rawSelectedEmissionTypeEmissions }
})
