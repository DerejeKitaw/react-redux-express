import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
//import ReactGA from 'react-ga'

import App from './components/app/App'

// Brand
import BrandAdmin from './components/brands/BrandAdmin'

// Page
import Page from './components/pages/Page'
import AdminPages from './components/pages/AdminPages'
import AdminPage from './components/pages/AdminPage'

// User
import CartPage from './components/cart/CartPage'
import RequireAuth from './containers/users/RequireAuth'
import Signup from './components/users/Signup'
import Signin from './components/users/Signin'
import Recovery from './components/users/Recovery'
import Reset from './components/users/Reset'
import ProfilePage from './components/users/ProfilePage'
import RequestEstimate from './components/users/RequestEstimate'

// Product
import ProductPage from './components/products/ProductPage'

//Order
import OrderAdd from './containers/orders/OrderAdd'
import OrderConfirmation from './containers/orders/OrderConfirmation'
import OrderDetailPage from './containers/orders/OrderDetailPage'
import AdminOrderList from './containers/orders/AdminOrderList'
import AdminOrderDetail from './containers/orders/AdminOrderDetail'

import NotFound from './components/not-found/NotFound'

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
      <Route path="admin/pages" component={RequireAuth(AdminPages, ['admin'])} />
      <Route path="admin/pages/:slug" component={RequireAuth(AdminPage, ['admin'])} />


      {/* Brand */}
      <Route path="admin/brand" component={RequireAuth(BrandAdmin, ['admin'])} />

      {/* User */}
      <Route path="user/cart" component={CartPage} />
      <Route path="user/signup" component={Signup} />
      <Route path="user/signin" component={Signin} />
      <Route path="user/recovery" component={Recovery} />
      <Route path="user/reset/:token" component={Reset} />
      <Route path="user/profile" component={RequireAuth(ProfilePage, ['admin', 'user'])} />
      <Route path="user/order" component={RequireAuth(OrderAdd, ['user'])} />
      <Route path="user/order/:orderId" component={RequireAuth(OrderConfirmation, ['user'])} />
      <Route path="user/orders/:orderId" component={RequireAuth(OrderDetailPage, ['user'])} />
      <Route path="user/request-estimate" component={RequestEstimate} />

      {/* Product */}
      <Route path="products/:productSlug/:productId" component={ProductPage} />

      {/* Orders */}
      <Route path="admin/orders" component={RequireAuth(AdminOrderList, ['admin'])} />
      <Route path="admin/orders/:orderId" component={RequireAuth(AdminOrderDetail, ['admin'])} />

      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

export default Routing
