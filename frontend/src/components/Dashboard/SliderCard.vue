<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryEmissionStore } from '@/stores/countryEmission'

const { selectedYear, selectedEmissionType } = storeToRefs(useCountryEmissionStore())

const max = 2022
const min = computed(() => selectedEmissionType.value === 'CO₂' ? 1750 : 1850)
</script>

<template>
  <v-card>
    <v-card-text>
      <v-slider
        v-model="selectedYear"
        class="mt-4"
        :min
        :max
        :step="1"
        hide-details
        thumb-label
      >
        <template #prepend>
          <v-chip label>
            {{ min }}
          </v-chip>
        </template>

        <template #append>
          <v-chip label>
            {{ max }}
          </v-chip>
        </template>
      </v-slider>
    </v-card-text>
  </v-card>
</template>
