// Constants:
export const AUTH_ACTION_TYPES = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

export const _login = value => ({
  type: AUTH_ACTION_TYPES.LOGIN,
  payload: value
})

export const _logout = value => ({
  type: AUTH_ACTION_TYPES.LOGOUT,
  payload: value
})
