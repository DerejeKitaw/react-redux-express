import expect from 'expect'
import request from 'supertest'
import { ObjectID } from 'mongodb'
import uuidV1 from 'uuid/v1'

import app from '../../server'
import ProductModel from '../products/ProductModel'
import CartModel from './CartModel'

const products = [
  { _id: ObjectID('58a52f604d564945a7c722a7'), uuid: uuidV1(), name: 'Test 1 Product', description: 'Test 1 Description', price: 1000 },
  { _id: ObjectID('58a52f604d564945a7c722a8'), uuid: uuidV1(), name: 'Test 2 Product', description: 'Test 2 Description', price: 2000 },
  { _id: ObjectID('58a52f604d564945a7c722a9'), uuid: uuidV1(), name: 'Test 3 Product', description: 'Test 3 Description', price: 3000 }
]
const carts = [
  { _id: new ObjectID(), uuid: uuidV1(), productId: products[0]._id, productQty: 6 },
  { _id: new ObjectID(), uuid: uuidV1(), productId: products[1]._id, productQty: 9 },
]

const populateProducts = (done) => {
  ProductModel.remove({}).then(() => {
    const productOne = new ProductModel(products[0]).save()
    const productTwo = new ProductModel(products[1]).save()
    const productThree = new ProductModel(products[2]).save()
    return Promise.all([productOne, productTwo, productThree])
  }).then(() => done())
}

const populateCarts = (done) => {
  CartModel.remove({}).then(() => {
    return CartModel.insertMany(carts)
  }).then(() => done())
}

beforeEach(populateProducts)
beforeEach(populateCarts)



describe('POST /api/carts', () => {
  it('should create a new cart', (done) => {
    const cart = { uuid: products[2].uuid, productId: products[2]._id, productQty: 12 }
    request(app)
      .post('/api/carts')
      .send(cart)
      .expect(200)
      .expect((res) => {
        expect(res.body.productId).toBe(cart.productId.toHexString())
        expect(res.body.productQty).toBe(cart.productQty)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        CartModel.find({ productId: cart.productId })
          .then((carts) => {
            expect(carts.length).toBe(1)
            expect(carts[0].productId.toHexString()).toBe(cart.productId.toHexString())
            expect(carts[0].productQty).toBe(cart.productQty)
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should not create cart with invalid body data', (done) => {
    request(app)
      .post('/api/carts')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        CartModel.find()
          .then((carts) => {
            expect(carts.length).toBe(2)
            done()
          })
          .catch(err => done(err))
      })
  })
})

describe('GET /api/carts', () => {
  it('should get all carts', (done) => {
    request(app)
      .get('/api/carts')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /api/carts/:id', () => {
  it('should return cart doc', (done) => {
    request(app)
      .get(`/api/carts/${carts[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.cart.productQty).toBe(carts[0].productQty)
      })
      .end(done)
  })
  it('should return 404 if cart not found', (done) => {
    const hexId = new ObjectID().toHexString()
    request(app)
      .get(`/api/carts/${hexId}`)
      .expect(404)
      .end(done)
  })
  it('should return 404 for non-object ids', (done) => {
    const id = '123abc'
    request(app)
      .get(`/api/carts/${id}`)
      .expect(404)
      .end(done)
  })
})


describe('DELETE /carts/:_id', () => {
  it('should delete a cart', (done) => {
    const hexId = carts[1]._id.toHexString()
    request(app)
      .delete(`/api/carts/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.cart._id).toBe(hexId)
      })
      .end((err) => {
        if (err) return done(err)
        CartModel.findById(hexId)
          .then((cart) => {
            expect(cart).toNotExist()
            done()
          })
          .catch(err => done(err))
      })
  })
  it('should return 404 if cart not found', (done) => {
    const hexId = new ObjectID().toHexString()
    request(app)
      .delete(`/api/carts/${hexId}`)
      .expect(404)
      .end(done)
  })
  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/carts/123abc')
      .expect(404)
      .end(done)
  })
})

describe('PATCH /api/carts/:_id', () => {
  it('should update the cart', (done) => {
    const hexId = carts[0]._id.toHexString()
    const update = {
      productId: products[2]._id,
      productQty: 99
    }
    request(app)
      .patch(`/api/carts/${hexId}`)
      .send(update)
      .expect(200)
      .expect((res) => {
        expect(res.body.cart.productId).toBe(update.productId.toHexString())
        expect(res.body.cart.productQty).toBe(update.productQty)
      })
      .end(done)
  })
})
