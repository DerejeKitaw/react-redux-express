import React from 'react'
import { connect } from 'react-redux'
import AdminProduct from './AdminProduct'
import AdminProductAdd from './AdminProductAdd'

const filterProducts = (products, searchText) => {
  const filteredProducts = products.filter(product => {
    const name = product.name.toLowerCase()
    return searchText.length === 0 || name.indexOf(searchText.toLowerCase()) > -1
  })
  return filteredProducts
}

const styles = {
  grid: {
    display: 'flex',
    flexFlow: 'row wrap',
  }
}

const AdminProductList = ({ products, searchProducts }) => (
  products.length > 0 ?
  <div style={styles.grid}>
    <AdminProductAdd key={1}/>
    {filterProducts(products, searchProducts).map(product => (
      <AdminProduct
        key={product._id}
        {...product}
        initialValues={product}
      />
    ))}
  </div> :
  <div><p className="container__message">No products yet</p></div>
)

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(AdminProductList)
