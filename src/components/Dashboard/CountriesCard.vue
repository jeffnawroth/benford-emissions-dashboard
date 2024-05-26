<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryEmissionStore } from '@/stores/countryEmission'

const { loading, countries } = storeToRefs(useCountryEmissionStore())
const countrySearch = ref<string>('')

const filteredCountries = computed(() => {
  return countries.value.filter(country => country.toLowerCase().includes(countrySearch.value.toLowerCase()))
})
</script>

<template>
  <v-card
    title="Countries"
    :loading
  >
    <v-card-text>
      <!-- <p>Total: {{ countries.length.toLocaleString() }}</p>
          <p>Selected: {{ countries.length.toLocaleString() }}</p> -->

      <v-text-field
        v-model="countrySearch"
        placeholder="Search and add country"
      />

      <v-list
        class="overflow-y-auto"
        height="585.5"
      >
        <v-list-item
          v-for="country in filteredCountries"
          :key="country"
          :title="country"
        >
          <template #prepend>
            <v-list-item-action start>
              <v-checkbox-btn />
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
