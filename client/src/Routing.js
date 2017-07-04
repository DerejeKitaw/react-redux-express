import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
//import ReactGA from 'react-ga'

import App from './App'

// Brand
import AdminBrand from './containers/brand/AdminBrand'

// Page
import Page from './containers/pages/Page'
import AdminPage from './containers/pages/AdminPage'
import AdminPageEdit from './containers/pages/AdminPageEdit'

// User
import Cart from './containers/cart/Cart'
import RequireAuth from './components/users/RequireAuth'
import Signup from './components/users/Signup'
import Signin from './components/users/Signin'
import Recovery from './components/users/Recovery'
import Reset from './components/users/Reset'
import Profile from './containers/users/Profile'
import RequestEstimate from './components/users/RequestEstimate'

// Product
import Product from './containers/products/Product'

//Order
import OrderAdd from './containers/orders/OrderAdd'
import Orders from './containers/orders/Orders'
import OrderConfirmation from './containers/orders/OrderConfirmation'
import OrderDetail from './containers/orders/OrderDetail'
import AdminOrders from './containers/orders/AdminOrders'
import AdminOrderDetail from './containers/orders/AdminOrderDetail'

import NotFound from './components/NotFound'

// Google Analytics
// ReactGA.initialize('UA-100349397-1')
// const logPageView = () => {
//   ReactGA.set({ page: window.location.pathname + window.location.search })
//   ReactGA.pageview(window.location.pathname + window.location.search)
// }

const Routing = ({ history }) => (
  <Router history={history} /*onUpdate={logPageView}*/>
    <Route path="/" component={App}>

      {/* Page */}
      <IndexRoute component={Page} />
      <Route path=":slug" component={Page} />
      <Route path="admin/pages" component={RequireAuth(AdminPage, ['admin'])} />
      <Route path="admin/pages/:slug" component={RequireAuth(AdminPageEdit, ['admin'])} />


      {/* Brand */}
      <Route path="admin/brand" component={RequireAuth(AdminBrand, ['admin'])} />

      {/* User */}
      <Route path="user/cart" component={Cart} />
      <Route path="user/signup" component={Signup} />
      <Route path="user/signin" component={Signin} />
      <Route path="user/recovery" component={Recovery} />
      <Route path="user/reset/:token" component={Reset} />
      <Route path="user/profile" component={RequireAuth(Profile, ['admin', 'user'])} />
      <Route path="user/order" component={RequireAuth(OrderAdd, ['user'])} />
      <Route path="user/order/:orderId" component={RequireAuth(OrderConfirmation, ['user'])} />
      <Route path="user/orders" component={RequireAuth(Orders, ['user'])} />
      <Route path="user/orders/:orderId" component={RequireAuth(OrderDetail, ['user'])} />
      <Route path="user/request-estimate" component={RequestEstimate} />

      {/* Product */}
      <Route path="products/:product/:productId" component={Product} />

      {/* Orders */}
      <Route path="admin/orders" component={RequireAuth(AdminOrders, ['admin'])} />
      <Route path="admin/orders/:orderId" component={RequireAuth(AdminOrderDetail, ['admin'])} />

      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

export default Routing
