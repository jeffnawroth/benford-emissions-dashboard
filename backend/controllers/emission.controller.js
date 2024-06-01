import { CO2Emission } from '../model/CO2Emission.js'
import { GHGEmission } from '../model/GHGEmission.js'

// Get all CO2 emissions
async function getCO2Emissions(req, res) {
  try {
    const co2_emissions = await CO2Emission.find()
    res.status(200).json(co2_emissions)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function getGHGEmissions(req, res) {
  try {
    const ghg_emissions = await GHGEmission.find()
    res.status(200).json(ghg_emissions)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { getCO2Emissions, getGHGEmissions }
