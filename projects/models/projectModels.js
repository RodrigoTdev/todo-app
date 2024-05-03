import mongoose from 'mongoose'

// Define a Mongoose schema and model
const Schema = mongoose.Schema
const dataSchema = new Schema({
  title: { type: String, required: true },
  data: { type: Array, required: true },
  date: { type: String, default: new Date().toLocaleString() },
  idMio: { type: Number, required: true },
})
export const DataModel = mongoose.model('DataModel', dataSchema, 'data')
