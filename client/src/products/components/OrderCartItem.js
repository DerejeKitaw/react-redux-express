import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUpdateCart } from '../actions/cart'
import formatPrice from '../../modules/formatPrice'

import {Card } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class CartItem extends Component {
  state = {
    src: '',
    zDepth: 1
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, item } = this.props
    const { productId, productQty, name, price, image, total } = item
    return (
      <Card
        style={{ flex: '1 1 auto', margin: '10px 20px' }}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
          <img src={image} alt="" width="100" height="100"/>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flex: '1 1 auto',
          }}>
            <span style={{ flex: '3 3 auto', minWidth: 200, fontSize: '1.5rem', margin: '20px 10px 10px 10px' }}>{name}</span>
            <span style={{ flex: '1 1 auto', fontSize: '1.5rem', textAlign: 'right', margin: '20px 10px 10px 10px', width: 75 }}>{formatPrice(price)}</span>
            <span style={{ flex: '1 1 auto', fontSize: '1.5rem', textAlign: 'right', margin: '20px 10px 10px 10px', width: 75 }}>
              {productQty}
            </span>
            <span style={{ flex: '1 1 auto', textAlign: 'right', fontSize: '1.5rem', width: 75, margin: '20px 10px 10px 10px' }}>{formatPrice(total)}</span>
          </div>
        </div>
      </Card>
    )
  }
}


export default connect()(CartItem)
