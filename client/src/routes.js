import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App'
import Home from './pages/home/components/Home'
import TodosPage from './todos/components/TodosPage'
import Signup from './users/components/Signup'
import Signin from './users/components/Signin'
import Signout from './users/components/Signout'
import Recover from './users/components/Recover'
import Reset from './users/components/Reset'
import ProductsPage from './products/containers/ProductsPage'
import ProductPage from './products/containers/ProductPage'
import AdminProductsPage from './products/containers/AdminProductsPage'
import AdminHome from './pages/home/components/AdminHome'
import PageAdd from './pages/components/PageAdd'
import PageUpdate from './pages/components/PageUpdate'
import CartPage from './products/containers/CartPage'
import CheckoutPage from './products/containers/CheckoutPage'
import ProfilePage from './users/containers/ProfilePage'

import RequireAuth from './users/components/RequireAuth'

export default history => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="todos" component={RequireAuth(TodosPage, ['user', 'admin'])} />
      <Route path="products" component={ProductsPage} />
      <Route path="product/:slug" component={ProductPage} />
      <Route path="admin/products" component={AdminProductsPage} />
      <Route path="admin/pages/home" component={AdminHome} />
      <Route path="admin/pages/add" component={PageAdd} />
      <Route path="admin/pages/update/:_id" component={PageUpdate} />
      <Route path="cart" component={CartPage} />
      <Route path="checkout" component={RequireAuth(CheckoutPage, ['user'])} />
      <Route path="signup" component={Signup} />
      <Route path="signin" component={Signin} />
      <Route path="signout" component={Signout} />
      <Route path="recover" component={Recover} />
      <Route path="profile" component={ProfilePage} />
    </Route>
  </Router>
)
