import { Schema, model } from 'mongoose'

const CO2EmissionSchema = new Schema({
  country: { type: String, required: true },
  iso_code: { type: String },
  year: { type: Number, required: true },
  co2: { type: Number, required: true },
})

export const CO2Emission = model('CO2Emission', CO2EmissionSchema, 'co2_emissions')
