<script setup lang="ts">
import { useCountryEmissionStore } from '@/stores/countryEmission'
import { storeToRefs } from 'pinia'

const countryEmissionStore = useCountryEmissionStore()
const { data, metadata, selectedEmissionType } = storeToRefs(countryEmissionStore)

const search = ref('')

const searchPlaceholder = 'Search...'

const headers = computed(() => [
  { title: 'Country', value: 'country', sortable: true, width: '25%' },
  { title: 'ISO Code', value: 'countryCode', sortable: true, width: '25%' },
  { title: 'Year', value: 'year', sortable: true, width: '25%' },
  { title: selectedEmissionType.value.id === 944146 ? 'Annual CO₂ emissions (Million Tonnes)' : 'Total greenhouse gas emissions (Million Tonnes of carbon dioxide-equivalents)', value: 'value', sortable: true, width: '25%' },
],
)

const items = computed(() => {
  return data.value.entities.map((item, index) => {
    const country = metadata.value.dimensions.entities.values.find(entity => entity.id === item)
    return {
      country: country?.name,
      countryCode: country?.code,
      year: data.value.years[index],
      value: data.value.values[index],
    }
  })
})
</script>

<template>
  <v-row>
    <v-col cols="12">
      <EmissionTypeCard />
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers
        :items
        :search
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>
              Data
            </v-toolbar-title>

            <v-text-field
              v-model="search"
              :placeholder="searchPlaceholder"
              clearable
              hide-details
            />
          </v-toolbar>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
