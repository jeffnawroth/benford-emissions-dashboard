import { defineStore } from 'pinia'

interface EmissionData {
  country: string
  iso_code: string
  year: number
  co2: number
}

export const useCountryEmissionStore = defineStore('countryEmission', () => {
  const emissionsData = ref<EmissionData[]>([])
  const loading = ref(false)
  const selectedCountries = ref<Set<string>>(new Set())

  // Computed properties

  // Get a list of countries from the emissions data
  const countries = computed(() => {
    const filteredData = emissionsData.value.filter(data => data.iso_code)
    return [...new Set(filteredData.map(data => data.country))]
  })

  // Get a list of years from the emissions data
  // TODO: Get years from selected countries only
  const years = computed(() => [...new Set(emissionsData.value.map(data => data.year))].sort())

  // Get a list of CO2 emissions from the selected countries
  const co2Emissions = computed(() => {
    return emissionsData.value.filter(data => selectedCountries.value.has(data.country))
      .map(data => data.co2)
      .filter(co2 => co2 !== null && co2 !== undefined)
  })

  // Methods

  // Fetch emissions data from the API
  async function fetchEmissionsData() {
    try {
      loading.value = true
      const response = await fetch('http://localhost:8080/emissions/')
      const data = await response.json()
      emissionsData.value = data
    }
    catch (e) {
      console.error(e)
    }
    finally {
      loading.value = false
    }
  }

  return { fetchEmissionsData, emissionsData, loading, countries, years, co2Emissions, selectedCountries }
})
