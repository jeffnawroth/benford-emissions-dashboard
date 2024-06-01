import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import mongoose from 'mongoose'
import csv from 'csv-parser'
import { CO2Emission as Co2Emission } from '../model/CO2Emission.js'
import { GHGEmission as GhgEmission } from '../model/GHGEmission.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log('MongoDB connected for data import')
    importData().then(() => {
      console.log('Data import completed')
    }).catch((error) => {
      console.error('Error importing data:', error)
    })
  })
  .catch(err => console.log(err))

async function importData() {
  try {
    await Co2Emission.deleteMany({})
    await GhgEmission.deleteMany({})

    await importCSVData('co2_emissions.csv', Co2Emission)
    await importCSVData('ghg_emissions.csv', GhgEmission)
    process.exit(0)
  }
  catch (error) {
    console.error('Error importing data:', error)
    process.exit(1)
  }
}

function importCSVData(filename, Model) {
  return new Promise((resolve, reject) => {
    const records = []
    fs.createReadStream(path.join(__dirname, '..', 'data', filename))
      .pipe(csv())
      .on('data', (row) => {
        records.push(new Model(row))
      })
      .on('end', async () => {
        try {
          await Model.insertMany(records)
          console.log(`${filename} Data Imported`)
          resolve()
        }
        catch (error) {
          reject(error)
        }
      })
      .on('error', reject)
  })
}
