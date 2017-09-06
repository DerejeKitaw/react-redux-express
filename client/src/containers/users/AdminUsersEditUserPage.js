import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AddressesForm from '../../components/addresses/AddressesForm'
import OrderList from '../../components/orders/OrderList'
import H3 from '../../components/typography/H3'
import UserProfileForm from '../../components/user/UserProfileForm'
import UsersRolesForm from '../../components/users/UsersRolesForm'
import * as addressesActions from '../../actions/addresses'
import * as usersActions from '../../actions/users'

class AdminUsersEditUserPage extends Component {
  handleUserValues = (values) => {
    const { dispatch, user: { _id }} = this.props
    return dispatch(usersActions.fetchUpdate(_id, { type: 'UPDATE_VALUES', values }))
  }
  handleUserDelete = () => {
    const { dispatch, user: { _id }} = this.props
    return dispatch(usersActions.fetchDelete(_id))
  }
  handleUserRoles = (values) => {
    const { dispatch, user: { _id }} = this.props
    return dispatch(usersActions.fetchUpdate(_id, { type: 'UPDATE_ROLES', values }))
  }
  handleAddressAdd = (values) => {
    const { dispatch, user } = this.props
    return dispatch(addressesActions.fetchAdminAdd(user._id, { values }))
  }
  handleAddressUpdate = (itemId, values) => {
    const { dispatch, user: { _id } } = this.props
    return dispatch(addressesActions.fetchAdminUpdate(itemId, { values }))
  }
  handleAddressDelete = (itemId) => {
    const { dispatch, user: { _id }} = this.props
    dispatch(addressesActions.fetchAdminDelete(_id, itemId))
  }
  render() {
    const {
      dispatch,
      isFetching,
      orders,
      user
    } = this.props
    return (
      <div className="page">
        <section>
          <H3>Profile for {user.values.email}</H3>
          <UserProfileForm
            dispatch={dispatch}
            form={`user_${user._id}_profile`}
            initialValues={user.values}
            onFormSubmit={this.handleUserValues}
            onDelete={this.handleUserDelete}
            user={user}
          />
          <UsersRolesForm
            user={user}
            form='user_roles'
            handleUserRoles={this.handleUserRoles}
            initialValues={{
              user: user.roles.some(role => role === 'user'),
              admin: user.roles.some(role => role === 'admin'),
              owner: user.roles.some(role => role === 'owner')
            }}
          />
          <AddressesForm
            dispatch={dispatch}
            onAddressAdd={this.handleAddressAdd}
            onAddressUpdate={this.handleAddressUpdate}
            onAddressDelete={this.handleAddressDelete}
            user={user}
          />
          <OrderList
            dispatch={dispatch}
            orders={orders}
          />
        </section>
      </div>
    )
  }
}

AdminUsersEditUserPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  orders: PropTypes.array,
  user: PropTypes.object.isRequired
}

export default connect(
  ({ orders, users }, { params: { userId} }) => ({
    isFetching: orders.isFetching || users.isFetching,
    orders: orders.items.filter(item => item.user === userId),
    user: users.items.find(item => item._id === userId)
  })
)(AdminUsersEditUserPage)