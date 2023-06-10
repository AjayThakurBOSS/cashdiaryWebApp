// Constants:
import { AUTH_ACTION_TYPES } from '../actions/auth'
import { ActionType } from '../constant/action-type'


// State:
export const AUTH_STATE = {
  username: '',
  token: '',
  expiration: ''
}



// Redux:
const authReducer = (state = AUTH_STATE, { type, payload }) => {
  switch (type) {
    case AUTH_ACTION_TYPES.LOGIN:
      return { ...state, ...payload }
    case AUTH_ACTION_TYPES.LOGOUT:
      return { ...state, ...AUTH_STATE }
    default:
      return state
  }
}


// Exports:
export default authReducer

// reducer for password
