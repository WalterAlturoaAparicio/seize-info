import React from "react"
import { Navigate, useLocation } from "react-router-dom"

export const PrivateRoute = ({ children }) => {
  const { state } = useLocation()
  console.log(state?.logged)
  return state?.logged ? children : <Navigate to="/login" />
}
