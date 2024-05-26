<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCountryEmissionStore } from './stores/countryEmission'

// Emission Store
const countryEmissionStore = useCountryEmissionStore()
const { emissionsData } = storeToRefs(countryEmissionStore)
const { fetchEmissionsData } = countryEmissionStore

// Lifecycle hooks
onMounted(() => {
  if (emissionsData.value.length === 0)
    fetchEmissionsData()
})
</script>

<template>
  <v-app>
    <AppBar />
    <!-- <NavigationDrawer /> -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
