import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import Product from '../components/Product'

const ProductPage = ({ product }) => {
  return (
    <main>
      <h3>Products</h3>
      <Product {...product} />
    </main>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.products.find(pro => pro._id === ownProps.params.productId))
  return {
    product: state.products.find(pro => pro._id === ownProps.params.productId)
  }
}

export default connect(mapStateToProps)(ProductPage)
