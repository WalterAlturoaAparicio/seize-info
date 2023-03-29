import React from "react"
import { useForm } from "../../hook/useForm"
import "./login.css"
import { useLocation, useNavigate } from "react-router-dom"
import BANNER from "../../assets/banner.png"

const routes = {
  almacenista: "/almacenista",
  balistico: "/balistico",
  investigador: "/investigador",
}

const users = {
  almacenista: "almacenista",
  balistico: "balistico",
  investigador: "investigador",
}

export const Login = (props) => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const { user, pass, onInputChange, onResetForm } = useForm({
    user: "",
    pass: "",
  })

  const onLogin = (e) => {
    e.preventDefault()
    if (users[user] && users[user] === pass) {
      navigate(routes[user], {
        replace: true,
        state: {
          logged: true,
        },
      })
      onResetForm()
    } else {
      navigate("/login", {
        replace: true,
        state: {
          error: true,
        },
      })
      onResetForm()
    }
  }

  return (
    <section className="login">
      <div className="container login__container">
        <div className="login__image">
          <div className="login__image-img">
            <img src={BANNER} alt="policia usando computadora" />
          </div>
        </div>
        <div className="login__container-box">
          <div className="login__cover">
            <h1>Login</h1>
            {state?.error ? (
              <div className="error-user">
                Error usuario o contrase&ntilde;a incorrectos
              </div>
            ) : (
              <>
                <div> </div>
              </>
            )}
            <div className="login__container-form">
              <form onSubmit={onLogin} className="login__form">
                <input
                  required
                  type="text"
                  placeholder="Usuario"
                  name="user"
                  id="user"
                  onChange={onInputChange}
                  value={user}
                  autoComplete="off"
                />
                <input
                  required
                  type="password"
                  placeholder="Contrase&ntilde;a"
                  name="pass"
                  id="pass"
                  onChange={onInputChange}
                  value={pass}
                  autoComplete="off"
                />
                <button type="submit" className="btn btn-primary">
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
