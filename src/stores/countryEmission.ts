import { defineStore } from 'pinia'

export const useCountryEmissionStore = defineStore('countryEmission', () => {
  const emissionsData = ref([])
  const loading = ref(false)

  const countries = computed(() => {
    const filteredData = emissionsData.value.filter(data => data.iso_code)
    return [...new Set(filteredData.map(data => data.country))]
  })

  const years = computed(() => [...new Set(emissionsData.value.map(data => data.year))].sort())

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

  return { fetchEmissionsData, emissionsData, loading, countries, years }
})
