import { ObjectID } from 'mongodb'
import url from 'url'

import Page from '../models/Page'
import slugIt from '../utils/slugIt'


export const add = (req, res) => {
  const { name } = req.body
  Page.findOne({ name })
  .then(doc => {
    if (!doc) {
      const newDoc = new Page({
        slug: slugIt(name),
        values: { name }
      })
      newDoc.save()
      .then(doc => res.send(doc))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    } else {
      return res.status(400).send({ error: 'That name already exists' })
    }
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const get = (req, res) => {
  Page.find({})
  .then(pages => res.send(pages))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const update = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { values } = req.body
  const slug = slugIt(values.name)
  Page.findOneAndUpdate(
    { _id },
    { $set: { slug, values }},
    { new: true }
  )
  .populate({
    path: 'sections',
    populate: { path: 'items.item' }
  })
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const updateWithBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    newImage,
    oldImageSrc,
    pageSlug,
    values
  } = req.body
  const rootUrl = req.get('host')
  const Key = `${rootUrl}/page-${pageSlug}-background-image-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key }, newImage.src, oldImageSrc)
  .then(data => {
    Page.findOneAndUpdate(
      { _id },
      { $set: {
        backgroundImage: {
          src: data.Location,
          width: newImage.width,
          height: newImage.height
        },
        values
      }},
      { new: true }
    )
    .then(doc => {
      Page.findOne({ _id: doc.page })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
}



export const updateWithDeleteBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    oldImageSrc,
    pageSlug,
    type,
    values
  } = req.body
  return deleteFile({ Key: oldImageSrc })
  .then(() => {
    Page.findOneAndUpdate(
      { _id },
      { $set: { 'backgroundImage.src': null }},
      { new: true }
    )
    .then(doc => {
      Page.findOne({ _id: doc.page })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
}



export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Page.findOneAndRemove({ _id })
  .then(page => res.send(page))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
