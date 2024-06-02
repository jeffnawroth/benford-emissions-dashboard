<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryEmissionStore } from '@/stores/countryEmission'

const { selectedEmissionType } = storeToRefs(useCountryEmissionStore())

const title = computed(() => selectedEmissionType.value === 'CO₂' ? 'Annual CO₂ emissions' : 'Greenhouse gas emissions')
</script>

<template>
  <v-card
    :title
    prepend-icon="mdi-factory"
  >
    <v-card-subtitle class="subtitle">
      <Subtitle />
    </v-card-subtitle>
    <v-card-text>
      <v-select
        v-model="selectedEmissionType"
        :items="['CO₂', 'GHG']"
        hide-details
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.subtitle {
  white-space: normal;
  overflow: visible;
  text-overflow: initial;
}
</style>
