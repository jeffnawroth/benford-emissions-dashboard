<script setup lang="ts">
import { useCountryEmissionStore } from '@/stores/countryEmission'
import { storeToRefs } from 'pinia'

interface DataTableItem {
  value: number
  expected: number
  observed: number
  deviation: number
}

const { benfordsDistributionData } = storeToRefs(useCountryEmissionStore())

const headers = [
  { title: 'Value', value: 'value', sortable: true },
  { title: 'Expected', value: 'expected', sortable: true },
  { title: 'Observed', value: 'observed', sortable: true },
  { title: 'Deviation', value: 'deviation', sortable: true },
]

const items = computed<DataTableItem[]>(() => {
  return benfordsDistributionData.value.expected.map((expectedValue, index) => ({
    value: index + 1,
    expected: roundNumber(expectedValue),
    observed: roundNumber(benfordsDistributionData.value.observed[index]),
    deviation: roundNumber(Math.abs(expectedValue - benfordsDistributionData.value.observed[index])),
  }))
})

function roundNumber(num: number) {
  return Math.round(num * 10) / 10
}

function formatDeviation(item: DataTableItem) {
  return item.observed ? item.expected > item.observed ? `-${item.deviation}%` : item.expected < item.observed ? `+${item.deviation}%` : `${item.deviation}%` : '-'
}

function deviationColor(item: DataTableItem) {
  return item.expected > item.observed ? 'text-error' : item.expected < item.observed ? 'text-success' : ''
}
</script>

<template>
  <v-data-table
    :headers
    :items
  >
    <template #[`item.expected`]="{ item }">
      <p>{{ `${(item as DataTableItem).expected}%` }}</p>
    </template>
    <template #[`item.observed`]="{ item }">
      <p>{{ (item as DataTableItem).observed !== undefined ? `${(item as DataTableItem).observed}%` : "-" }}</p>
    </template>
    <template #[`item.deviation`]="{ item }">
      <p
        :class="deviationColor(item)"
      >
        {{ formatDeviation(item) }}
      </p>
    </template>
  </v-data-table>
</template>
