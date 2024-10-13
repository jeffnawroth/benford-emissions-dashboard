<script setup lang="ts">
const { data, filteredData } = storeToRefs(useCountryEmissionStore())
</script>

<template>
  <v-card
    title="Data"
    prepend-icon="mdi-database-outline"
    height="100%"
    append-icon="mdi-open-in-new"
    @click="$router.push('/emissions')"
  >
    <v-card-subtitle class="subtitle">
      Checkout the dataset for emissions
    </v-card-subtitle>
    <v-card-text>
      <p>
        Raw: {{ data.values.length.toLocaleString() }}
      </p>

      <!-- <p>
        Pre-Filtered: {{ `${validSelectedEmissionTypeEmissions.length.toLocaleString()}` }}  <span class="text-medium-emphasis">*</span>
      </p> -->
      <p class="font-weight-bold">
        Selected<span>*</span>:  {{ filteredData.values ? filteredData.values.length.toLocaleString() : 0 }}
      </p>

      <p class="text-medium-emphasis">
        <small>
          * Data has been pre-processed by excluding records with a value of 0.
        </small>
      </p>
    </v-card-text>
  </v-card>
</template>
