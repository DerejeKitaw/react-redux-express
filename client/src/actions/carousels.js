import { SubmissionError } from 'redux-form'

import * as sectionActions from './sections'
import * as pageActions from './pages'

export const type = 'CAROUSEL'
const route = 'carousels'

const START_EDIT = `START_EDIT_${type}`
const STOP_EDIT = `STOP_EDIT_${type}`
const START_EDIT_CHILD = `START_EDIT_CHILD_${type}`
const STOP_EDIT_CHILD = `STOP_EDIT_CHILD_${type}`
const TOGGLE_APP = `TOGGLE_APP_${type}`
const TOGGLE_ADMIN_APP = `TOGGLE_ADMIN_APP_${type}`
const ADD = `ADD_${type}`
const ADD_SUB = `ADD_SUB_${type}`
const REQUEST = `REQUEST_${type}S`
const RECEIVE = `RECEIVE_${type}S`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}`
const DELETES = `DELETE_${type}S`
const ERROR = `ERROR_${type}`

// Create
const fetchAddSuccess = (carousel, editSlide) => ({ type: ADD, carousel, editSlide })
const fetchAddFailure = (error) => ({ type: ERROR, error })
export const fetchAdd = (add) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(add)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        const { carousel, page, section, slideId } = json
        const editSlide = carousel.slides.find(item => item._id === slideId)
        if (page) dispatch(pageActions.fetchUpdateSuccess(page))
        if (section) dispatch(sectionActions.fetchUpdateSuccess(section))
        dispatch(fetchAddSuccess(carousel, editSlide))
      })
      .catch(err => {
        console.log(err)
        dispatch(fetchAddFailure(err))
        throw new SubmissionError({ error: err.error, _error: err.error })
    })
  }
}


// Add Sub
const fetchAddSubSuccess = (carousel, editSlide) => ({ type: ADD, carousel, editSlide })
const fetchAddSubFailure = (error) => ({ type: ERROR, error })
export const fetchAddSub = (carouselId) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}/${carouselId}/add`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        const { carousel, slideId } = json
        const editSlide = carousel.slides.find(item => item._id === slideId)
        dispatch(fetchAddSubSuccess(carousel, editSlide))
      })
      .catch(err => {
        console.log(err)
        dispatch(fetchAddSubFailure(err))
        throw new SubmissionError({ error: err.err, _error: err.err })
      })
  }
}



// Read
const fetchCarouselsRequest = () => ({ type: REQUEST })
const fetchCarouselsSuccess = (items) => ({ type: RECEIVE, items })
const fetchCarouselsFailure = (error) => ({ type: ERROR, error })
export const fetchCarousels = () => {
  return (dispatch, getState) => {
    dispatch(fetchCarouselsRequest())
    return fetch(`/api/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(json => {
      if (json.error) return Promise.reject(json.error)
      if (json.length && window.location.pathname === '/') {
        dispatch(toggleAppCarousel(true))
      }
      return dispatch(fetchCarouselsSuccess(json))
    })
    .catch(err => {
      console.log(err)
      dispatch(fetchCarouselsFailure(err))
      throw new SubmissionError({ ...err, _error: 'Update failed!' })
    })
  }
}



// Update
const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateFailure = (error) => ({ type: ERROR, error })
export const fetchUpdate = (carouselId, update) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}/${carouselId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchUpdateSuccess(json))
      })
      .catch(err => {
        console.log(err)
        dispatch(fetchUpdateFailure(err))
        throw new SubmissionError({ error: err.err, _error: err.err })
      })
  }
}

// Update Sub
const fetchUpdateSubSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateSubFailure = (error) => ({ type: ERROR, error })
export const fetchUpdateSub = (carouselId, slideId, update) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}/${carouselId}/update/${slideId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchUpdateSubSuccess(json))
      })
      .catch(err => {
        console.log(err)
        dispatch(fetchUpdateSubFailure(err))
        throw new SubmissionError({ error: err.err, _error: err.err })
      })
  }
}



// Delete
const fetchDeleteSuccess = (_id) => ({ type: DELETE, _id })
const fetchDeleteFailure = (error) => ({ type: ERROR, error })
export const fetchDelete = (carouselId) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}/${carouselId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(json => {
      if (json.error) return Promise.reject(json.error)
      const { carousel, section } = json
      dispatch(sectionActions.fetchUpdateSuccess(section))
      dispatch(fetchDeleteSuccess(carousel._id))
    })
    .catch(err => {
      dispatch(fetchDeleteFailure(err))
      throw new SubmissionError({ error: err, _error: 'Delete failed!' })
    })
  }
}

// Delete
const fetchDeleteSubSuccess = (_id) => ({ type: DELETE, _id })
const fetchDeleteSubFailure = (error) => ({ type: ERROR, error })
export const fetchDeleteSub = (carouselId, slideId) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}/${carouselId}/remove/${slideId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(json => {
      if (json.error) return Promise.reject(json.error)
      const { carousel, section } = json
      dispatch(sectionActions.fetchUpdateSuccess(section))
      dispatch(fetchDeleteSubSuccess(carousel._id))
    })
    .catch(err => {
      dispatch(fetchDeleteSubFailure(err))
      throw new SubmissionError({ error: err, _error: 'Delete failed!' })
    })
  }
}


export const deletes = (items) => ({ type: DELETES, items })

export const toggleAppCarousel = (appOpen) => ({ type: TOGGLE_APP, appOpen })
export const toggleAdminAppCarousel = (adminAppOpen) => ({ type: TOGGLE_ADMIN_APP, adminAppOpen })

export const startEditCarousel = (editCarouselId) => ({ type: START_EDIT, editCarouselId })
export const stopEditCarousel = (editCarouselId) => ({ type: STOP_EDIT, editCarouselId })

export const startEditSlide = (editSlide) => ({ type: START_EDIT_CHILD, editSlide })
export const stopEditSlide = () => ({ type: STOP_EDIT_CHILD })
