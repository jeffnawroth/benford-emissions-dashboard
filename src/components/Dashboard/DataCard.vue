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
    height="100%"
  >
    <v-card-text>
      <p>
        Total: {{ emissionsData.length.toLocaleString() }}
      </p>
      <p>
        Selected: {{ co2Emissions.length.toLocaleString() }}
      </p>
      <RouterLink to="/reports">
        View Dataset
      </RouterLink>
    </v-card-text>
  </v-card>
</template>
