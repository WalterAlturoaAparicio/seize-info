import React from "react"
import { useForm } from "../../hook/useForm"
import "./login.css"
import { useLocation, useNavigate, Link } from "react-router-dom"
import LOGO from "../../assets/logo_seize.png"

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
      <div className="login__container">
        <div className="login__image">
          <div className="login__image-img"></div>
        </div>
        <div className="login__container-box">
          <div className="login__cover">
            <div className="login__title">
              <img src={LOGO} alt="" />
              <h1>SIGAI</h1>
              <h4>
                Sistema de Información para la Gesti&oacute;n de Armas de Fuego
                Incautadas
              </h4>
            </div>

            {state?.error && (
              <p className="error-form">
                Error usuario o contrase&ntilde;a incorrectos
              </p>
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
                <div className="login__form-checkbox">
                  <input type="checkbox" />
                  <label>Recordar </label>
                  <a href="/" className="forgot-password">
                    {" "}
                    Olvido su contrase&ntilde;a?
                  </a>
                </div>
                <button type="submit" className="btn btn-primary">
                  Ingresar
                </button>
                <div className="login-register">
                  <p>
                    No tiene cuenta?<Link to="/register"> Registrese</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
