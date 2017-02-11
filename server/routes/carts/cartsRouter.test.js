import expect from 'expect'
import request from 'supertest'
import app from '../../server'
import CartModel from './CartModel'

const carts = [
  { productId: 'A1B2C3', productQty: 1 },
  { productId: 'D4E5F6', productQty: 2 },
  { productId: 'G7H8I9', productQty: 3 },
]

beforeEach((done) => {
  CartModel.remove({})
    .then(() => CartModel.insertMany(carts))
    .then(() => done())
})

describe('POST /api/carts', () => {
  it('should create a new cart', (done) => {
    const productId = 'H10I11J12'
    const productQty = 3
    request(app)
      .post('/api/carts')
      .send({ productId, productQty })
      .expect(200)
      .expect((res) => {
        expect(res.body.productId).toBe(productId)
        expect(res.body.productQty).toBe(productQty)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        CartModel.find({ productId, productQty })
          .then((carts) => {
            expect(carts.length).toBe(1)
            expect(carts[0].productId).toBe(productId)
            expect(carts[0].productQty).toBe(productQty)
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
            expect(carts.length).toBe(3)
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
        expect(res.body.carts.length).toBe(3)
      })
      .end(done)
  })
})
