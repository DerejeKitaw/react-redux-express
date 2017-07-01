import React from 'react'
import { connect } from 'react-redux'

import ProfileForm from '../components/ProfileForm'
import AddressAdd from '../components/AddressAdd'
import AddressList from '../components/AddressList'
import OrderList from '../../orders/components/OrderList'

const Profile = ({ user, initialValues, addresses, orders, brand }) => {
  const fontFamily = brand.theme.fontFamily || null
  const color = brand.theme.textColor || null
  return (
    <section>
      <h1 style={{ fontFamily, color }}>Profile</h1>
      <ProfileForm user={user} initialValues={initialValues} />
      <br/>
      <h1 style={{ fontFamily, color }}>Addresses</h1>
      <AddressList items={addresses} />
      <AddressAdd user={user} />
      <br/>
      <h1 style={{ fontFamily, color }}>Orders</h1>
      <OrderList orders={orders} fontFamily={fontFamily} color={color}/>
    </section>
  )
}

const mapStateToProps = ({ user, orders, brand }) => ({
  isFetching: user.isFetching,
  user,
  initialValues: user.values,
  addresses: user.addresses,
  orders: orders.items,
  brand
})

export default connect(mapStateToProps)(Profile)
