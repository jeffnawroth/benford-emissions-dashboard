<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue'

//
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
