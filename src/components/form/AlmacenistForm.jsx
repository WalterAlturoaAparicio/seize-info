import React, { useEffect, useState } from "react"
import { useForm } from "../../hook/useForm"
import { weapons } from "../../data/data"
import {
  almacenist_procedure,
  almacenist_procedure_decreto,
  validateForm,
} from "../../utils/forms"
import { error } from "../../utils/error"

export const AlmacenistForm = ({ toggleModal, weapon, ley }) => {
  const initialValues = !weapon.almacenista
    ? {
        ...weapon,
        gepol: "",
        procedure: "custodia",
        custodia_fecha_fiscalia: "",
        custodia_observaciones_estudio: "",
        custodia_spoa: null,
        custodia_fecha_ingreso: "",
        custodia_foto: null,
        custodia_observaciones_contenedor: "",
        pruebas_entidad_solicitante: "",
        pruebas_fecha_fiscalia: "",
        pruebas_direccion: "",
        pruebas_fecha_retiro: "",
        pruebas_oficio_fisacalia: "",
        pruebas_nombre_retira: "",
        pruebas_foto_cedula: null,
        pruebas_foto_tarjeta: null,
        pruebas_observaciones_estudio: "",
        comiso_entidad_solicitante: "",
        comiso_observaciones: "",
        comiso_fecha_solicitante: "",
        comiso_DCCA: "",
        decreto_custodia_acta_incautacion: null,
        decreto_fecha_informe_incau: "",
        decreto_fotocopia_informe_incau: null,
        decreto_nombre_incautado: "",
        decreto_cedula_incautado: "",
        decreto_fotocopia_cedula: null,
        decreto_custodia_registro_foto: null,
        decreto_comiso_entidad_solicitante: "",
        decreto_comiso_observaciones: "",
        devolucion_oficio_cita: null,
        devolucion_res_original: null,
        devolucion_asuntos_juridicos: null,
        devolucion_pago: null,
        devolucion_foto_cedula: null,
        devolucion_salvo_conducto: null,
      }
    : { ...weapon }
  const avalible = weapon.almacenista
  const { formState, onInputChange } = useForm(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [pag, setPag] = useState(0)
  const [isNext, setIsNext] = useState(false)
  const [isBack, setIsBack] = useState(false)

  const registerSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formState))
    setIsSubmit(true)
    formState.almacenista = true
    const index = weapons.findIndex(
      (obj) => obj.consecutivo === formState.consecutivo
    )
    weapons.splice(index, 1)
    weapons.push(formState)
  }
  const validate = (values) => {
    const errors = {}
    switch (pag) {
      case 0:
        if (!values.gepol) errors.gepol = error.campo
        break
      case 1:
        if (ley) {
          if (formState.procedure === "custodia") {
            if (!values.custodia_fecha_fiscalia)
              errors.custodia_fecha_fiscalia = error.campo
            if (!values.custodia_spoa) errors.custodia_spoa = error.campo
          }
          if (formState.procedure === "aplicacion de pruebas") {
            if (!values.pruebas_fecha_fiscalia)
              errors.pruebas_fecha_fiscalia = error.campo
            if (!values.pruebas_nombre_retira)
              errors.pruebas_nombre_retira = error.campo
            if (!values.pruebas_foto_cedula)
              errors.pruebas_foto_cedula = error.campo
            if (!values.pruebas_foto_cedula)
              errors.pruebas_foto_cedula = error.campo
          }
          if (formState.procedure === "comiso o destruccion") {
            if (!values.comiso_entidad_solicitante)
              errors.comiso_entidad_solicitante = error.campo
          }
        } else {
          if (formState.procedure === "custodia") {
            if (!values.decreto_custodia_acta_incautacion)
              errors.decreto_custodia_acta_incautacion = error.campo
            if (!values.decreto_fecha_informe_incau)
              errors.decreto_fecha_informe_incau = error.campo
            if (!values.decreto_fotocopia_informe_incau)
              errors.decreto_fotocopia_informe_incau = error.campo
            if (!values.decreto_fotocopia_cedula)
              errors.decreto_fotocopia_cedula = error.campo
            if (!values.decreto_custodia_registro_foto)
              errors.decreto_custodia_registro_foto = error.campo
          }
          if (formState.procedure === "comiso o destruccion") {
            if (!values.decreto_comiso_entidad_solicitante)
              errors.decreto_comiso_entidad_solicitante = error.campo
          }
          if (formState.procedure === "devolucion") {
            if (!values.devolucion_oficio_cita)
              errors.devolucion_oficio_cita = error.campo
            if (!values.devolucion_res_original)
              errors.devolucion_res_original = error.campo
            if (!values.devolucion_asuntos_juridicos)
              errors.devolucion_asuntos_juridicos = error.campo
            if (!values.devolucion_pago) errors.devolucion_pago = error.campo
            if (!values.devolucion_foto_cedula)
              errors.devolucion_foto_cedula = error.campo
            if (!values.devolucion_salvo_conducto)
              errors.devolucion_salvo_conducto = error.campo
          }
        }
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
    setFormErrors({})
    setPag(pag - 1)
    setIsBack(true)
    if (isSubmit) setIsSubmit(false)
  }
  useEffect(() => {
    console.log(formState)
    if (Object.keys(formErrors).length === 0) {
      if (isNext) {
        setPag(pag + 1)
        setIsNext(false)
      }
      if (isSubmit) {
        toggleModal()
      }
      if (isBack) {
        setIsBack(false)
      }
    }
  }, [formErrors, pag, isSubmit, toggleModal, isNext, isBack, formState])

  return (
    <div className="modal">
      <div className="overlay">
        <div className="invest__container-form">
          {ley ? (
            <>
              <button className="btn btn-close" onClick={toggleModal}></button>
              <form className="invest__form" onSubmit={registerSubmit}>
                <div className="invest__form-inputs">
                  {
                    /* -------------------------------------------------------------------------- */
                    /*                                 FORM PAG 0                                 */
                    /* -------------------------------------------------------------------------- */
                    pag === 0 && (
                      <>
                        <h3>Registro seg&uacute;n la Ley 906 de 2004</h3>
                        <label htmlFor="Oficio">
                          N° Radicado GEPOL
                          <span className="input__required">*</span>
                        </label>
                        <p className="error-form">{formErrors.gepol}</p>
                        <input
                          type="text"
                          name="gepol"
                          id="gepol"
                          placeholder="..."
                          onChange={onInputChange}
                          value={formState.gepol}
                          disabled={avalible}
                          autoComplete="off"
                        />
                        <label htmlFor="procedure">Procedimiento</label>
                        <select
                          type="text"
                          name="procedure"
                          id="procedure"
                          onChange={onInputChange}
                          disabled={avalible}
                          value={formState.procedure}
                        >
                          {almacenist_procedure.map((opt) => (
                            <option key={opt}>{opt}</option>
                          ))}
                        </select>
                      </>
                    )
                  }
                  {
                    /* -------------------------------------------------------------------------- */
                    /*                                 FORM PAG 1                                 */
                    /* -------------------------------------------------------------------------- */
                    pag === 1 && (
                      <>
                        {formState.procedure === "custodia" && (
                          <>
                            <h3>Procedimiento de custodia</h3>
                            <label htmlFor="custodia_fecha_fiscalia">
                              Oficio fiscal&iacute;a
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.custodia_fecha_fiscalia}
                            </p>
                            <input
                              type="date"
                              name="custodia_fecha_fiscalia"
                              id="custodia_fecha_fiscalia"
                              onChange={onInputChange}
                              value={formState.custodia_fecha_fiscalia}
                              min="1900-01-01"
                              max="2100-01-01"
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <label htmlFor="custodia_spoa">
                              SPOA (registro de continuidad){" "}
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.custodia_spoa}
                            </p>
                            <input
                              type="file"
                              id="custodia_spoa"
                              name="custodia_spoa"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <label htmlFor="custodia_foto">
                              Fotograf&iacute;a
                            </label>
                            <input
                              type="file"
                              id="custodia_foto"
                              name="custodia_foto"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <label htmlFor="custodia_fecha_ingreso">
                              Fecha de ingreso del elemento
                            </label>
                            <input
                              type="date"
                              name="custodia_fecha_ingreso"
                              id="custodia_fecha_ingreso"
                              onChange={onInputChange}
                              value={formState.custodia_fecha_ingreso}
                              min="1900-01-01"
                              max="2100-01-01"
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <label htmlFor="custodia_observaciones_estudio">
                              Se abre el contenedor observaciones /
                              descripci&oacute;n
                            </label>
                            <textarea
                              name="custodia_observaciones_contenedor"
                              id="custodia_observaciones_contenedor"
                              placeholder="Observaciones..."
                              onChange={onInputChange}
                              value={
                                formState.custodia_observaciones_contenedor
                              }
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <h3 htmlFor="registro">
                              Estudio t&eacute;cnico Bal&iacute;stico{" "}
                            </h3>
                            <div className="form__container">
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Tipo</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_type,
                                        weapon.weapon_type_other
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Calibre</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_caliber,
                                        weapon.weapon_caliber_other
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Marca</li>
                                    <li>
                                      {validateForm(weapon.weapon_brand, false)}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">N° Serie</li>
                                    <li>
                                      {validateForm(weapon.weapon_serie, false)}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Modelo</li>
                                    <li>
                                      {validateForm(weapon.weapon_model, false)}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">
                                      Longitud del ca&ntilde;&oacute;n
                                    </li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_width_canon,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Tipo de anima</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_anima_type,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">
                                      Sentido de rotaci&oacute;n
                                    </li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_rotation,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Funcionamiento</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_functioning,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Casa fabricante</li>
                                    <li>
                                      {validateForm(weapon.weapon_maker, false)}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">
                                      Pa&iacute;s de fabricaci&oacute;n
                                    </li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_country,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Acabado</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_finish,
                                        weapon.weapon_finish_other
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Cachas</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_cachas,
                                        weapon.weapon_cachas_other
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Enpu&ntilde;adura</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_empunadura,
                                        weapon.weapon_empunadura_other
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Culata</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_culata,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Guardamanos</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_guardamano,
                                        weapon.weapon_guardamano_other
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">
                                      Aditamientos especiales
                                    </li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_adj_specials,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Osbervaciones</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_observation,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Accesorios</li>
                                    <li>
                                      {validateForm(
                                        weapon.accesories_description,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                            </div>
                            <br />
                            <label htmlFor="custodia_observaciones_estudio">
                              Observaciones del estudio t&eacute;cnico
                            </label>
                            <textarea
                              name="custodia_observaciones_estudio"
                              id="custodia_observaciones_estudio"
                              placeholder="Observaciones..."
                              onChange={onInputChange}
                              value={formState.custodia_observaciones_estudio}
                              disabled={avalible}
                              autoComplete="off"
                            />
                          </>
                        )}
                        {formState.procedure === "aplicacion de pruebas" && (
                          <>
                            <h3>
                              Procedimiento de aplicaci&oacute;n de pruebas
                            </h3>
                            <label htmlFor="pruebas_fecha_fiscalia">
                              Oficio fiscal&iacute;a
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.pruebas_fecha_fiscalia}
                            </p>
                            <input
                              type="date"
                              name="pruebas_fecha_fiscalia"
                              id="pruebas_fecha_fiscalia"
                              onChange={onInputChange}
                              value={formState.pruebas_fecha_fiscalia}
                              min="1900-01-01"
                              max="2100-01-01"
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <label htmlFor="pruebas_entidad_solicitante">
                              Entidad solicitante
                            </label>
                            <input
                              type="text"
                              name="pruebas_entidad_solicitante"
                              id="pruebas_entidad_solicitante"
                              placeholder="..."
                              onChange={onInputChange}
                              value={formState.pruebas_entidad_solicitante}
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <label htmlFor="pruebas_direccion">
                              Direcci&oacute;n donde son las pruebas realizadas
                            </label>
                            <input
                              type="text"
                              name="pruebas_direccion"
                              id="pruebas_direccion"
                              placeholder="..."
                              onChange={onInputChange}
                              value={formState.pruebas_direccion}
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <label htmlFor="pruebas_fecha_retiro">
                              Fecha retiro elemento(s)
                            </label>
                            <input
                              type="date"
                              name="pruebas_fecha_retiro"
                              id="pruebas_fecha_retiro"
                              onChange={onInputChange}
                              value={formState.pruebas_fecha_retiro}
                              min="1900-01-01"
                              max="2100-01-01"
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <label htmlFor="persona">
                              Presenta oficio de la Fiscal&iacute;a
                            </label>
                            <div
                              onChange={onInputChange}
                              className="form__radio"
                            >
                              <div>
                                <input
                                  type="radio"
                                  value="si"
                                  name="pruebas_oficio_fisacalia"
                                  defaultChecked
                                />{" "}
                                Si
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  value="no"
                                  name="pruebas_oficio_fisacalia"
                                />{" "}
                                No
                              </div>
                            </div>
                            <label htmlFor="pruebas_nombre_retira">
                              Nombre de quien retira elemento(s){" "}
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.pruebas_nombre_retira}
                            </p>
                            <input
                              type="text"
                              name="pruebas_nombre_retira"
                              id="pruebas_nombre_retira"
                              placeholder="..."
                              onChange={onInputChange}
                              value={formState.pruebas_nombre_retira}
                              autoComplete="off"
                            />
                            <label htmlFor="pruebas_foto_cedula">
                              Fotocopia de la c&eacute;dula
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.pruebas_foto_cedula}
                            </p>
                            <input
                              type="file"
                              id="pruebas_foto_cedula"
                              name="pruebas_foto_cedula"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <label htmlFor="pruebas_foto_tarjeta">
                              Fotocopia de la tarjeta profesional (defensor
                              p&uacute;blico)
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.pruebas_foto_tarjeta}
                            </p>
                            <input
                              type="file"
                              id="pruebas_foto_tarjeta"
                              name="pruebas_foto_tarjeta"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <label htmlFor="pruebas_observaciones_estudio">
                              Se abre el contenedor observaciones /
                              descripci&oacute;n
                            </label>
                            <textarea
                              name="pruebas_observaciones_estudio"
                              id="pruebas_observaciones_estudio"
                              placeholder="Observaciones..."
                              onChange={onInputChange}
                              value={formState.pruebas_observaciones_estudio}
                              disabled={avalible}
                              autoComplete="off"
                            />
                          </>
                        )}
                        {formState.procedure === "comiso o destruccion" && (
                          <>
                            <h3>
                              Procedimiento de comiso o destrucci&oacute;n
                            </h3>
                            <label htmlFor="comiso_entidad_solicitante">
                              Entidad solicitante
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.comiso_entidad_solicitante}
                            </p>
                            <input
                              type="text"
                              name="comiso_entidad_solicitante"
                              id="comiso_entidad_solicitante"
                              placeholder="..."
                              onChange={onInputChange}
                              value={formState.comiso_entidad_solicitante}
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <label htmlFor="comiso_fecha_solicitante">
                              Fecha de la sentencia
                            </label>
                            <input
                              type="date"
                              name="comiso_fecha_solicitante"
                              id="comiso_fecha_solicitante"
                              onChange={onInputChange}
                              value={formState.comiso_fecha_solicitante}
                              min="1900-01-01"
                              max="2100-01-01"
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <label htmlFor="comiso_DCCA">
                              N° Acta del DCCA
                            </label>
                            <input
                              type="text"
                              name="comiso_DCCA"
                              id="comiso_DCCA"
                              placeholder="..."
                              onChange={onInputChange}
                              value={formState.comiso_DCCA}
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <label htmlFor="comiso_observaciones">
                              Osbervaciones
                            </label>
                            <textarea
                              name="comiso_observaciones"
                              id="comiso_observaciones"
                              placeholder="Observaciones..."
                              onChange={onInputChange}
                              value={formState.comiso_observaciones}
                              disabled={avalible}
                              autoComplete="off"
                            />
                          </>
                        )}
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
                  {pag < 1 && (
                    <button
                      className="btn btn-primary"
                      onClick={addPag}
                      type="button"
                    >
                      Siguiente
                    </button>
                  )}
                  {pag === 1 && (
                    <button type="submit" className="btn btn-primary">
                      Registrar
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <>
              <button className="btn btn-close" onClick={toggleModal}></button>
              <form className="invest__form" onSubmit={registerSubmit}>
                <div className="invest__form-inputs">
                  {
                    /* -------------------------------------------------------------------------- */
                    /*                                 FORM PAG 0                                 */
                    /* -------------------------------------------------------------------------- */
                    pag === 0 && (
                      <>
                        <h3>Registro seg&uacute;n el decreto 2535</h3>
                        <label htmlFor="Oficio">
                          N° Radicado GEPOL
                          <span className="input__required">*</span>
                        </label>
                        <p className="error-form">{formErrors.gepol}</p>
                        <input
                          type="text"
                          name="gepol"
                          id="gepol"
                          placeholder="..."
                          onChange={onInputChange}
                          value={formState.gepol}
                          disabled={avalible}
                          autoComplete="off"
                        />
                        <label htmlFor="procedure">Procedimiento</label>
                        <select
                          type="text"
                          name="procedure"
                          id="procedure"
                          onChange={onInputChange}
                          disabled={avalible}
                          value={formState.procedure}
                        >
                          {almacenist_procedure_decreto.map((opt) => (
                            <option key={opt}>{opt}</option>
                          ))}
                        </select>
                      </>
                    )
                  }
                  {
                    /* -------------------------------------------------------------------------- */
                    /*                                 FORM PAG 1                                 */
                    /* -------------------------------------------------------------------------- */
                    pag === 1 && (
                      <>
                        {formState.procedure === "custodia" && (
                          <>
                            <h3>Procedimiento de custodia</h3>
                            <label htmlFor="decreto_custodia_acta_incautacion">
                              Acta de incautaci&oacute;n
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.decreto_custodia_acta_incautacion}
                            </p>
                            <input
                              type="file"
                              id="decreto_custodia_acta_incautacion"
                              name="decreto_custodia_acta_incautacion"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <label htmlFor="decreto_fecha_informe_incau">
                              Fecha del informe de incautaci&oacute;n
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.decreto_fecha_informe_incau}
                            </p>
                            <input
                              type="date"
                              name="decreto_fecha_informe_incau"
                              id="decreto_fecha_informe_incau"
                              onChange={onInputChange}
                              value={formState.decreto_fecha_informe_incau}
                              min="1900-01-01"
                              max="2100-01-01"
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <label htmlFor="decreto_fotocopia_informe_incau">
                              Fotocopia informe de incautaci&oacute;n
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.decreto_fotocopia_informe_incau}
                            </p>
                            <input
                              type="file"
                              id="decreto_fotocopia_informe_incau"
                              name="decreto_fotocopia_informe_incau"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <label htmlFor="decreto_nombre_incautado">
                              Nombre completo de la persona a la que se
                              incaut&oacute;
                            </label>
                            <p className="error-form">
                              {formErrors.decreto_nombre_incautado}
                            </p>
                            <input
                              type="text"
                              name="decreto_nombre_incautado"
                              id="decreto_nombre_incautado"
                              placeholder="..."
                              onChange={onInputChange}
                              value={formState.decreto_nombre_incautado}
                              autoComplete="off"
                              disabled={avalible}
                            />
                            <label htmlFor="decreto_cedula_incautado">
                              C&eacute;dula de la persona a la que se
                              incaut&oacute;
                            </label>
                            <p className="error-form">
                              {formErrors.decreto_cedula_incautado}
                            </p>
                            <input
                              type="text"
                              name="decreto_cedula_incautado"
                              id="decreto_cedula_incautado"
                              placeholder="..."
                              onChange={onInputChange}
                              value={formState.decreto_cedula_incautado}
                              autoComplete="off"
                              disabled={avalible}
                            />
                            <label htmlFor="decreto_fotocopia_cedula">
                              Fotocopia de la c&eacute;dula a la que se
                              incaut&oacute;
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.decreto_fotocopia_cedula}
                            </p>
                            <input
                              type="file"
                              id="decreto_fotocopia_cedula"
                              name="decreto_fotocopia_cedula"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <label htmlFor="decreto_custodia_registro_foto">
                              Registro fotogr&aacute;fico
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.decreto_custodia_registro_foto}
                            </p>
                            <input
                              type="file"
                              id="decreto_custodia_registro_foto"
                              name="decreto_custodia_registro_foto"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <h3 htmlFor="registro">
                              Caracter&iacute;sticas del arma
                            </h3>
                            <div className="form__container">
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Tipo</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_type,
                                        weapon.weapon_type_other
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Calibre</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_caliber,
                                        weapon.weapon_caliber_other
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Marca</li>
                                    <li>
                                      {validateForm(weapon.weapon_brand, false)}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">N° Serie</li>
                                    <li>
                                      {validateForm(weapon.weapon_serie, false)}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Modelo</li>
                                    <li>
                                      {validateForm(weapon.weapon_model, false)}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">
                                      Longitud del ca&ntilde;&oacute;n
                                    </li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_width_canon,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Tipo de anima</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_anima_type,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">
                                      Sentido de rotaci&oacute;n
                                    </li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_rotation,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Funcionamiento</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_functioning,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Casa fabricante</li>
                                    <li>
                                      {validateForm(weapon.weapon_maker, false)}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">
                                      Pa&iacute;s de fabricaci&oacute;n
                                    </li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_country,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Acabado</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_finish,
                                        weapon.weapon_finish_other
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Cachas</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_cachas,
                                        weapon.weapon_cachas_other
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Enpu&ntilde;adura</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_empunadura,
                                        weapon.weapon_empunadura_other
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Culata</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_culata,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Guardamanos</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_guardamano,
                                        weapon.weapon_guardamano_other
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">
                                      Aditamientos especiales
                                    </li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_adj_specials,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Osbervaciones</li>
                                    <li>
                                      {validateForm(
                                        weapon.weapon_observation,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                              <div className="form__container-no-modify">
                                <ul>
                                  <div>
                                    <li className="white">Accesorios</li>
                                    <li>
                                      {validateForm(
                                        weapon.accesories_description,
                                        false
                                      )}
                                    </li>
                                  </div>
                                </ul>
                              </div>
                            </div>
                          </>
                        )}
                        {formState.procedure === "comiso o destruccion" && (
                          <>
                            <h3>
                              Procedimiento de comiso o destrucci&oacute;n
                            </h3>
                            <label htmlFor="decreto_comiso_entidad_solicitante">
                              Entidad solicitante
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.decreto_comiso_entidad_solicitante}
                            </p>
                            <input
                              type="text"
                              name="decreto_comiso_entidad_solicitante"
                              id="decreto_comiso_entidad_solicitante"
                              placeholder="..."
                              onChange={onInputChange}
                              value={
                                formState.decreto_comiso_entidad_solicitante
                              }
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <label htmlFor="decreto_fecha_resolucion">
                              Fecha de la resoluci&oacute;n
                            </label>
                            <input
                              type="date"
                              name="decreto_fecha_resolucion"
                              id="decreto_fecha_resolucion"
                              onChange={onInputChange}
                              value={formState.decreto_fecha_resolucion}
                              min="1900-01-01"
                              max="2100-01-01"
                              disabled={avalible}
                              autoComplete="off"
                            />
                            <label htmlFor="decreto_comiso_observaciones">
                              Osbervaciones
                            </label>
                            <textarea
                              name="decreto_comiso_observaciones"
                              id="decreto_comiso_observaciones"
                              placeholder="Observaciones..."
                              onChange={onInputChange}
                              value={formState.decreto_comiso_observaciones}
                              disabled={avalible}
                              autoComplete="off"
                            />
                          </>
                        )}
                        {formState.procedure === "devolucion" && (
                          <>
                            <h3>Procedimiento de devoluci&oacute;n</h3>
                            <label htmlFor="devolucion_oficio_cita">
                              Oficio Solicitud cita
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.devolucion_oficio_cita}
                            </p>
                            <input
                              type="file"
                              id="devolucion_oficio_cita"
                              name="devolucion_oficio_cita"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <label htmlFor="devolucion_res_original">
                              Acta resoluci&oacute;n original
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.devolucion_res_original}
                            </p>
                            <input
                              type="file"
                              id="devolucion_res_original"
                              name="devolucion_res_original"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <label htmlFor="devolucion_asuntos_juridicos">
                              Autorizaci&oacute;n oficina asuntos
                              jur&iacute;dicos
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.devolucion_asuntos_juridicos}
                            </p>
                            <input
                              type="file"
                              id="devolucion_asuntos_juridicos"
                              name="devolucion_asuntos_juridicos"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <label htmlFor="devolucion_pago">
                              Fotocopia recibo de pago
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.devolucion_pago}
                            </p>
                            <input
                              type="file"
                              id="devolucion_pago"
                              name="devolucion_pago"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <label htmlFor="devolucion_foto_cedula">
                              Fotocopia c&eacute;dula (quien recibe el arma)
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.devolucion_foto_cedula}
                            </p>
                            <input
                              type="file"
                              id="devolucion_foto_cedula"
                              name="devolucion_foto_cedula"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                            <label htmlFor="devolucion_salvo_conducto">
                              Fotocopia salvo conducto (quien recibe el arma)
                              <span className="input__required">*</span>
                            </label>
                            <p className="error-form">
                              {formErrors.devolucion_salvo_conducto}
                            </p>
                            <input
                              type="file"
                              id="devolucion_salvo_conducto"
                              name="devolucion_salvo_conducto"
                              accept="image/png, image/jpeg"
                              onChange={onInputChange}
                            />
                          </>
                        )}
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
                  {pag < 1 && (
                    <button
                      className="btn btn-primary"
                      onClick={addPag}
                      type="button"
                    >
                      Siguiente
                    </button>
                  )}
                  {pag === 1 && (
                    <button type="submit" className="btn btn-primary">
                      Registrar
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
