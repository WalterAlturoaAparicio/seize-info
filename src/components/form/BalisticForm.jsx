import React, { useEffect, useState } from "react"
import { useForm } from "../../hook/useForm"
import "./form.css"
import { weapons } from "../../data/data"
import {
  weapon_types,
  weapon_calibers,
  ubication_emp_ef,
} from "../../utils/forms"


export const BalisticForm = (props) => {
  const { toggleModal } = props
  const initialValues = {
  }
  const { formState, onInputChange } = useForm(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [pag, setPag] = useState(0)
  const [isNext, setIsNext] = useState(false)

  const registerSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formState))
    setIsSubmit(true)
    weapons.push(formState)
  }

  
  const validate = (values) => {
    const errors = {}
    switch (pag) {
      case 0:
        break
      case 1:
        break
      default:
        break
    }
    return errors
  }
  const addPag = () => {
    setFormErrors(validate(formState))
    setIsNext(true)
  }
  const subPag = () => {
    setPag(pag - 1)
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      if (isNext) {
        setPag(pag + 1)
        setIsNext(false)
      }
      if (isSubmit) {
        toggleModal()
      }
    }
  }, [formErrors, pag, isSubmit, toggleModal, isNext])
  return (
    <div className="modal">
      <div className="overlay">
        <div className="invest__container-form">
          <button className="btn btn-close" onClick={toggleModal}></button>
          <form className="invest__form" onSubmit={registerSubmit}>
            <div className="invest__form-inputs">
              {
                /* -------------------------------------------------------------------------- */
                /*                                 FORM PAG 0                                 */
                /* -------------------------------------------------------------------------- */
                pag === 0 && (
                  <>
                    <h3 htmlFor="weapon_type">Informaci&oacute;n principal</h3>
                    <label htmlFor="consecutivo">Consecutivo</label>
                    <input
                      type="text"
                      name="consecutivo"
                      id="consecutivo"
                      disabled={true}
                    />
                    <label htmlFor="nombre">
                      Funcionario que Incauta/Recibe el arma y/o municiones.
                      (Grado y nombre){" "}
                      <span className="input__required">*</span>
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
                        <div className="form__container">
                          <label htmlFor="nombre_persona">
                            Nombre persona que halla{" "}
                            <span className="input__required">*</span>
                          </label>
                          <p className="error-form">
                            {formErrors.persona_nombre}
                          </p>
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
                            C&eacute;dula{" "}
                            <span className="input__required">*</span>
                          </label>
                          <p className="error-form">
                            {formErrors.persona_cedula}
                          </p>
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
                            Unidad policial donde labora / lugar de residencia
                            (civiles)
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
                          <label htmlFor="persona_telefono">
                            Tel&eacute;fono
                          </label>
                          <input
                            type="number"
                            placeholder="..."
                            name="persona_telefono"
                            id="persona_telefono"
                            value={formState.persona_telefono}
                            onChange={onInputChange}
                            autoComplete="off"
                          />
                        </div>
                      </>
                    )}
                  </>
                )
              }
              {
                /* -------------------------------------------------------------------------- */
                /*                                 FORM PAG 1                                 */
                /* -------------------------------------------------------------------------- */
                pag === 1 && (
                  <>
                    <h3 htmlFor="weapon_type">Informaci&oacute;n del caso</h3>
                    <label htmlFor="nunc">
                      Numero Único de Noticia Criminal NUNC{" "}
                      <span className="input__required">*</span>
                    </label>
                    <p className="error-form">{formErrors.nunc}</p>
                    <input
                      type="text"
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
                    <label htmlFor="indicado_nombre">
                      Nombre del indiciado
                    </label>
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
                    <input
                      type="text"
                      name="victima_nombre"
                      id="victima_nombre"
                      placeholder="..."
                      onChange={onInputChange}
                      value={formState.victima_nombre}
                      autoComplete="off"
                    />
                    <label htmlFor="victima_cedula">
                      C&eacute;dula del victima
                    </label>
                    <input
                      type="text"
                      name="victima_cedula"
                      id="victima_cedula"
                      placeholder="..."
                      onChange={onInputChange}
                      value={formState.victima_cedula}
                      autoComplete="off"
                    />
                  </>
                )
              }
              {
                /* -------------------------------------------------------------------------- */
                /*                                 FORM PAG 2                                 */
                /* -------------------------------------------------------------------------- */

                pag === 2 && initialValues.check0 && (
                  <>
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
                          placeholder="..."
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
                        <label htmlFor="weapon_caliber_other">
                          Otro calibre
                        </label>
                        <input
                          type="text"
                          placeholder="..."
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
                      <option disabled> -- Tipo munici&oacute;n -- </option>
                      {weapon_types.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {formState.weapon_type_ammunition === "Otra" && (
                      <>
                        <label htmlFor="weapon_type_ammunition_other">
                          Otro tipo de munici&oacute;n
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          name="weapon_type_ammunition_other"
                          id="weapon_type_ammunition_other"
                          onChange={onInputChange}
                          value={formState.weapon_type_ammunition_other}
                          autoComplete="off"
                        />
                      </>
                    )}
                    <label htmlFor="weapon_caliber_ammunition">
                      Calibre de munici&oacute;n
                    </label>
                    <select
                      type="text"
                      name="weapon_caliber_ammunition"
                      id="weapon_caliber_ammunition"
                      onChange={onInputChange}
                      value={formState.weapon_caliber_ammunition}
                    >
                      <option disabled>
                        {" "}
                        -- Calibre de munici&oacute;n --{" "}
                      </option>
                      {weapon_calibers.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {formState.weapon_caliber_ammunition === "Otro" && (
                      <>
                        <label htmlFor="weapon_caliber_ammunition_other">
                          Otro calibre
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          name="weapon_caliber_ammunition_other"
                          id="weapon_caliber_ammunition_other"
                          onChange={onInputChange}
                          value={formState.weapon_caliber_ammunition_other}
                          autoComplete="off"
                        />
                      </>
                    )}
                    <label htmlFor="weapon_ubication">
                      Ubicaci&oacute;n del EMP y EF
                    </label>
                    <select
                      type="text"
                      name="weapon_ubication"
                      id="weapon_ubication"
                      onChange={onInputChange}
                      value={formState.weapon_ubication}
                    >
                      <option disabled> -- Ubicaci&oacute;n -- </option>
                      {ubication_emp_ef.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    <label htmlFor="weapon_observation">
                      Observaciones (Características del arma: apliques,
                      aditivos, cachas, color, entre otros )
                    </label>
                    <textarea
                      name="weapon_observation"
                      id="weapon_observation"
                      placeholder="Observaciones..."
                      onChange={onInputChange}
                      value={formState.weapon_observation}
                      autoComplete="off"
                    />
                  </>
                )
              }
              {
                /* -------------------------------------------------------------------------- */
                /*                                 FORM PAG 3                                 */
                /* -------------------------------------------------------------------------- */
                pag === 3 && (
                  <>
                    <h3 htmlFor="projectile">Proyectil</h3>
                    <label htmlFor="projectile_caliber">Calibre</label>
                    <select
                      type="text"
                      name="projectile_caliber"
                      id="projectile_caliber"
                      onChange={onInputChange}
                      value={formState.projectile_caliber}
                    >
                      <option disabled> -- Calibre -- </option>
                      {weapon_calibers.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {formState.projectile_caliber === "Otro" && (
                      <>
                        <label htmlFor="projectile_caliber_other">
                          Otro calibre
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          name="projectile_caliber_other"
                          id="projectile_caliber_other"
                          onChange={onInputChange}
                          value={formState.projectile_caliber_other}
                          autoComplete="off"
                        />
                      </>
                    )}
                    <label htmlFor="projectile_type">Tipo</label>
                    <select
                      type="text"
                      name="projectile_type"
                      id="projectile_type"
                      onChange={onInputChange}
                      value={formState.projectile_type}
                    >
                      <option disabled> -- Tipo -- </option>
                      {weapon_types.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {formState.projectile_type === "Otra" && (
                      <>
                        <label htmlFor="projectile_type_other">Otro tipo</label>
                        <input
                          type="text"
                          placeholder="..."
                          name="projectile_type_other"
                          id="projectile_type_other"
                          onChange={onInputChange}
                          value={formState.projectile_type_other}
                          autoComplete="off"
                        />
                      </>
                    )}
                    <label htmlFor="projectile_observation">
                      Observaciones
                    </label>
                    <textarea
                      name="projectile_observation"
                      id="projectile_observation"
                      placeholder="Observaciones..."
                      onChange={onInputChange}
                      value={formState.projectile_observation}
                      autoComplete="off"
                    />
                  </>
                )
              }
              {
                /* -------------------------------------------------------------------------- */
                /*                                 FORM PAG 4                                 */
                /* -------------------------------------------------------------------------- */

                pag === 4 && (
                  <>
                    <h3 htmlFor="vainilla">Vainilla</h3>
                    <label htmlFor="vainilla_caliber">Calibre</label>
                    <select
                      type="text"
                      name="vainilla_caliber"
                      id="vainilla_caliber"
                      onChange={onInputChange}
                      value={formState.vainilla_caliber}
                    >
                      <option disabled> -- Calibre -- </option>
                      {weapon_calibers.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {formState.vainilla_caliber === "Otro" && (
                      <>
                        <label htmlFor="vainilla_caliber_other">
                          Otro calibre
                        </label>
                        <input
                          type="text"
                          placeholder="..."
                          name="vainilla_caliber_other"
                          id="vainilla_caliber_other"
                          onChange={onInputChange}
                          value={formState.projectile_caliber_other}
                          autoComplete="off"
                        />
                      </>
                    )}
                    <label htmlFor="vainilla_type">Tipo</label>
                    <select
                      type="text"
                      name="vainilla_type"
                      id="vainilla_type"
                      onChange={onInputChange}
                      value={formState.projectile_type}
                    >
                      <option disabled> -- Tipo -- </option>
                      {weapon_types.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {formState.projectile_type === "Otra" && (
                      <>
                        <label htmlFor="vainilla_type_other">Otro tipo</label>
                        <input
                          type="text"
                          placeholder="..."
                          name="vainilla_type_other"
                          id="vainilla_type_other"
                          onChange={onInputChange}
                          value={formState.vainilla_type_other}
                          autoComplete="off"
                        />
                      </>
                    )}
                    <label htmlFor="vainilla_observation">Observaciones</label>
                    <textarea
                      name="vainilla_observation"
                      id="vainilla_observation"
                      placeholder="Observaciones..."
                      onChange={onInputChange}
                      value={formState.vainilla_observation}
                      autoComplete="off"
                    />
                  </>
                )
              }
              {
                /* -------------------------------------------------------------------------- */
                /*                                 FORM PAG 5                                 */
                /* -------------------------------------------------------------------------- */

                pag === 5 && (
                  <>
                    <h3 htmlFor="accesories">Accesorios</h3>
                    <label htmlFor="accesories_description">
                      Descripci&oacute;n
                    </label>
                    <textarea
                      name="accesories_description"
                      id="accesories_description"
                      placeholder="..."
                      onChange={onInputChange}
                      value={formState.accesories_description}
                      autoComplete="off"
                    />
                  </>
                )
              }
            </div>
            <div className="buttons">
              {pag > 0 && (
                <button
                  className="btn btn-primary"
                  onClick={subPag}
                  type="button"
                >
                  Atr&aacute;s
                </button>
              )}
              {pag < 5 && (
                <button
                  className="btn btn-primary"
                  onClick={addPag}
                  type="button"
                >
                  Siguiente
                </button>
              )}
              {pag === 5 && (
                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
