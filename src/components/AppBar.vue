<script setup lang="ts">
import { useCountryEmissionStore } from '@/stores/countryEmission'
import { storeToRefs } from 'pinia'
import { useTheme } from 'vuetify'

const { loading } = storeToRefs(useCountryEmissionStore())

const theme = useTheme()

// Toggle theme
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  localStorage.setItem('theme', theme.global.name.value)
}

// Set theme on mount
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.global.name.value = savedTheme
  }
})
</script>

<template>
  <v-app-bar
    app
  >
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      bottom
    />

    <v-app-bar-title
      class="cursor-pointer"
      @click="$router.push('/')"
    >
      Benford Emissions Dashboard
    </v-app-bar-title>

    <v-btn
      icon="mdi-theme-light-dark"
      @click="toggleTheme"
    />
    <v-btn
      icon="mdi-github"
      href="https://github.com/jeffnawroth/benford-emissions-dashboard"
      target="_blank"
    />
  </v-app-bar>
</template>
