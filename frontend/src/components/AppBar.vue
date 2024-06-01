<script setup lang="ts">
import { useTheme } from 'vuetify'

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
  </v-app-bar>
</template>
