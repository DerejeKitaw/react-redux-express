import mongoose, { Schema } from 'mongoose'

const CartModel = mongoose.model('CartModel', {
  _owner: {
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  products: [{
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      minlength: 1,
      trim: true
    },
    productQty: {
      type: Number,
      minlength: 1,
      trim: true
    }
  }]
})

export default CartModel
