<script setup lang="ts">
</script>

<template>
  <v-navigation-drawer>
    <v-list nav>
      <v-list-item
        title="Dashboard"
        prepend-icon="mdi-view-dashboard"
        to="/"
      />
      <v-list-item
        title="ESG Reports"
        prepend-icon="mdi-file-document-multiple-outline"
        to="/reports"
      />
    </v-list>
  </v-navigation-drawer>
</template>
