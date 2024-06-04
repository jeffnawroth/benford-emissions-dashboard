<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryEmissionStore } from '@/stores/countryEmission'

const { validSelectedEmissionTypeEmissions, filteredSelectedEmissionTypeEmissions, rawSelectedEmissionTypeEmissions } = storeToRefs(useCountryEmissionStore())
</script>

<template>
  <v-card
    title="Data"
    prepend-icon="mdi-database-outline"
    height="100%"
    append-icon="mdi-open-in-new"
    href="/emissions"
    rel="noopener"
    subtitle="Checkout the dataset for emissions"
  >
    <v-card-text>
      <p>
        Raw: {{ rawSelectedEmissionTypeEmissions.length.toLocaleString() }}
      </p>

      <p>
        Pre-Filtered: {{ `${validSelectedEmissionTypeEmissions.length.toLocaleString()}` }}  <span class="text-medium-emphasis">*</span>
      </p>
      <p class="font-weight-bold">
        Selected: {{ filteredSelectedEmissionTypeEmissions.length.toLocaleString() }}
      </p>

      <p class="text-medium-emphasis">
        <small>
          * After filtering out invalid country ISO codes

        </small>
      </p>
    </v-card-text>
  </v-card>
</template>
