import mongoose, { Schema } from 'mongoose'
// Schema
const reportSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
})

export const ReportModel = mongoose.model('Report', reportSchema)
