import React from 'react'
import { connect } from 'react-redux'

import AdminProductList from '../components/AdminProductList'
import AdminProductAdd from '../components/AdminProductAdd'

const imageSize = {
  width: 900,
  height: 600
}
const placeholdIt = `https://placehold.it/${imageSize.width}x${imageSize.height}`

const AdminProducts = ({ isFetching, items }) => (
  isFetching ? null :
  <main>
    <section><h1>Products Admin</h1></section>
    <section><AdminProductAdd imageSize={imageSize} placeholdIt={placeholdIt} /></section>
    <AdminProductList items={items} imageSize={imageSize} placeholdIt={placeholdIt} />
  </main>
)

const mapStateToProps = ({ products }) => ({
  isFetching: products.isFetching,
  items: products.items
})


export default connect(mapStateToProps)(AdminProducts)
