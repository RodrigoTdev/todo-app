import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'

config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

// Define a Mongoose schema and model
const Schema = mongoose.Schema
const dataSchema = new Schema({
  title: String,
  data: Array,
})
const DataModel = mongoose.model('DataModel', dataSchema, 'data')

app.get('/', async (req, res) => {
  try {
    const allData = await DataModel.find()
    res.json(allData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
