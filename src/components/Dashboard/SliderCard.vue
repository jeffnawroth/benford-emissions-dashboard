<script setup lang="ts">
import { useCountryEmissionStore } from '@/stores/countryEmission'
import { storeToRefs } from 'pinia'

const { selectedYear, sortedYears } = storeToRefs(useCountryEmissionStore())

const max = computed(() => sortedYears.value[sortedYears.value.length - 1] || 0)
const min = computed(() => sortedYears.value[0] || 0)
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
