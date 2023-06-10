// Packages:
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


// Constants:
import ROUTES from '../routes'


// Functions:
const PrivateRoute = () => {
  const token = useSelector(state => state.auth.token)
  let auth = { 'token': token.length > 0 ? true : false }
  return (
    auth.token ? <Outlet /> : <Navigate to={ ROUTES.LOGIN } />
  )
}


// Exports:
export default PrivateRoute
