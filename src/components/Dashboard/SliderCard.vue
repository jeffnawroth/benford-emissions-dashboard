<script setup lang="ts">
import { useCountryEmissionStore } from '@/stores/countryEmission'
import { storeToRefs } from 'pinia'

const { selectedYear, filteredData } = storeToRefs(useCountryEmissionStore())

const max = computed(() => filteredData.value.years[filteredData.value.years.length - 1])
const min = computed(() => filteredData.value.years[0])
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
