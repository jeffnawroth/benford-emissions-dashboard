<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { BarElement, CategoryScale, Chart as ChartJS, Colors, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { storeToRefs } from 'pinia'
import benfordsLawDistribution from '../../benfordsLawDistribution'
import { useCountryEmissionStore } from '@/stores/countryEmission'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors)

const { loading, displayedEmissions, selectedEmissionType } = storeToRefs(useCountryEmissionStore())

const options = {
  responsive: true,
  plugins: {
    colors: {
      enabled: true,
    },
  },
}

const result = computed(() => benfordsLawDistribution(displayedEmissions.value))

const data = computed(() => ({
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  datasets: [
    { data: result.value.observed, label: 'Observed', borderWidth: 1 },
    { data: result.value.expected, label: 'Expected', borderWidth: 1 },
  ],
}))

const title = computed(() => selectedEmissionType.value === 'CO₂' ? 'Annual CO₂ emissions' : 'Greenhouse gas emissions')
const subtitle = computed(() => selectedEmissionType.value === 'CO₂' ? 'Carbon dioxide (CO₂) emissions from fossil fuels and industry. Land-use change is not included.' : 'Greenhouse gas emissions include carbon dioxide, methane and nitrous oxide from all sources, including land-use change. They are measured in tonnes of carbon dioxide-equivalents over a 100-year timescale.')
const dataSourceCitation = computed(() => selectedEmissionType.value === 'CO₂' ? 'Global Carbon Budget (2023) – with major processing by Our World in Data' : 'Jones et al. (2024) – with major processing by Our World in Data')
</script>

<template>
  <v-card
    :title
    :loading
    prepend-icon="mdi-chart-bar"
    height="800"
  >
    <v-card-subtitle class="subtitle">
      {{ subtitle }}
    </v-card-subtitle>
    <v-card-text>
      <Bar
        :data
        :options
      />
      <p class="mt-4">
        <span class="font-weight-bold">Data source: </span>{{ dataSourceCitation }}
      </p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.subtitle {
  white-space: normal;
  overflow: visible;
  text-overflow: initial;
}
</style>
