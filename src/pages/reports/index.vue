<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryEmissionStore } from '@/stores/countryEmission'

const countryEmissionStore = useCountryEmissionStore()
const { co2EmissionsData, ghgEmissionsData, loading } = storeToRefs(countryEmissionStore)

const co2EmissionsDataSearch = ref('')
const ghgEmissionsDataSearch = ref('')

const headers = [
  { title: 'Country', value: 'country', sortable: true, width: '25%' },
  { title: 'Year', value: 'year', sortable: true, width: '25%' },
  { title: 'ISO Code', value: 'iso_code', sortable: true, width: '25%' },
]

const co2EmissionsDataHeaders = [
  ...headers,
  { title: 'Annual CO₂ emissions (Million Tonnes)', value: 'co2', sortable: true, width: '25%' },
]

const ghgEmissionsDataHeaders = [
  ...headers,
  { title: 'Total greenhouse gas emissions (Million Tonnes of carbon dioxide-equivalents)', value: 'total_ghg', sortable: true, width: '25%' },
]
</script>

<template>
  <v-data-table
    :headers="co2EmissionsDataHeaders"
    :items="co2EmissionsData"
    :search="co2EmissionsDataSearch"
    :loading
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>CO2 Emissions Data</v-toolbar-title>
        <v-text-field
          v-model="co2EmissionsDataSearch"
          placeholder="Search..."
          clearable
          hide-details
        />
      </v-toolbar>
    </template>
  </v-data-table>

  <v-data-table
    :headers="ghgEmissionsDataHeaders"
    :items="ghgEmissionsData"
    :search="ghgEmissionsDataSearch"
    :loading
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>GHG Emissions Data</v-toolbar-title>
        <v-text-field
          v-model="ghgEmissionsDataSearch"
          placeholder="Search..."
          clearable
          hide-details
        />
      </v-toolbar>
    </template>
  </v-data-table>
</template>
