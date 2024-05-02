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
  idMio: { type: Number, required: true },
})
const DataModel = mongoose.model('DataModel', dataSchema, 'data')

app.get('/api/data', async (req, res) => {
  try {
    // const allData = await DataModel.find().sort({ idMio: 1 })
    const allData = await DataModel.find()
    res.json(allData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create a new project
app.post('/api/data', async (req, res) => {
  const { title, idMio } = req.body

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
    idMio: idMio,
  }

  const newData = new DataModel(data)
  try {
    const savedData = await newData.save()
    res.json(savedData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Re order project list
app.post('/api/projects', async (req, res) => {
  const newDocuments = req.body

  try {
    await DataModel.deleteMany({})
    const nuevosDocumentosInsertados = await DataModel.insertMany(newDocuments)
    res.json(nuevosDocumentosInsertados)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.patch('/api/projects', async (req, res) => {
  // TODO: Editar lista de proyectos
})

app.delete('/api/projects', async (req, res) => {
  // TODO: Eliminar proyecto
  const { _id } = req.body

  try {
    const deletedData = await DataModel.deleteOne({ _id })
    res.json(deletedData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
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
  // TODO: Editar lista de tareas DnD
  const { _id, title, data, date, __v } = req.body
  const newData = { _id, title, data, date, __v }

  try {
    const savedData = await DataModel.updateOne({ _id }, newData)
    res.status(200).json(savedData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.patch('/api/tasks/delete', async (req, res) => {
  // TODO: Eliminar tarea
  const newData = req.body
  try {
    const updateData = await DataModel.findOneAndUpdate(
      { _id: newData._id },
      newData
    )
    res.json(updateData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
