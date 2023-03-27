import React from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import './navbar.css'

export const Navbar = () => {
  const { state } = useLocation()
  return (
    <>
      <header>
        <h1>
          <Link to="/"></Link>Seize Info
        </h1>

        {state?.logged ? (
          <div>
            <button className="btn-logout">Cerrar sesi&oacute;n</button>
          </div>
        ) : (
          <nav>
            <Link to="/login">Iniciar sesi&oacute;n</Link>
            <Link to="/register">Registrarse</Link>
          </nav>
        )}
      </header>
      <Outlet />
    </>
  )
}
