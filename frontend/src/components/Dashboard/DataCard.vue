<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryEmissionStore } from '@/stores/countryEmission'

const { selectedEmissions, displayedEmissions } = storeToRefs(useCountryEmissionStore())
</script>

<template>
  <v-card
    title="Data"
    prepend-icon="mdi-database-outline"
    height="100%"
  >
    <v-card-text>
      <p>
        Total: {{ selectedEmissions.length.toLocaleString() }}
      </p>
      <p>
        Selected: {{ displayedEmissions.length.toLocaleString() }}
      </p>
      <RouterLink to="/emissions">
        View Dataset
      </RouterLink>
    </v-card-text>
  </v-card>
</template>
