import React from "react"
import { useForm } from "../../hook/useForm"
import "./register.css"
import { useLocation, useNavigate } from "react-router-dom"
import LOGO from "../../assets/logo_seize.png"

export const Register = (props) => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const { name, user, pass, pass2, onInputChange, onResetForm } = useForm({
    name: "",
    user: "",
    pass: "",
    pass2: "",
  })

  const onRegister = (e) => {
    e.preventDefault()
    navigate("/register", {
      replace: true,
      state: {
        error: true,
      },
    })
    onResetForm()
  }

  return (
    <section className="register">
      <div className="register__container">
        <div className="register__image">
          <div className="register__image-img">
            {/* <img src={BANNER} alt="policia usando computadora" /> */}
          </div>
        </div>
        <div className="register__container-box">
          <div className="register__cover">
          <div className="register__title">
              <img src={LOGO} alt="" />
              <h1>Portal de incautaci&oacute;n de armas</h1>
            </div>
            {state?.error && (
              <div className="error-form">
                No se ha podido registrar el usuario
              </div>
            )}
            <div className="register__container-form">
              <form onSubmit={onRegister} className="register__form">
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
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  id="name"
                  onChange={onInputChange}
                  value={name}
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
                <input
                  required
                  type="password"
                  placeholder="Confirme Contrase&ntilde;a"
                  name="pass2"
                  id="pass2"
                  onChange={onInputChange}
                  value={pass2}
                  autoComplete="off"
                />
                <button type="submit" className="btn btn-primary">
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
