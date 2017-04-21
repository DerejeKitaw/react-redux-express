import mongoose, { Schema } from 'mongoose'

const PageSchema = new Schema({
  name: {
    type: String,
    minlength: 1,
    trim: true
  },
  contents: { type: Object },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Page = mongoose.model('Page', PageSchema)

export default Page
