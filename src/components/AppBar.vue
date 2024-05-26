import router from '@/router';
<template>
  <v-app-bar
    flat
    app
    title="Benford Emissions Dashboard"
  >
    <v-btn
      icon="mdi-file-document-multiple-outline"
      @click="$router.push('/reports')"
    />
    <v-btn
      icon="mdi-view-dashboard"
      @click="$router.push('/')"
    />
  </v-app-bar>
</template>
