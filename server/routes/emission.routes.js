import express from 'express'
import { getEmissions, getEmissionsByCountry } from '../controllers/emisson.controller.js'

const router = express.Router()

// GET
router.get('/', getEmissions)
router.get('/:isoCode', getEmissionsByCountry)

export default router
