<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryEmissionStore } from '@/stores/countryEmission'

const { loading, emissionsData, co2Emissions } = storeToRefs(useCountryEmissionStore())
</script>

<template>
  <v-card
    title="Data"
    prepend-icon="mdi-database-outline"
    :loading
  >
    <v-card-text>
      <p>
        Total: {{ emissionsData.length.toLocaleString() }}
      </p>
      <p>
        Selected: {{ co2Emissions.filter(num => num !== undefined && num !== null).length.toLocaleString() }}
      </p>
      <RouterLink to="/reports">
        View Dataset
      </RouterLink>
    </v-card-text>
  </v-card>
</template>
