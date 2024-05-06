import process from 'node:process'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import emissionRoute from './routes/emission.routes.js'

const app = express()
const port = process.env.PORT || 8080

// middleware
app.use(cors())

// parse requests of content-type - application/json
app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/emissions', emissionRoute)

const connectionString = process.env.DB_CONNECTION_STRING

mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to Database!')
    app.listen(port, () => {
      console.log(`Server listening on port ${port}!`)
    })
  })
  .catch(err => console.error(err))
