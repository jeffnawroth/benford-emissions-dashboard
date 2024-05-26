import { Schema, model } from 'mongoose'

const CO2EmissionSchema = new Schema({
  country: { type: String, required: true },
  year: { type: Number, required: true },
  iso_code: { type: String, required: true },
  co2: { type: Number, required: true },
})

export const CO2Emission = model('CO2Emission', CO2EmissionSchema, 'co2_emissions')
