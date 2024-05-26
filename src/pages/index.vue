<script setup lang="ts">

</script>

<template>
  <v-row
    dense
  >
    <!-- Data Card -->
    <v-col
      cols="3"
    >
      <DataCard />
    </v-col>

    <!-- GAS Select Card -->
    <v-col cols="9">
      <GasSelectCard />
    </v-col>

    <!-- Countries Card -->
    <v-col
      cols="3"
    >
      <CountriesCard />
    </v-col>

    <!-- Bar Chart Card -->
    <v-col
      cols="9"
    >
      <BarChartCard />
    </v-col>
  </v-row>
</template>
