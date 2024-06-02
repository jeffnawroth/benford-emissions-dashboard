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
  const co2EmissionsData = ref<CO2EmissionData[]>([])
  const ghgEmissionsData = ref<GHGEmissionData[]>([])
  const loading = ref(false)
  const selectedCountries = ref<Set<string>>(new Set())
  const selectedEmissionType = ref('CO₂')
  const slider = ref(0)

  // Computed properties

  const selectedEmissions = computed(() => {
    return selectedEmissionType.value === 'CO₂' ? co2EmissionsData.value : ghgEmissionsData.value
  })

  // Get a list of countries from the emissions data
  const countries = computed(() => {
    const filteredData = selectedEmissions.value.filter(data => data.iso_code)
    return [...new Set(filteredData.map(data => data.country))]
  })

  // Get a list of years from the emissions data
  // TODO: Get years from selected countries only
  const years = computed(() => [...new Set(co2EmissionsData.value.map(data => data.year))].sort())

  // Get a list of CO2 emissions from the selected countries
  const selectedCo2Emissions = computed(() => {
    return co2EmissionsData.value.filter(data => selectedCountries.value.has(data.country) && data.year >= slider.value)
      .map(data => data.co2)
      .filter(co2 => co2 !== null && co2 !== undefined)
  })

  // Get a list of GHG emissions from the selected countries
  const selectedGhgEmissions = computed(() => {
    return ghgEmissionsData.value.filter(data => selectedCountries.value.has(data.country) && data.year >= slider.value)
      .map(data => data.total_ghg)
      .filter(ghg => ghg !== null && ghg !== undefined)
  })

  // Get the emissions to be displayed based on the selected type
  const displayedEmissions = computed(() => {
    return selectedEmissionType.value === 'CO₂' ? selectedCo2Emissions.value : selectedGhgEmissions.value
  })

  const benfordsDistribution = computed(() => {
    return benfordsLawDistribution(displayedEmissions.value)
  })

  // Methods

  const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  // Fetch emissions data from the API
  async function fetchCO2EmissionsData() {
    try {
      loading.value = true
      const response = await fetch(`${URL}/co2_emissions/`)
      const data = await response.json()
      co2EmissionsData.value = data
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
      const response = await fetch(`${URL}/ghg_emissions/`)
      const data = await response.json()
      ghgEmissionsData.value = data
    }
    catch (e) {
      console.error(e)
    }
    finally {
      loading.value = false
    }
  }

  return { fetchCO2EmissionsData, fetchGHGEmissionsData, co2EmissionsData, ghgEmissionsData, loading, countries, years, selectedCo2Emissions, selectedGhgEmissions, selectedCountries, selectedEmissionType, selectedEmissions, displayedEmissions, slider, benfordsDistribution }
})
