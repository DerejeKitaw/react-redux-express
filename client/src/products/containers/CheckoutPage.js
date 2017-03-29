import React from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Checkout from '../components/Checkout'

const CheckoutPage = ({ total, cart }) => (
  <div className="android-more-section">
    <div className="mdl-grid portfolio-max-width portfolio-contact">
      <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">Checkout {total}</h2>
        </div>
        <Checkout total={total} cart={cart} />
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  total: state.cart.total,
  cart: state.cart.items
})

export default connect(mapStateToProps)(CheckoutPage)
