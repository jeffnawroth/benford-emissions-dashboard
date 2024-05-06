<script setup lang="ts">
import { storeToRefs } from 'pinia'
// import items from '@/companiesData'
import { useCountryEmissionStore } from '@/stores/countryEmission'

const countryEmissionStore = useCountryEmissionStore()
const { fetchEmissionsData } = countryEmissionStore
const { emissionsData, loading } = storeToRefs(countryEmissionStore)

const search = ref('')

onMounted(() => {
  if (emissionsData.value.length === 0)
    fetchEmissionsData()
})

const headers = [
  { title: 'Country', value: 'country' },
  { title: 'Year', value: 'year' },
  { title: 'ISO Code', value: 'iso_code', sortable: true },
  { title: 'Population (Persons)', value: 'population', sortable: true },
  { title: 'GDP (Intl-$ in 2011 Prices)', value: 'gdp' },
  { title: 'Annual CO₂ emissions from cement (Million Tonnes)', value: 'cement_co2' },
  { title: 'Annual CO₂ emissions from cement per capita (Tonnes per Person)', value: 'cement_co2_per_capita' },
  { title: 'Annual CO₂ emissions (Million Tonnes)', value: 'co2' },
  { title: 'Annual CO₂ emissions growth (Abs) (Million Tonnes)', value: 'co2_growth_abs' },
  { title: 'Annual CO₂ emissions growth (%)', value: 'co2_growth_prct' },
  { title: 'Annual CO₂ emissions including land-use change (Million Tonnes)', value: 'co2_including_luc' },
  { title: 'Growth rate of emissions including land-use change (Abs) (Million Tonnes)', value: 'co2_including_luc_growth_abs' },
  { title: 'Growth rate of emissions including land-use change (%)', value: 'co2_including_luc_growth_prct' },
  { title: 'Annual CO₂ emissions including land-use change per capita (Tonnes per Person)', value: 'co2_including_luc_per_capita' },
  { title: 'Annual CO₂ emissions including land-use change per GDP (Kg per Intl-$)', value: 'co2_including_luc_per_gdp' },
  { title: 'Annual CO₂ emissions including land-use change per unit energy (Kg per kWh)', value: 'co2_including_luc_per_unit_energy' },
  { title: 'Annual CO₂ emissions per capita (Tonnes per Person)', value: 'co2_per_capita' },
  { title: 'Annual CO₂ emissions per GDP (Kg per Intl-$)', value: 'co2_per_gdp' },
  { title: 'Annual CO₂ emissions per unit energy (Kg per kWh)', value: 'co2_per_unit_energy' },
  { title: 'Annual CO₂ emissions from coal (Million Tonnes)', value: 'coal_co2' },
  { title: 'Annual CO₂ emissions from coal per capita (Tonnes per Person)', value: 'coal_co2_per_capita' },
  { title: 'Annual consumption-based CO₂ emissions (Million Tonnes)', value: 'consumption_co2' },
  { title: 'Per capita consumption-based CO₂ emissions (Tonnes per Person)', value: 'consumption_co2_per_capita' },
  { title: 'Annual consumption-based CO₂ emissions per GDP (Kg per Intl-$)', value: 'consumption_co2_per_gdp' },
  { title: 'Cumulative CO₂ emissions from cement (Million Tonnes)', value: 'cumulative_cement_co2' },
  { title: 'Cumulative CO₂ emissions (Million Tonnes)', value: 'cumulative_co2' },
  { title: 'Cumulative CO₂ emissions including land-use change (Million Tonnes)', value: 'cumulative_co2_including_luc' },
  { title: 'Cumulative CO₂ emissions from coal (Million Tonnes)', value: 'cumulative_coal_co2' },
  { title: 'Cumulative CO₂ emissions from flaring (Million Tonnes)', value: 'cumulative_flaring_co2' },
  { title: 'Cumulative CO₂ emissions from gas (Million Tonnes)', value: 'cumulative_gas_co2' },
  { title: 'Cumulative CO₂ emissions from land-use change (Million Tonnes)', value: 'cumulative_luc_co2' },
  { title: 'Cumulative CO₂ emissions from oil (Million Tonnes)', value: 'cumulative_oil_co2' },
  { title: 'Cumulative CO₂ emissions from other industry (Million Tonnes)', value: 'cumulative_other_co2' },
  { title: 'Primary energy consumption per capita (KWh per Person)', value: 'energy_per_capita' },
  { title: 'Primary energy consumption per GDP (KWh per Intl-$)', value: 'energy_per_gdp' },
  { title: 'Annual CO₂ emissions from flaring (Million Tonnes)', value: 'flaring_co2' },
  { title: 'Annual CO₂ emissions from flaring per capita (Tonnes per Person)', value: 'flaring_co2_per_capita' },
  { title: 'Annual CO₂ emissions from gas (Million Tonnes)', value: 'gas_co2' },
  { title: 'Annual CO₂ emissions from gas per capita (Tonnes per Person)', value: 'gas_co2_per_capita' },
  { title: 'Total greenhouse gas emissions per capita excluding land-use change and forestry (Tonnes per Person)', value: 'ghg_excluding_lucf_per_capita' },
  { title: 'Total greenhouse gas emissions per capita including land-use change and forestry (Tonnes per Person)', value: 'ghg_per_capita' },
  { title: 'Annual CO₂ emissions from land-use change (Million Tonnes)', value: 'land_use_change_co2' },
  { title: 'Annual CO₂ emissions from land-use change per capita (Tonnes per Person)', value: 'land_use_change_co2_per_capita' },
  { title: 'Total methane emissions including land-use change and forestry (Million Tonnes)', value: 'methane' },
  { title: 'Total methane emissions per capita including land-use change and forestry (Tonnes per Person)', value: 'methane_per_capita' },
  { title: 'Total nitrous oxide emissions including land-use change and forestry (Million Tonnes)', value: 'nitrous_oxide' },
  { title: 'Total nitrous oxide emissions per capita including land-use change and forestry (Tonnes per Person)', value: 'nitrous_oxide_per_capita' },
  { title: 'Annual CO₂ emissions from oil (Million Tonnes)', value: 'oil_co2' },
  { title: 'Annual CO₂ emissions from oil per capita (Tonnes per Person)', value: 'oil_co2_per_capita' },
  { title: 'Annual CO₂ emissions from other industry per capita (Tonnes per Person)', value: 'other_co2_per_capita' },
  { title: 'Annual CO₂ emissions from other industry (Million Tonnes)', value: 'other_industry_co2' },
  { title: 'Primary energy consumption (TWh)', value: 'primary_energy_consumption' },
  { title: 'Share of global annual CO₂ emissions from cement (%)', value: 'share_global_cement_co2' },
  { title: 'Share of global annual CO₂ emissions (%)', value: 'share_global_co2' },
  { title: 'Share of global annual CO₂ emissions including land-use change (%)', value: 'share_global_co2_including_luc' },
  { title: 'Share of global annual CO₂ emissions from coal (%)', value: 'share_global_coal_co2' },
  { title: 'Share of global cumulative CO₂ emissions from cement (%)', value: 'share_global_cumulative_cement_co2' },
  { title: 'Share of global cumulative CO₂ emissions (%)', value: 'share_global_cumulative_co2' },
  { title: 'Share of global cumulative CO₂ emissions including land-use change (%)', value: 'share_global_cumulative_co2_including_luc' },
  { title: 'Share of global cumulative CO₂ emissions from coal (%)', value: 'share_global_cumulative_coal_co2' },
  { title: 'Share of global cumulative CO₂ emissions from flaring (%)', value: 'share_global_cumulative_flaring_co2' },
  { title: 'Share of global cumulative CO₂ emissions from gas (%)', value: 'share_global_cumulative_gas_co2' },
  { title: 'Share of global cumulative CO₂ emissions from land-use change (%)', value: 'share_global_cumulative_luc_co2' },
  { title: 'Share of global cumulative CO₂ emissions from oil (%)', value: 'share_global_cumulative_oil_co2' },
  { title: 'Share of global cumulative CO₂ emissions from other industry (%)', value: 'share_global_cumulative_other_co2' },
  { title: 'Share of global annual CO₂ emissions from flaring (%)', value: 'share_global_flaring_co2' },
  { title: 'Share of global annual CO₂ emissions from gas (%)', value: 'share_global_gas_co2' },
  { title: 'Share of global annual CO₂ emissions from land-use change (%)', value: 'share_global_luc_co2' },
  { title: 'Share of global annual CO₂ emissions from oil (%)', value: 'share_global_oil_co2' },
  { title: 'Share of global annual CO₂ emissions from other industry (%)', value: 'share_global_other_co2' },
  { title: 'Share of contribution to global warming (%)', value: 'share_of_temperature_change_from_ghg' },
  { title: 'Change in global mean surface temperature caused by methane emissions (°C)', value: 'temperature_change_from_ch4' },
  { title: 'Change in global mean surface temperature caused by CO₂ emissions (°C)', value: 'temperature_change_from_co2' },
  { title: 'Change in global mean surface temperature caused by greenhouse gas emissions (°C)', value: 'temperature_change_from_ghg' },
  { title: 'Change in global mean surface temperature caused by nitrous oxide emissions (°C)', value: 'temperature_change_from_n2o' },
  { title: 'Change in global mean surface temperature (°C)', value: 'temperature_change' },
  { title: 'Total CH₄ emissions per capita including land-use change and forestry (Tonnes per Person)', value: 'total_methane_per_capita' },
  { title: 'Total N₂O emissions per capita including land-use change and forestry (Tonnes per Person)', value: 'total_nitrous_oxide_per_capita' },
  { title: 'Total GHG emissions per capita (Tonnes per Person)', value: 'total_ghg_per_capita' },
]
</script>

<template>
  <v-data-table
    :headers
    :items="emissionsData"
    :search
    :loading
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>ESG Reports</v-toolbar-title>
        <!-- <v-title-field v-model="search" /> -->
      </v-toolbar>
    </template>
  </v-data-table>
</template>
