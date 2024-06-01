<script lang="ts" setup>
import { useCountryEmissionStore } from './stores/countryEmission'

// Emission Store
const { fetchCO2EmissionsData, fetchGHGEmissionsData } = useCountryEmissionStore()

// Lifecycle hooks
onMounted(() => {
  fetchCO2EmissionsData()
  fetchGHGEmissionsData()
})
</script>

<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
