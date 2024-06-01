import { Schema, model } from 'mongoose'

const GHGEmissionSchema = new Schema({
  country: { type: String, required: true },
  iso_code: { type: String },
  year: { type: Number, required: true },
  total_ghg: { type: Number, required: true },
})

export const GHGEmission = model('GHGEmission', GHGEmissionSchema, 'ghg_emissions')
