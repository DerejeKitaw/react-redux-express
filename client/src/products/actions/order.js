
/* global Stripe */
import { getStripeToken } from '../../stripe/getStripeToken'
import { SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'

import { fetchDeleteCart } from './cart'


const fetchAddOrderSuccess = (item) => ({ type: 'ADD_ORDER', item })
const fetchAddOrderFailure = (error) => ({ type: 'ERROR_ORDER', error })
export const fetchAddOrder = (values) => {
  return (dispatch, getState) => {
    Stripe.setPublishableKey('pk_test_TAIO4tEnJzNuQkmjuWwcznSK')
    const cart = getState().cart
    const { number, exp, cvc, firstname, lastname, address, zip, state } = values
    const expiration = exp.split('/')
    const exp_month = parseInt(expiration[0], 10)
    const exp_year = parseInt(expiration[1], 10)
    const card = { number, exp_month, exp_year, cvc }
    return getStripeToken(card)
      .then(token => {
        fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth': localStorage.getItem('token')
          },
          body: JSON.stringify({ token, cart, firstname, lastname, address, zip, state })
        })
          .then(res => {
            if (res.ok) return res.json()
            throw new Error('Network response was not ok.')
          })
          .then(json => {
            if (json.error) return Promise.reject(json.error)
            console.log(json)
            dispatch(fetchAddOrderSuccess(json))
            dispatch(fetchDeleteCart())
            dispatch(push(`/order/${json._id}`))
          })
          .catch(err => {
                        console.log(err)
            dispatch(fetchAddOrderFailure(err))
            throw new SubmissionError({ ...err, _error: err })
          })
      })
  }
}









const fetchOrdersRequest = () => ({ type: 'REQUEST_ORDERS' })
const fetchOrdersSuccess = (items) => ({ type: 'RECEIVE_ORDERS', items })
const fetchOrdersFailure = (error) => ({ type: 'ERROR_ORDER', error })
export const fetchOrders = () => {
  return (dispatch, getState) => {
    dispatch(fetchOrdersRequest())
    return fetch('/api/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Network response was not ok.')
      })
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchOrdersSuccess(json))
      })
      .catch(err => dispatch(fetchOrdersFailure(err)))
  }
}
