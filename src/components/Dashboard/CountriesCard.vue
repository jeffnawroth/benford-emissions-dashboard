<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryEmissionStore } from '@/stores/countryEmission'

const { loading, countries } = storeToRefs(useCountryEmissionStore())
const countrySearch = ref<string>('')
const selectedCountries = ref<Set<string>>(new Set())

const filteredCountries = computed(() => {
  return countries.value.filter(country => country.toLowerCase().includes(countrySearch.value.toLowerCase()))
})

// Toggle country selection
function toggleCountrySelection(country: string) {
  if (selectedCountries.value.has(country))
    selectedCountries.value.delete(country)
  else
    selectedCountries.value.add(country)
}

// Check if all countries are selected
const areAllCountriesSelected = computed(() => {
  return filteredCountries.value.every(country => selectedCountries.value.has(country))
})

// Check if some countries are selected
const areSomeCountriesSelected = computed(() => {
  return selectedCountries.value.size > 0
})

// Select all countries if none are selected, deselect all countries if all are selected
function toggleSelectAll() {
  if (areAllCountriesSelected.value)
    deselectAllCountries()
  else
    selectAllCountries()
};

// Deselect all countries
function deselectAllCountries() {
  selectedCountries.value.clear()
}

// Select all countries
function selectAllCountries() {
  filteredCountries.value.forEach(country => selectedCountries.value.add(country))
}
</script>

<template>
  <v-card
    :loading
    title="Countries"
    prepend-icon="mdi-earth"
  >
    <v-card-text>
      <!-- <p>Total: {{ countries.length.toLocaleString() }}</p>
          <p>Selected: {{ countries.length.toLocaleString() }}</p> -->

      <v-text-field
        v-model="countrySearch"
        placeholder="Search country"
      />
      <v-list>
        <v-list-item
          title="Select All"
          @click="toggleSelectAll"
        >
          <template #prepend>
            <v-list-item-action start>
              <v-checkbox-btn
                :indeterminate="areSomeCountriesSelected && !areAllCountriesSelected"
                :model-value="areAllCountriesSelected"
              />
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider />
      </v-list>

      <v-list
        class="overflow-y-auto"
        height="520"
      >
        <v-list-item
          v-for="country in filteredCountries"
          :key="country"
          :title="country"
          @click="toggleCountrySelection(country)"
        >
          <template #prepend>
            <v-list-item-action start>
              <v-checkbox-btn :model-value="selectedCountries.has(country)" />
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
