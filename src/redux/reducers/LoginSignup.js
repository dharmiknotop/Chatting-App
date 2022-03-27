import { authConstanst, UserConstanst } from '../constants/constants'

const initState = {
  firstName: '',
  lastName: '',
  email: '',
  authenticating: false,
  authenticated: false,
  error: null,
  users: [],
}

export default (state = initState, action) => {
  console.log(action)

  switch (action.type) {
    case `${authConstanst.USER_LOGIN}_REQUEST`:
    case `${UserConstanst.GET_DATA_USERS}_REQUEST`:
      state = {
        ...state,
        authenticating: true,
      }
      break
    case `${authConstanst.USER_LOGIN}_SUCCESS`:
    case `${UserConstanst.GET_DATA_USERS}_SUCCESS`:
      console.log(action.payload.user)
      state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
        users: [...state.users, action.payload],
      }
      break
    case `${authConstanst.USER_LOGIN}_FAILURE`:
    case `${UserConstanst.GET_DATA_USERS}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error,
      }
      break
    case `${authConstanst.USER_LOGOUT}_REQUEST`:
      break
    case `${authConstanst.USER_LOGOUT}_SUCCESS`:
      state = {
        ...initState,
      }
      break
    case `${authConstanst.USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      }
      break
  }

  return state
}
