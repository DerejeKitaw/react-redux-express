import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './App'

// Page
import Page from './pages/containers/Page'
import AdminPage from './pages/containers/AdminPage'
import AdminPageEdit from './pages/containers/AdminPageEdit'

// User
import RequireAuth from './users/components/RequireAuth'
import Signup from './users/components/Signup'
import Signin from './users/components/Signin'
import Signout from './users/components/Signout'
import Recover from './users/components/Recover'
import Contact from './users/components/Contact'
import ProfilePage from './users/containers/ProfilePage'

// Product
import TodosPage from './todos/components/TodosPage'
import ProductsPage from './products/containers/ProductsPage'
import ProductPage from './products/containers/ProductPage'
import AdminProductsPage from './products/containers/AdminProductsPage'
import CartPage from './products/containers/CartPage'
import CheckoutPage from './products/containers/CheckoutPage'


export default history => (
  <Router history={history}>
    <Route path="/" component={App}>
      {/* Page */}
      <IndexRoute page="home" component={Page} />
      <Route path="admin/pages/:slug" component={AdminPageEdit} />
      <Route path="admin/pages" component={AdminPage} />

      {/* User */}
      <Route path="signup" component={Signup} />
      <Route path="signin" component={Signin} />
      <Route path="signout" component={Signout} />
      <Route path="recover" component={Recover} />
      <Route path="contact" component={Contact} />
      <Route path="profile" component={ProfilePage} />

      {/* Product */}
      <Route path="todos" component={RequireAuth(TodosPage, ['user', 'admin'])} />
      <Route path="products" component={ProductsPage} />
      <Route path="product/:slug" component={ProductPage} />
      <Route path="admin/products" component={AdminProductsPage} />
      <Route path="cart" component={CartPage} />
      <Route path="checkout" component={RequireAuth(CheckoutPage, ['user'])} />

    </Route>
  </Router>
)
