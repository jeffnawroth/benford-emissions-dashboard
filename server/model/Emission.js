import { Schema, model } from 'mongoose'

const EmissionSchema = new Schema({
  country: { type: String, required: true },
  year: { type: Number, required: true },
  iso_code: { type: String, required: true },
  population: { type: Number, required: true },
  cement_co2: Number,
  cement_co2_per_capita: Number,
  co2: Number,
  co2_growth_abs: Number,
  co2_growth_prct: Number,
  co2_including_luc: Number,
  co2_including_luc_growth_abs: Number,
  co2_including_luc_growth_prct: Number,
  co2_including_luc_per_capita: Number,
  co2_including_luc_per_unit_energy: Number,
  co2_per_capita: Number,
  co2_per_unit_energy: Number,
  coal_co2: Number,
  coal_co2_per_capita: Number,
  consumption_co2: Number,
  consumption_co2_per_capita: Number,
  cumulative_cement_co2: Number,
  cumulative_co2: Number,
  cumulative_co2_including_luc: Number,
  cumulative_coal_co2: Number,
  cumulative_flaring_co2: Number,
  cumulative_gas_co2: Number,
  cumulative_luc_co2: Number,
  cumulative_oil_co2: Number,
  cumulative_other_co2: Number,
  energy_per_capita: Number,
  flaring_co2: Number,
  flaring_co2_per_capita: Number,
  gas_co2: Number,
  gas_co2_per_capita: Number,
  ghg_excluding_lucf_per_capita: Number,
  ghg_per_capita: Number,
  land_use_change_co2: Number,
  land_use_change_co2_per_capita: Number,
  methane: Number,
  methane_per_capita: Number,
  nitrous_oxide: Number,
  nitrous_oxide_per_capita: Number,
  oil_co2: Number,
  oil_co2_per_capita: Number,
  other_co2_per_capita: Number,
  other_industry_co2: Number,
  primary_energy_consumption: Number,
  share_global_cement_co2: Number,
  share_global_co2: Number,
  share_global_co2_including_luc: Number,
  share_global_coal_co2: Number,
  share_global_cumulative_cement_co2: Number,
  share_global_cumulative_co2: Number,
  share_global_cumulative_co2_including_luc: Number,
  share_global_cumulative_coal_co2: Number,
  share_global_cumulative_flaring_co2: Number,
  share_global_cumulative_gas_co2: Number,
  share_global_cumulative_luc_co2: Number,
  share_global_cumulative_oil_co2: Number,
  share_global_cumulative_other_co2: Number,
  share_global_flaring_co2: Number,
  share_global_gas_co2: Number,
  share_global_luc_co2: Number,
  share_global_oil_co2: Number,
  share_global_other_co2: Number,
  share_of_temperature_change_from_ghg: Number,
  temperature_change_from_ch4: Number,
  temperature_change_from_co2: Number,
  temperature_change_from_ghg: Number,
  temperature_change_from_n2o: Number,
  total_ghg: Number,
  total_ghg_excluding_lucf: Number,
  trade_co2: Number,
  trade_co2_share: Number,
})

export const Emission = model('Emission', EmissionSchema)