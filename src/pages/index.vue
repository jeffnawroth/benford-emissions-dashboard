<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { BarElement, CategoryScale, Chart as ChartJS, Colors, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { storeToRefs } from 'pinia'
import benfordsLawDistribution from '../benfordsLawDistribution'
import { useCountryEmissionStore } from '@/stores/countryEmission'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors)

// Emission Store
const countryEmissionStore = useCountryEmissionStore()
const { emissionsData, countries, years, loading } = storeToRefs(countryEmissionStore)
const { fetchEmissionsData } = countryEmissionStore

// Refs
const selectedMetric = ref<string>('co2')
const options = {
  responsive: true,
  plugins: {
    colors: {
      enabled: true,
    },
  },
}

// Computed properties
const numbers = computed(() => {
  return emissionsData.value.flatMap((country) => {
    const extractedNumbers = []
    if (selectedMetric.value === 'co2' && country.co2 !== null)
      extractedNumbers.push(country.co2)

    if (selectedMetric.value === 'population' && country.population !== null)
      extractedNumbers.push(country.population)

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

// Lifecycle hooks

onMounted(() => {
  if (emissionsData.value.length === 0)
    fetchEmissionsData()
})
</script>

<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-card
        title="Data"
        :loading
      >
        <v-card-text>
          <p>
            Total: {{ emissionsData.length.toLocaleString() }}
          </p>
          <p>
            Selected: {{ numbers.filter(num => num !== undefined && num !== null).length.toLocaleString() }}
          </p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
    >
      <v-card
        title="Chart"
        :loading
      >
        <v-card-text>
          <Bar
            :data
            :options
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      md="6"
    >
      <v-card title="Metrics">
        <v-card-text>
          <v-list height="500">
            <v-list-item title="Annual CO₂ emissions (Million Tonnes)">
              <template #prepend>
                <v-list-item-action start>
                  <v-checkbox-btn
                    v-model="selectedMetric"
                    value="co2"
                  />
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-list-item title="Population (Persons)">
              <template #prepend>
                <v-list-item-action start>
                  <v-checkbox-btn
                    v-model="selectedMetric"
                    value="population"
                  />
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      md="6"
    >
      <v-card
        title="Countries"
        :loading
      >
        <v-card-text>
          <p>Total: {{ countries.length.toLocaleString() }}</p>
          <p>Selected: {{ countries.length.toLocaleString() }}</p>

          <v-list
            height="500"
          >
            <v-list-item
              v-for="country in countries"
              :key="country"
              :title="country"
            >
              <template #prepend>
                <v-list-item-action start>
                  <v-checkbox-btn />
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      md="6"
    >
      <v-card
        title="Years"
        :loading
      >
        <v-card-text>
          <p>Total: {{ years.length.toLocaleString() }}</p>
          <p>Selected: {{ years.length.toLocaleString() }}</p>
          <v-list
            height="500"
          >
            <v-list-item
              v-for="year in years"
              :key="year"
              :title="year"
            >
              <template #prepend>
                <v-list-item-action start>
                  <v-checkbox-btn />
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
