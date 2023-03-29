import React from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import "./navbar.css"

export const Navbar = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const onLogout = (e) => {
    e.preventDefault()
    navigate("/login", {
      replace: true,
    })
  }
  return (
    <>
      <header>
        <h1>
          <Link to="/"></Link>Seize Info
        </h1>

        {state?.logged ? (
          <div>
            <button className="btn btn-primary btn-logout" onClick={onLogout}>
              Cerrar sesi&oacute;n
            </button>
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
