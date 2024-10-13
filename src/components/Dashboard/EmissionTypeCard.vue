<script setup lang="ts">
import type { EmissionType } from '@/types'

const countryEmissionStore = useCountryEmissionStore()
const { metadata, selectedEmissionType } = storeToRefs(countryEmissionStore)

const items = ref<EmissionType[]>([
  { id: 944146, shortHand: 'CO₂' },
  { id: 899063, shortHand: 'GHG' },
])
</script>

<template>
  <v-card
    :title="metadata.name"
    prepend-icon="mdi-factory"
    height="100%"
  >
    <v-card-subtitle class="subtitle">
      <Subtitle />
    </v-card-subtitle>
    <v-card-text>
      <v-select
        v-model="selectedEmissionType"
        :items
        hide-details
        return-object
        item-title="shortHand"
      />
    </v-card-text>
  </v-card>
</template>
