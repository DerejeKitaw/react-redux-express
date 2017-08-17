import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'
import Brand from '../models/Brand'
import authenticate from '../middleware/authenticate'
import { uploadFile, deleteFile } from '../middleware/s3'
import moment from 'moment'

const brands = express.Router()

// Create
export const add = (req, res) => {
  const _id = new ObjectID()
  const brand = new Brand({ _id })
  brand.save()
    .then(doc => res.send(doc))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
}

// Read
export const get = (req, res) => {
  Brand.find({})
    .then(doc => res.send(doc))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
}

// By page name
export const getId = (req, res) => {
  const _id = req.params._id
  Brand.find({ _id })
    .then(doc => res.send(doc))
    .catch(error => {
      console.error(error)
      res.status(400).send({ error })
    })
}




// Update AppBar
export const updateAppBar = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { type, image, removeImageSrc, values } = req.body
  const Key = `${process.env.APP_NAME}/brand_${_id}/appBar_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, removeImageSrc)
        .then(data => {
          const update = {

          }
          Brand.findOneAndUpdate(
            { _id },
            { $set: {
              appBar: {
                image: {
                  src: data.Location,
                  width: image.width,
                  height: image.height
                },
                values
              }
            }},
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(error => {
            console.error(error)
            res.status(400).send({ error })
          })
        })
        .catch(error => {
          console.error(error)
          res.status(400).send({ error })
        })
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key: image.src })
        .then(() => {
          Brand.findOneAndUpdate(
            { _id },
            { $set: { 'appBar.image.src': null }},
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(error => {
            console.error(error)
            res.status(400).send({ error })
          })
        })
        .catch(error => {
          console.error(error)
          res.status(400).send({ error })
        })
      break

    case 'UPDATE_VALUES':
      Brand.findOneAndUpdate(
        { _id },
        { $set: { 'appBar.values': values }},
        { new: true }
      )
      .then(doc => res.send(doc))
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
      break

    default:
      return
  }
}



// Update Article
export const updateArticle = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { article: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => {
    console.error(error)
    res.status(400).send()
  })
}

export const updateBusiness = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { business: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => {
    console.error(error)
    res.status(400).send({ error })
  })
}

export const updateBody = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { values } = req.body
  const update = { body: { values } }
  Brand.findOneAndUpdate(
    { _id },
    { $set: { body: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => {
    console.error(error)
    res.status(400).send({ error })
  })
}


export const updateFooter = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { type, image, removeImageSrc, values } = req.body
  const Key = `${process.env.APP_NAME}/brand-${_id}/footer_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  switch (type) {
    case 'UPDATE_IMAGE_AND_VALUES':
      uploadFile({ Key }, image.src, removeImageSrc)
        .then(data => {
          Brand.findOneAndUpdate(
            { _id },
            { $set: {
              footer: {
                image: {
                  src: data.Location,
                  width: image.width,
                  height: image.height
                },
                values
              }
            }},
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(error => {
            console.error(error)
            res.status(400).send({ error })
          })
        })
        .catch(error => {
          console.error(error)
          res.status(400).send({ error })
        })
      break

    case 'DELETE_IMAGE':
      deleteFile({ Key: image.src })
        .then(() => {
          Brand.findOneAndUpdate(
            { _id },
            { $set: { 'footer.image.src': null }},
            { new: true }
          )
          .then(doc => res.send(doc))
          .catch(error => {
            console.error(error)
            res.status(400).send({ error })
          })
        })
        .catch(error => {
          console.error(error)
          res.status(400).send({ error })
        })
      break

    case 'UPDATE_VALUES':
      Brand.findOneAndUpdate(
        { _id },
        { $set: { 'footer.values': values }},
        { new: true }
      )
      .then(doc => {
        res.send(doc)
      })
      .catch(error => {
        console.error(error)
        res.status(400).send({ error })
      })
      break

    default:
      return
  }
}


// Update Theme
export const updateTheme = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    fontFamily,
    primary1Color,
    primary2Color,
    primary3Color,
    accent1Color,
    accent2Color,
    accent3Color,
    textColor,
    secondaryTextColor,
    alternateTextColor,
    canvasColor,
    borderColor,
    disabledColor,
    pickerHeaderColor,
    clockCircleColor,
    shadowColor
  } = req.body.values
  Brand.findOneAndUpdate(
    { _id },
    { $set: {
      theme: {
        fontFamily,
        palette: {
          primary1Color,
          primary2Color,
          primary3Color,
          accent1Color,
          accent2Color,
          accent3Color,
          textColor,
          secondaryTextColor,
          alternateTextColor,
          canvasColor,
          borderColor,
          disabledColor,
          pickerHeaderColor,
          clockCircleColor,
          shadowColor
        }
      }
    }},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => {
    console.error(error)
    res.status(400).send({ error })
  })
}

// Delete
export const remove = (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Brand.findOne(
    { _id }
  )
  .then(_id => res.send(_id))
  .catch(error => {
    console.error(error)
    res.status(400).send({ error })
  })
}




export default brands
