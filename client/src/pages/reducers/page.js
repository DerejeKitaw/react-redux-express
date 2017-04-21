export const pages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      return [
        ...state,
        action.page
      ]
    case 'FETCH_PAGE':
      return action.pages
    case 'UPDATE_PAGE':
    return state.map(page =>
      page._id === action._id ?
        { ...page, ...action.updates } :
        page
      )
    case 'DELETE_PAGE':
      return state.filter(page =>
        page._id !== action._id
      )
    case 'ERROR':
      return [
        ...state,
        action.error
      ]
    default:
      return state
  }
}
