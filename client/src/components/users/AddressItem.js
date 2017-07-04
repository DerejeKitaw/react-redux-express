import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import AddressForm from './AddressForm'
import SuccessableButton from '../forms/SuccessableButton'
import renderTextField from '../forms/renderTextField'
import { fetchUpdate } from '../../actions/users'

class AddressItem extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { dispatch, error, handleSubmit, item, imageSpec, submitSucceeded, submitting } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
      >
        <form
          onSubmit={handleSubmit((values) => {
            const update = { type: 'UPDATE_ADDRESS', itemId: item._id, values }
            dispatch(fetchUpdate(update))
          })}
          style={{ flex: '1 1 auto' }}
        >
          <AddressForm />
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="ADDRESS"
            />
            <RaisedButton
              type="button"
              label="X"
              className="button delete-button"
              onTouchTap={() => {
                const update = { type: 'DELETE_ADDRESS', itemId: item._id }
                dispatch(fetchUpdate(update))
              }}
            />
          </div>
        </form>
      </Card>
    )
  }
}

AddressItem = compose(
  connect((state, props) => ({
    form: `address_${props.item._id}`
  })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AddressItem)

export default AddressItem
