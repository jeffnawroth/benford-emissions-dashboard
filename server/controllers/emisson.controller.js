import { Emission } from '../model/Emission.js'

// Get all Country Emissions
async function getEmissions(req, res) {
  try {
    const emissions = await Emission.find()
    res.status(200).json(emissions)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get a single Emission
async function getEmissionsByCountry(req, res) {
  try {
    const { isoCode } = req.params
    const emission = await Emission.find({ iso_code: isoCode })
    res.status(200).json(emission)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { getEmissions, getEmissionsByCountry }
