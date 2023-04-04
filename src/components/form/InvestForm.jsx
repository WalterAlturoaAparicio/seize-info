import React, { useEffect, useState } from "react"
import { useForm } from "../../hook/useForm"
import "./form.css"

const weapon_types = [
  "Pistola",
  "Revolver",
  "Fusil",
  "Ametralladora",
  "Escopeta",
  "Carabina",
  "Otra",
]
const weapon_calibers = [
  "5.56mm",
  "5.7mm",
  "9mm",
  ".22",
  ".32",
  ".38",
  ".40",
  "Otro",
]
const weapons = []
const zeroFill = (number, width) => {
  width -= number.toString().length
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number
  }
  return number + "" // siempre devuelve tipo cadena
}
export const InvestForm = (props) => {
  const { toggleModal } = props
  const initialValues = {
    nombre: "",
    cedula: "",
    uni_poli: "",
    telefono: "",
    persona: "investigador",
    persona_nombre: "",
    persona_cedula: "",
    persona_direccion: "",
    persona_telefono: "",
    nunc: "",
    descripcion: "",
    direccion: "",
    fecha_hora: "2023-04-10T00:00",
    delito: "",
    fiscalia: "",
    indiciado_nombre: "",
    indiciado_cedula: "",
    victima_nombre: "",
    victima_cedula: "",
    weapon_type: "",
    weapon_type_other: "",
    weapon_brand: "",
    weapon_serie: "",
    weapon_caliber: "",
    weapon_caliber_other: "",
    weapon_type_ammunition: "",
    weapon_type_ammunition_other: "",
  }
  const { formState, onInputChange } = useForm(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [pag, setPag] = useState(0)

  const registerSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formState))
    setIsSubmit(true)
    console.log(formState.weapon_type)
  }

  const error = {
    campo: "Campo requerido",
    nunc: "Debe tener 22 numeros exactamente",
  }
  const validate = (values) => {
    const errors = {}
    if (!values.nombre) errors.nombre = error.campo
    if (!values.cedula) errors.cedula = error.campo
    if (values.persona === "otra") {
      if (!values.persona_nombre) errors.persona_nombre = error.campo
      if (!values.persona_cedula) errors.persona_cedula = error.campo
    }
    if (!values.nunc) errors.nunc = error.campo
    else if (values.nunc.length !== 22) errors.nunc = error.nunc
    if (!values.delito) errors.delito = error.campo
    if (!values.fiscalia) errors.fiscalia = error.campo
    return errors
  }
  const addPag = () => {
    setPag(pag + 1)
  }
  const subPag = () => {
    setPag(pag - 1)
  }
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) toggleModal()
  })
  return (
    <div className="modal">
      <div className="overlay">
        <div className="invest__container-form">
          <button className="btn btn-close" onClick={toggleModal}></button>
          <form className="invest__form" onSubmit={registerSubmit}>
            <div className="invest__form-inputs">
              <h3 htmlFor="weapon_type">Informaci&oacute;n principal</h3>
              <label htmlFor="consecutivo">Consecutivo</label>
              <input
                type="text"
                name="consecutivo"
                id="consecutivo"
                value={zeroFill(weapons.length + 1, 10)}
                disabled={true}
              />
              <label htmlFor="nombre">
                Funcionario que Incauta/Recibe el arma y/o municiones. (Grado y
                nombre) <span className="input__required">*</span>
              </label>
              <p className="error-form">{formErrors.nombre}</p>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="..."
                onChange={onInputChange}
                value={formState.nombre}
                autoComplete="off"
              />
              <label htmlFor="cedula">
                C&eacute;dula <span className="input__required">*</span>
              </label>
              <p className="error-form">{formErrors.cedula}</p>
              <input
                type="text"
                name="cedula"
                id="cedula"
                placeholder="..."
                onChange={onInputChange}
                value={formState.cedula}
                autoComplete="off"
              />
              <label htmlFor="uni_poli">Unidad Policial</label>
              <input
                type="text"
                placeholder="..."
                name="uni_poli"
                id="uni_poli"
                value={formState.uni_poli}
                onChange={onInputChange}
                autoComplete="off"
              />
              <label htmlFor="telefono_1">Tel&eacute;fono</label>
              <input
                type="number"
                placeholder="..."
                name="telefono_1"
                id="telefono_1"
                value={formState.telefono_1}
                onChange={onInputChange}
                autoComplete="off"
              />
              <label htmlFor="persona">Persona que halla</label>

              <div onChange={onInputChange} className="form__radio">
                <div>
                  <input
                    type="radio"
                    value="investigador"
                    name="persona"
                    defaultChecked
                  />{" "}
                  Investigador
                </div>
                <div>
                  <input type="radio" value="otra" name="persona" /> Otra
                </div>
              </div>
              {formState.persona === "otra" && (
                <>
                  <label htmlFor="nombre_persona">
                    Nombre persona que halla{" "}
                    <span className="input__required">*</span>
                  </label>
                  <p className="error-form">{formErrors.persona_nombre}</p>
                  <input
                    type="text"
                    name="nombre_persona"
                    id="nombre_persona"
                    placeholder="..."
                    onChange={onInputChange}
                    value={formState.nombre_persona}
                    autoComplete="off"
                  />
                  <label htmlFor="persona_cedula">
                    C&eacute;dula <span className="input__required">*</span>
                  </label>
                  <p className="error-form">{formErrors.persona_cedula}</p>
                  <input
                    type="text"
                    name="persona_cedula"
                    id="persona_cedula"
                    placeholder="..."
                    onChange={onInputChange}
                    value={formState.persona_cedula}
                    autoComplete="off"
                  />
                  <label htmlFor="persona_direccion">
                    Unidad policial donde labora / lugar de residencia (civiles)
                  </label>
                  <input
                    type="text"
                    placeholder="..."
                    name="persona_direccion"
                    id="persona_direccion"
                    value={formState.persona_direccion}
                    onChange={onInputChange}
                    autoComplete="off"
                  />
                  <label htmlFor="persona_telefono">Tel&eacute;fono</label>
                  <input
                    type="number"
                    placeholder="..."
                    name="persona_telefono"
                    id="persona_telefono"
                    value={formState.persona_telefono}
                    onChange={onInputChange}
                    autoComplete="off"
                  />
                </>
              )}
              <label htmlFor="nunc">
                Numero Único de Noticia Criminal NUNC{" "}
                <span className="input__required">*</span>
              </label>
              <p className="error-form">{formErrors.nunc}</p>
              <input
                type="number"
                name="nunc"
                id="nunc"
                placeholder="..."
                onChange={onInputChange}
                value={formState.nunc}
                autoComplete="off"
              />
              <label htmlFor="descripcion">
                Descripci&oacute;n de los hechos
              </label>
              <textarea
                name="descripcion"
                id="descripcion"
                placeholder="Descripcion..."
                onChange={onInputChange}
                value={formState.descripcion}
                autoComplete="off"
              />
              <label htmlFor="direccion">
                Direcci&oacute;n del lugar del hecho
              </label>
              <input
                type="text"
                name="direccion"
                id="direccion"
                placeholder="..."
                onChange={onInputChange}
                value={formState.direccion}
                autoComplete="off"
              />
              <label htmlFor="fecha_hora">
                Fecha y hora de la incautaci&oacute;n
              </label>
              <input
                type="datetime-local"
                name="fecha_hora"
                id="fecha_hora"
                onChange={onInputChange}
                value={formState.fecha_hora}
                min="1900-01-01T00:00"
                max="2100-01-01T00:00"
                autoComplete="off"
              />
              <label htmlFor="delito">
                Delito <span className="input__required">*</span>
              </label>
              <p className="error-form">{formErrors.delito}</p>
              <input
                type="text"
                name="delito"
                id="delito"
                placeholder="..."
                onChange={onInputChange}
                value={formState.delito}
                autoComplete="off"
              />
              <label htmlFor="fiscalia">
                Fiscal&iacute;a <span className="input__required">*</span>
              </label>
              <p className="error-form">{formErrors.fiscalia}</p>
              <input
                type="text"
                name="fiscalia"
                id="fiscalia"
                placeholder="..."
                onChange={onInputChange}
                value={formState.fiscalia}
                autoComplete="off"
              />
              <label htmlFor="indicado_nombre">Nombre del indiciado</label>
              <p className="error-form">{formErrors.indicado_nombre}</p>
              <input
                type="text"
                name="indicado_nombre"
                id="indicado_nombre"
                placeholder="..."
                onChange={onInputChange}
                value={formState.indicado_nombre}
                autoComplete="off"
              />
              <label htmlFor="indicado_cedula">
                C&eacute;dula del indicado
              </label>
              <p className="error-form">{formErrors.indicado_cedula}</p>
              <input
                type="text"
                name="indicado_cedula"
                id="indicado_cedula"
                placeholder="..."
                onChange={onInputChange}
                value={formState.indicado_cedula}
                autoComplete="off"
              />
              <label htmlFor="victima_nombre">Nombre del victima</label>
              <p className="error-form">{formErrors.victima_nombre}</p>
              <input
                type="text"
                name="victima_nombre"
                id="victima_nombre"
                placeholder="..."
                onChange={onInputChange}
                value={formState.victima_nombre}
                autoComplete="off"
              />
              <label htmlFor="victima_cedula">C&eacute;dula del victima</label>
              <p className="error-form">{formErrors.victima_cedula}</p>
              <input
                type="text"
                name="victima_cedula"
                id="victima_cedula"
                placeholder="..."
                onChange={onInputChange}
                value={formState.victima_cedula}
                autoComplete="off"
              />
              <h3 htmlFor="weapon">Arma</h3>
              <label htmlFor="weapon_type">Tipo</label>
              <select
                type="text"
                name="weapon_type"
                id="weapon_type"
                onChange={onInputChange}
                value={formState.weapon_type}
              >
                <option disabled> -- Tipo -- </option>
                {weapon_types.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              {formState.weapon_type === "Otra" && (
                <>
                  <label htmlFor="weapon_type_other">Otro tipo</label>
                  <input
                    type="text"
                    placeholder="Otra, ¿Cu&aacute;l?..."
                    name="weapon_type_other"
                    id="weapon_type_other"
                    onChange={onInputChange}
                    value={formState.weapon_type_other}
                    autoComplete="off"
                  />
                </>
              )}
              <label htmlFor="weapon_brand">
                Marca del arma (casa fabricante)
              </label>
              <input
                type="text"
                placeholder="..."
                name="weapon_brand"
                id="weapon_brand"
                onChange={onInputChange}
                value={formState.weapon_brand}
                autoComplete="off"
              />
              <label htmlFor="weapon_serie">N° Serie del arma</label>
              <input
                type="text"
                placeholder="..."
                name="weapon_serie"
                id="weapon_serie"
                onChange={onInputChange}
                value={formState.weapon_serie}
                autoComplete="off"
              />
              <label htmlFor="weapon_caliber">Calibre</label>
              <select
                type="text"
                name="weapon_caliber"
                id="weapon_caliber"
                onChange={onInputChange}
                value={formState.weapon_caliber}
              >
                <option disabled> -- Calibre -- </option>
                {weapon_calibers.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              {formState.weapon_caliber === "Otro" && (
                <>
                  <label htmlFor="weapon_caliber_other">Otro calibre</label>
                  <input
                    type="text"
                    placeholder="Otro, ¿Cu&aacute;l?..."
                    name="weapon_caliber_other"
                    id="weapon_caliber_other"
                    onChange={onInputChange}
                    value={formState.weapon_caliber_other}
                    autoComplete="off"
                  />
                </>
              )}
              <label htmlFor="weapon_type_ammunition">
                Tipo de munici&oacute;n
              </label>
              <select
                type="text"
                name="weapon_type_ammunition"
                id="weapon_type_ammunition"
                onChange={onInputChange}
                value={formState.weapon_type_ammunition}
              >
                <option disabled> -- Calibre -- </option>
                {weapon_calibers.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              {formState.weapon_type_ammunition === "Otro" && (
                <>
                  <label htmlFor="weapon_type_ammunition_other">
                    Otro tipo de munici&oacute;n
                  </label>
                  <input
                    type="text"
                    placeholder="Otro, ¿Cu&aacute;l?..."
                    name="weapon_type_ammunition_other"
                    id="weapon_type_ammunition_other"
                    onChange={onInputChange}
                    value={formState.weapon_type_ammunition_other}
                    autoComplete="off"
                  />
                </>
              )}
            </div>

            {pag > 0 && (
              <button className="btn btn-primary"onClick={subPag}>Atr&aacute;s</button>
            )}
            {pag < 3 && (
              <button className="btn btn-primary" onClick={addPag}>
                Siguiente
              </button>
            )}
            {pag === 3 && (
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
