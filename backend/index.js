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
  title: { type: String, required: true },
  data: { type: Array, required: true },
  date: { type: String, default: new Date().toLocaleString() },
  id: { type: Number, required: true },
})
const DataModel = mongoose.model('DataModel', dataSchema, 'data')

app.get('/api/data', async (req, res) => {
  try {
    const allData = await DataModel.find().sort({ id: 1 })
    res.json(allData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create a new project
app.post('/api/data', async (req, res) => {
  const { title, id } = req.body

  const newTitle = title

  const data = {
    title: newTitle,
    data: [
      {
        id: 0,
        title: 'TODO',
        data: [],
      },
      {
        id: 1,
        title: 'IN PROGRESS',
        data: [],
      },
      {
        id: 2,
        title: 'DONE',
        data: [],
      },
    ],
    id: id,
  }

  const newData = new DataModel(data)
  try {
    const savedData = await newData.save()
    res.json(savedData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.patch('/api/projects', async (req, res) => {
  // TODO: Editar lista de proyectos
})

app.put('/api/tasks', async (req, res) => {
  // TODO: Agregar tareas
  const { _id, title, data, date, __v } = req.body
  const newData = { _id, title, data, date, __v }

  try {
    const savedData = await DataModel.updateOne({ _id }, newData)
    res.json(savedData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.patch('/api/tasks', async (req, res) => {
  // TODO: Editar lista de tareas
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
