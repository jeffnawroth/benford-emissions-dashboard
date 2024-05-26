import express from 'express'
import { getCO2Emissions, getGHGEmissions } from '../controllers/emission.controller.js'

const router = express.Router()

// GET
router.get('/co2_emissions', getCO2Emissions)
router.get('/ghg_emissions', getGHGEmissions)

export default router
