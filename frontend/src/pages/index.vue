<script setup lang="ts">

</script>

<template>
  <v-row
    dense
  >
    <!-- Data Card -->
    <v-col
      lg="3"
      cols="12"
      order="0"
    >
      <DataCard />
    </v-col>

    <!-- GAS Select Card -->
    <v-col
      cols="12"
      lg="9"
      order="3"
      order-lg="1"
    >
      <EmissionTypeCard />
    </v-col>

    <!-- Countries Card -->
    <v-col
      order="4"
      cols="12"
      lg="3"
      order-lg="2"
    >
      <CountriesCard />
    </v-col>

    <!-- Bar Chart Card -->
    <v-col
      cols="12"
      lg="9"
      order="1"
      order-lg="3"
    >
      <BarChartCard />
    </v-col>
  </v-row>
</template>
