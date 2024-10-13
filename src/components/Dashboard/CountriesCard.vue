<script setup lang="ts">
const { loading, metadata, selectedCountriesIds } = storeToRefs(useCountryEmissionStore())
const countrySearch = ref<string | null>('')

// Filter countries based on search
const filteredCountries = computed(() => {
  const searchQuery = countrySearch.value ? countrySearch.value.toLowerCase() : ''
  return metadata.value?.dimensions?.entities.values.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase())) || []
})

// Check if all countries are selected
const areAllCountriesSelected = computed(() => {
  return filteredCountries.value.every(country => selectedCountriesIds.value.has(country.id))
})

// Check if some countries are selected
const areSomeCountriesSelected = computed(() => {
  return selectedCountriesIds.value.size > 0
})

// If loading is false, select all countries
// watch(loading, (newVal) => {
//   if (!newVal)
//     selectAllCountries()
// })

// watch(selectedEmissionType, () => {
//   deselectAllCountries()
//   selectAllCountries()
// })

// Toggle country selection
function toggleCountrySelection(countryId: number) {
  if (selectedCountriesIds.value.has(countryId))
    selectedCountriesIds.value.delete(countryId)
  else
    selectedCountriesIds.value.add(countryId)
}

// Select all countries if none are selected, deselect all countries if all are selected
function toggleSelectAll() {
  if (areAllCountriesSelected.value)
    deselectAllCountries()
  else
    selectAllCountries()
};

// // Deselect all countries
function deselectAllCountries() {
  selectedCountriesIds.value.clear()
}

// // Select all countries
function selectAllCountries() {
  metadata.value.dimensions.entities.values.forEach(country => selectedCountriesIds.value.add(country.id))
}
</script>

<template>
  <v-card
    title="Countries"
    prepend-icon="mdi-earth"
  >
    <v-card-subtitle class="subtitle">
      Select countries to include emissions
    </v-card-subtitle>
    <v-card-text>
      <p class="font-weight-bold mb-4">
        Selected: {{ selectedCountriesIds.size.toLocaleString() }}
      </p>

      <v-text-field
        v-model="countrySearch"
        placeholder="Search country"
        clearable
        prepend-inner-icon="mdi-magnify"
        hide-details
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
        max-height="30vh"
      >
        <template v-if="filteredCountries.length > 0">
          <v-list-item
            v-for="country in filteredCountries"
            :key="country.id"
            :title="country.name"
            @click="toggleCountrySelection(country.id)"
          >
            <template #prepend>
              <v-list-item-action start>
                <v-checkbox-btn :model-value="selectedCountriesIds.has(country.id)" />
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>

        <v-list-item v-else>
          <v-empty-state text="No data available" />
        </v-list-item>

        <template
          v-if="loading"
        >
          <v-skeleton-loader
            v-for="i in 10"
            :key="i"
            type="list-item"
          />
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>
