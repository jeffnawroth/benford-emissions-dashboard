<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryEmissionStore } from '@/stores/countryEmission'

const { selectedEmissionType } = storeToRefs(useCountryEmissionStore())
</script>

<template>
  <v-card
    title="Emission Type"
  >
    <v-card-text>
      <v-select
        v-model="selectedEmissionType"
        :items="['CO₂', 'GHG']"
      />
    </v-card-text>
  </v-card>
</template>
