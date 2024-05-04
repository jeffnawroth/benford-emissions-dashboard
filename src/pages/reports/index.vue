<script setup lang="ts">
import items from '@/companiesData'

const headers = [
  { title: 'Rank', value: 'rank' },
  { title: 'Company', value: 'company' },
  { title: 'Region', value: 'region' },
  { title: 'Country', value: 'country' },
  { title: 'Sector', value: 'sector' },
  { title: 'ESG Score', value: 'esg_score' },
  { title: 'Temperature Score (2050)', value: 'temperature_score' },
  { title: 'Emissions: Tonnes of CO2e (Scope 1 & 2)', value: 'emissions_scope_1_2' },
  { title: 'Emissions: Tonnes of CO2e (Scope 3)', value: 'emissions_scope_3' },
  { title: 'Market Cap Category', value: 'market_cap_category' },
]
</script>

<template>
  <v-data-table
    :headers
    :items
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>ESG Reports</v-toolbar-title>
      </v-toolbar>
    </template>
    <template #[`item.emissions_scope_1_2`]="{ item }">
      <span>{{ item.emissions_scope_1_2.toLocaleString() }}</span>
    </template>
    <template #[`item.emissions_scope_3`]="{ item }">
      <span>{{ item.emissions_scope_3?.toLocaleString() }}</span>
    </template>
  </v-data-table>
</template>
