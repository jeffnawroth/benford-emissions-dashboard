<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { BarElement, CategoryScale, Chart as ChartJS, Colors, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { storeToRefs } from 'pinia'
import benfordsLawDistribution from '../../../benfordsLawDistribution'
import { useCountryEmissionStore } from '@/stores/countryEmission'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors)

const { loading, displayedEmissions, selectedEmissionType } = storeToRefs(useCountryEmissionStore())

const text = ref('chart')

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
    { data: result.value.expected, label: 'Expected', borderWidth: 1 },
    { data: result.value.observed, label: 'Observed', borderWidth: 1 },
  ],
}))

const dataSourceCitation = computed(() => selectedEmissionType.value === 'CO₂' ? 'Global Carbon Budget (2023) – with major processing by Our World in Data' : 'Jones et al. (2024) – with major processing by Our World in Data')
</script>

<template>
  <v-card
    title="Emissions Analysis According to Benford’s Law"
    :loading
    prepend-icon="mdi-calculator-variant-outline"
    height="100%"
  >
    <v-card-subtitle>
      Comparison of Expected and Observed Emission Data Using
      <SubtitleTooltip
        title="Benford's Law"
        activator="Benford's Law"
        text="Benford's Law states that in many naturally occurring collections of numbers, the leading digit is likely to be small. For example, in sets that obey Benford's Law, the number 1 appears as the leading significant digit about 30% of the time, while 9 appears as the leading significant digit less than 5% of the time."
      />
      to analyze emission data.
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
        >
          <v-btn-toggle
            v-model="text"
            divided
            mandatory
            border="sm"
            density="compact"
          >
            <v-btn
              value="chart"
              prepend-icon="mdi-chart-bar"
            >
              Chart
            </v-btn>

            <v-btn
              prepend-icon="mdi-table"
              value="table"
            >
              Table
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>

      <Bar
        v-if="text === 'chart'"
        :data
        :options
      />
      <DistributionDataTable v-else />

      <p class="mt-4">
        <span class="font-weight-bold">Data source: </span>{{ dataSourceCitation }}
      </p>
      <SliderCard flat />
    </v-card-text>
  </v-card>
</template>
