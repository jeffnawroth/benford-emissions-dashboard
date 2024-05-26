<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryEmissionStore } from '@/stores/countryEmission'

const { loading, selectedEmissions, displayedEmissions } = storeToRefs(useCountryEmissionStore())
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
        Total: {{ selectedEmissions.length.toLocaleString() }}
      </p>
      <p>
        Selected: {{ displayedEmissions.length.toLocaleString() }}
      </p>
      <RouterLink to="/reports">
        View Dataset
      </RouterLink>
    </v-card-text>
  </v-card>
</template>
