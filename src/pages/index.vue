<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { BarElement, CategoryScale, Chart as ChartJS, Colors, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import benfordsLawDistribution from '../benfordsLawDistribution'
import esgCompanies from '@/companiesData'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors)

const includeEmissionsScope1And2 = ref(true)
const includeEmissionsScope3 = ref(true)

const numbers = computed(() => {
  return esgCompanies.flatMap((company) => {
    const extractedNumbers = []
    if (includeEmissionsScope1And2.value && company.emissions_scope_1_2 !== null)
      extractedNumbers.push(company.emissions_scope_1_2)

    if (includeEmissionsScope3.value && company.emissions_scope_3 !== null)
      extractedNumbers.push(company.emissions_scope_3)

    return extractedNumbers
  })
})

const result = computed(() => benfordsLawDistribution(numbers.value))

const data = computed(() => ({
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  datasets: [
    { data: result.value.observed, label: 'Observed', borderWidth: 1 },
    { data: result.value.expected, label: 'Expected', borderWidth: 1 },
  ],
}))

const options = {
  responsive: true,
  plugins: {
    colors: {
      enabled: true,
    },
  },
}
</script>

<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-card>
        <v-card-text>
          <v-list>
            <v-list-item title="Emissions: Tonnes of CO2e (Scope 1 & 2)">
              <template #prepend>
                <v-list-item-action start>
                  <v-checkbox-btn v-model="includeEmissionsScope1And2" />
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-list-item title="Emissions: Tonnes of CO2e (Scope 3)">
              <template #prepend>
                <v-list-item-action start>
                  <v-checkbox-btn v-model="includeEmissionsScope3" />
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
    >
      <v-card>
        <v-card-text>
          <!-- <canvas id="myChart" /> -->
          <Bar
            :data
            :options
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
