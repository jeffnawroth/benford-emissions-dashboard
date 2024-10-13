<script lang="ts" setup>
const countryEmissionStore = useCountryEmissionStore()
const { fetchData } = countryEmissionStore
const { selectedEmissionType } = storeToRefs(countryEmissionStore)

watch(selectedEmissionType, (newVal) => {
  fetchData(newVal.id)
}, { immediate: true })
</script>

<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
.v-card-subtitle {
  white-space: wrap !important;
  overflow: visible;
  text-overflow: initial;
}
</style>
