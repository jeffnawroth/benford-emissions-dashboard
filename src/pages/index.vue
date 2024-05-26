<script setup lang="ts">

</script>

<template>
  <v-row
    dense
  >
    <!-- Data Card -->
    <v-col
      md="3"
      cols="12"
      order="0"
    >
      <DataCard />
    </v-col>

    <!-- GAS Select Card -->
    <v-col
      cols="12"
      md="9"
      order="2"
      order-md="1"
    >
      <EmissionTypeCard />
    </v-col>

    <!-- Countries Card -->
    <v-col
      order="3"
      cols="12"
      md="3"
      order-md="2"
    >
      <CountriesCard />
    </v-col>

    <!-- Bar Chart Card -->
    <v-col
      cols="12"
      md="9"
      order="1"
      order-md="3"
    >
      <BarChartCard />
    </v-col>
  </v-row>
</template>
