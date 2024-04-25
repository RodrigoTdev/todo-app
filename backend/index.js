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
const dataSchema = new Schema([
  {
    title: String,
    data: Array,
  },
])
const DataModel = mongoose.model('DataModel', dataSchema, 'data')

app.get('/api/data', async (req, res) => {
  try {
    const allData = await DataModel.find()
    res.json(allData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/api/data', async (req, res) => {
  // TODO - Arreglar porque solo cambia el primer documento
  const { title, data } = req.body
  const newData = new DataModel({ title, data })
  try {
    const savedData = await newData.save()
    res.json(savedData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/api/data', async (req, res) => {
  const [{ title, data }, { title1, data1 }, { title2, data2 }] = req.body
  const newData = new DataModel([
    { title, data },
    { title1, data1 },
    { title2, data2 },
  ])
  console.log(newData)
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
