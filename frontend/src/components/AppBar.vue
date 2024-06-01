import router from '@/router';
<template>
  <v-app-bar
    flat
    app
  >
    <v-app-bar-title
      class="cursor-pointer"
      @click="$router.push('/')"
    >
      Benford Emissions Dashboard
    </v-app-bar-title>
    <v-btn
      icon="mdi-view-dashboard"
      @click="$router.push('/')"
    />
  </v-app-bar>
</template>
