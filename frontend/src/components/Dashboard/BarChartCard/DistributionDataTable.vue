<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryEmissionStore } from '@/stores/countryEmission'

interface DataTableItem {
  value: number
  expected: number
  observed: number
  deviation: number
}

const { benfordsDistribution } = storeToRefs(useCountryEmissionStore())

const headers = [
  { title: 'Value', value: 'value', sortable: true, width: '25%' },
  { title: 'Expected', value: 'expected', sortable: true, width: '25%' },
  { title: 'Observed', value: 'observed', sortable: true, width: '25%' },
  { title: 'Deviation', value: 'deviation', sortable: true, width: '25%' },
]

const items = computed<DataTableItem[]>(() => {
  return benfordsDistribution.value.expected.map((expectedValue, index) => ({
    value: index + 1,
    expected: roundNumber(expectedValue),
    observed: roundNumber(benfordsDistribution.value.observed[index]),
    deviation: roundNumber(Math.abs(expectedValue - benfordsDistribution.value.observed[index])),
  }))
})

function roundNumber(num: number) {
  return Math.round(num * 10) / 10
}

function formatDeviation(item: DataTableItem) {
  return item.expected > item.observed ? `-${item.deviation}%` : item.expected < item.observed ? `+${item.deviation}%` : `${item.deviation}%`
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
      <p>{{ `${item.expected}%` }}</p>
    </template>
    <template #[`item.observed`]="{ item }">
      <p>{{ `${item.observed}%` }}</p>
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
