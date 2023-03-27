import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Navbar } from "../components/navbar/Navbar"
import {
  Login,
  Register,
  AlmacenistaHome,
  InvestigadorHome,
  BalisticoHome,
} from "../pages"
import { PrivateRoute } from "./PrivateRoute"

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="almacenista"
            element={
              <PrivateRoute>
                <AlmacenistaHome />
              </PrivateRoute>
            }
          />
          <Route
            path="balistico"
            element={
              <PrivateRoute>
                <BalisticoHome />
              </PrivateRoute>
            }
          />
          <Route
            path="investigador"
            element={
              <PrivateRoute>
                <InvestigadorHome />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="login" />} />
        </Route>
      </Routes>
    </>
  )
}
