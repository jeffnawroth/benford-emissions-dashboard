<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { BarElement, CategoryScale, Chart as ChartJS, Colors, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { storeToRefs } from 'pinia'
import benfordsLawDistribution from '../../benfordsLawDistribution'
import { useCountryEmissionStore } from '@/stores/countryEmission'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors)

const { loading, co2Emissions } = storeToRefs(useCountryEmissionStore())

const options = {
  responsive: true,
  plugins: {
    colors: {
      enabled: true,
    },
  },
}

const result = computed(() => benfordsLawDistribution(co2Emissions.value))

const data = computed(() => ({
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  datasets: [
    { data: result.value.observed, label: 'Observed', borderWidth: 1 },
    { data: result.value.expected, label: 'Expected', borderWidth: 1 },
  ],
}))
</script>

<template>
  <v-card
    title="Annual Annual CO₂ emissions"
    subtitle="Carbon dioxide (CO₂) emissions from fossil fuels and industry. Land-use change is not included."
    :loading
  >
    <v-card-text>
      <Bar
        :data
        :options
      />
    </v-card-text>
  </v-card>
</template>
