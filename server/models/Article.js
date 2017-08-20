import mongoose, { Schema } from 'mongoose'

import { deleteFile } from '../middleware/s3'

const ArticleSchema = new Schema({
  pageSlug: { type: String },
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  image: {
    src: { type: String, trim: true },
    width: { type: Number, trim: true, default: 650 },
    height: { type: Number, trim: true, default: 433 }
  },
  values: {
    button1Text: { type: String, trim: true },
    button1Link: { type: String, trim: true },
    button2Text: { type: String, trim: true },
    button2Link: { type: String, trim: true },
    flexFlow: { type: String, trim: true, default: 'row wrap' },
    h1Text: { type: String, trim: true, default: 'Heading 1' },
    h2Text: { type: String, trim: true, default: 'Heading 2' },
    h3Text: { type: String, trim: true, default: 'Heading 3' },
    iframe: { type: String, trim: true },
    mediaAlign: { type: String, trim: true, default: 'right' },
    mediaBorder: { type: String, trim: true },
    mediaFlex: { type: String, trim: true, default: '1 1 auto' },
    pText: { type: String, time: true, default: '<p>Paragraph</p>' },
  }
}, {
  timestamps: true
})

ArticleSchema.pre('remove', function(next) {
  const article = this
  if (article.image && article.image.src) {
    deleteFile({ Key: article.image.src }).catch(err => console.error(err))
  }
  next()
})

const Article = mongoose.model('Article', ArticleSchema)

export default Article
