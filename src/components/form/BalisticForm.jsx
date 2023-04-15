import React, { useEffect, useState } from "react";
import { useForm } from "../../hook/useForm";
import "./form.css";
import { weapons } from "../../data/data";
import {
  anima_types,
  sense_rotation,
  functioning,
  fabrication,
  finish,
  material_types,
  shape,
  percution,
  validateForm,
} from "../../utils/forms";
import { error } from "../../utils/error";

export const BalisticForm = (props) => {
  const { toggleModal, weapon } = props;
  const initialValues = !weapon.peritaje
    ? {
        ...weapon,
        peritaje_nombre: "",
        peritaje_cedula: "",
        fecha_informe: "",
        estudio: "",
        description_emp_ef: "",
        observation: "",
        weapon_anima_type: "",
        weapon_rotation: "",
        weapon_functioning: "",
        weapon_fabrication: "",
        weapon_finish: "",
        weapon_finish_other: "",
        weapon_cachas: "",
        weapon_cachas_other: "",
        weapon_empunadura: "",
        weapon_empunadura_other: "",
        weapon_guardamano: "",
        weapon_guardamano_other: "",
        projectile_shape: "",
        projectile_shape_other: "",
        peritaje_projectile_observation: "",
      }
    : { ...weapon };
  const avalible = weapon.peritaje;
  const { formState, onInputChange } = useForm(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [pag, setPag] = useState(0);
  const [isNext, setIsNext] = useState(false);

  const registerSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formState));
    setIsSubmit(true);
    formState.peritaje = true;
    const index = weapons.findIndex(
      (obj) => obj.consecutivo === formState.consecutivo
    );
    weapons.splice(index, 1);
    weapons.push(formState);
  };

  const validate = (values) => {
    const errors = {};
    switch (pag) {
      case 0:
        if (!values.peritaje_nombre) errors.peritaje_nombre = error.campo;
        if (!values.peritaje_cedula) errors.peritaje_cedula = error.campo;
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }
    return errors;
  };
  const addPag = () => {
    setFormErrors(validate(formState));
    setIsNext(true);
  };
  const subPag = () => {
    setPag(pag - 1);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      if (isNext) {
        setPag(pag + 1);
        setIsNext(false);
      }
      if (isSubmit) {
        toggleModal();
      }
    }
  }, [formErrors, pag, isSubmit, toggleModal, isNext]);

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
                    <h3 htmlFor="weapon_type">
                      Registro seg&uacute;n la Ley 906 de 2004
                    </h3>

                    <label htmlFor="peritaje_nombre">
                      Nombre del responsable peritaje
                      <span className="input__required">*</span>
                    </label>
                    <p className="error-form">{formErrors.peritaje_nombre}</p>
                    <input
                      type="text"
                      name="peritaje_nombre"
                      id="peritaje_nombre"
                      placeholder="..."
                      onChange={onInputChange}
                      value={formState.peritaje_nombre}
                      autoComplete="off"
                      disabled={avalible}
                    />
                    <label htmlFor="peritaje_cedula">
                      C&eacute;dula del responsable peritaje
                      <span className="input__required">*</span>
                    </label>
                    <p className="error-form">{formErrors.peritaje_cedula}</p>
                    <input
                      type="text"
                      name="peritaje_cedula"
                      id="peritaje_cedula"
                      placeholder="..."
                      onChange={onInputChange}
                      value={formState.peritaje_cedula}
                      autoComplete="off"
                      disabled={avalible}
                    />
                    <label htmlFor="fecha_informe">Fecha del informe</label>
                    <input
                      type="date"
                      name="fecha_informe"
                      id="fecha_informe"
                      onChange={onInputChange}
                      value={formState.fecha_informe}
                      min="1900-01-01"
                      max="2100-01-01"
                      disabled={avalible}
                      autoComplete="off"
                    />
                    <label htmlFor="estudio">Estudio solicitado</label>
                    <input
                      type="text"
                      placeholder="..."
                      name="estudio"
                      id="estudio"
                      value={formState.estudio}
                      onChange={onInputChange}
                      disabled={avalible}
                      autoComplete="off"
                    />
                    <label htmlFor="description_emp_ef">
                      Descripci&oacute;n EMP/EF
                    </label>
                    <input
                      type="text"
                      placeholder="..."
                      name="description_emp_ef"
                      id="description_emp_ef"
                      value={formState.description_emp_ef}
                      onChange={onInputChange}
                      disabled={avalible}
                      autoComplete="off"
                    />
                    <h3 htmlFor="registro">Registro del investigador</h3>
                    <div className="form__container">
                      <label htmlFor="indicado">Indicado</label>
                      <div className="form__container-no-modify">
                        <ul>
                          <div>
                            <li>Nombre: </li>
                            <li>
                              {validateForm(weapon.indiciado_nombre, false)}
                            </li>
                          </div>
                        </ul>
                        <ul>
                          <div>
                            <li>C&eacute;dula: </li>
                            <li>
                              {validateForm(weapon.indiciado_cedula, false)}
                            </li>
                          </div>
                        </ul>
                      </div>
                      <br />
                      <div className="form__container-no-modify">
                        <ul>
                          <div>
                            <li className="white">Delito</li>
                            <li>{weapon.delito}</li>
                          </div>
                        </ul>
                      </div>
                      <br />
                      <div className="form__container-no-modify">
                        <ul>
                          <div>
                            <li className="white">Fiscal&iacute;a</li>
                            <li>{weapon.fiscalia}</li>
                          </div>
                        </ul>
                      </div>
                    </div>
                    <br />
                    <label htmlFor="observation">Observaciones</label>
                    <textarea
                      name="observation"
                      id="observation"
                      placeholder="Observaciones..."
                      onChange={onInputChange}
                      value={formState.observation}
                      disabled={avalible}
                      autoComplete="off"
                    />
                  </>
                )
              }
              {
                /* -------------------------------------------------------------------------- */
                /*                                 FORM PAG 1                                 */
                /* -------------------------------------------------------------------------- */
                pag === 1 && (
                  <>
                    <h3 htmlFor="weapon_type">Informaci&oacute;n del arma</h3>
                    <h3 htmlFor="registro">Registro del investigador</h3>
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
                            <li>{validateForm(weapon.weapon_brand, false)}</li>
                          </div>
                        </ul>
                      </div>
                      <div className="form__container-no-modify">
                        <ul>
                          <div>
                            <li className="white">N° Serie</li>
                            <li>{validateForm(weapon.weapon_serie, false)}</li>
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
                    <label htmlFor="weapon_model">Modelo</label>
                    <input
                      type="text"
                      name="weapon_model"
                      id="weapon_model"
                      placeholder="..."
                      onChange={onInputChange}
                      value={formState.weapon_model}
                      disabled={avalible}
                      autoComplete="off"
                    />
                    <label htmlFor="nunc">
                      Longitud del ca&ntilde;&oacute;n
                    </label>
                    <input
                      type="text"
                      name="nunc"
                      id="nunc"
                      placeholder="..."
                      onChange={onInputChange}
                      value={formState.nunc}
                      disabled={avalible}
                      autoComplete="off"
                    />
                    <label htmlFor="weapon_anima_type">Tipo</label>
                    <select
                      type="text"
                      name="weapon_anima_type"
                      id="weapon_anima_type"
                      onChange={onInputChange}
                      disabled={avalible}
                      value={formState.weapon_anima_type}
                    >
                      <option> -- Tipo -- </option>
                      {anima_types.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    <label htmlFor="weapon_quantity">Cantidad</label>
                    <input
                      type="number"
                      name="weapon_quantity"
                      id="weapon_quantity"
                      placeholder="..."
                      onChange={onInputChange}
                      value={formState.weapon_quantity}
                      disabled={avalible}
                      autoComplete="off"
                    />
                    <label htmlFor="weapon_rotation">
                      Sentido de rotaci&oacute;n
                    </label>
                    <select
                      type="text"
                      name="weapon_rotation"
                      id="weapon_rotation"
                      onChange={onInputChange}
                      disabled={avalible}
                      value={formState.weapon_rotation}
                    >
                      <option> -- Sentido de rotacion -- </option>
                      {sense_rotation.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    <label htmlFor="weapon_functioning">Funcionamiento</label>
                    <select
                      type="text"
                      name="weapon_functioning"
                      id="weapon_functioning"
                      onChange={onInputChange}
                      disabled={avalible}
                      value={formState.weapon_functioning}
                    >
                      <option> -- Funcionamiento -- </option>
                      {functioning.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    <label htmlFor="weapon_maker">Casa fabricante</label>
                    <input
                      type="text"
                      name="weapon_maker"
                      id="weapon_maker"
                      placeholder="..."
                      onChange={onInputChange}
                      value={formState.weapon_maker}
                      disabled={avalible}
                      autoComplete="off"
                    />
                    <label htmlFor="weapon_country">
                      Pa&iacute;s de fabricaci&oacute;n
                    </label>
                    <input
                      type="text"
                      name="weapon_country"
                      id="weapon_country"
                      placeholder="..."
                      onChange={onInputChange}
                      value={formState.weapon_country}
                      disabled={avalible}
                      autoComplete="off"
                    />
                    <label htmlFor="weapon_fabrication">
                      Fabricaci&oacute;n
                    </label>
                    <select
                      type="text"
                      name="weapon_fabrication"
                      id="weapon_fabrication"
                      onChange={onInputChange}
                      disabled={avalible}
                      value={formState.weapon_fabrication}
                    >
                      <option> -- Fabricacion -- </option>
                      {fabrication.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    <label htmlFor="weapon_finish">Acabado</label>
                    <select
                      type="text"
                      name="weapon_finish"
                      id="weapon_finish"
                      onChange={onInputChange}
                      disabled={avalible}
                      value={formState.weapon_finish}
                    >
                      <option> -- Acabado -- </option>
                      {finish.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {formState.weapon_finish === "Otro" && (
                      <>
                        <label htmlFor="weapon_finish_other">Otro</label>
                        <input
                          type="text"
                          placeholder="..."
                          name="weapon_finish_other"
                          id="weapon_finish_other"
                          onChange={onInputChange}
                          value={formState.weapon_finish_other}
                          disabled={avalible}
                          autoComplete="off"
                        />
                      </>
                    )}
                    <label htmlFor="weapon_cachas">Cachas</label>
                    <select
                      type="text"
                      name="weapon_cachas"
                      id="weapon_cachas"
                      onChange={onInputChange}
                      disabled={avalible}
                      value={formState.weapon_cachas}
                    >
                      <option> -- Cachas -- </option>
                      {finish.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {formState.weapon_cachas === "Otro" && (
                      <>
                        <label htmlFor="weapon_cachas_other">Otro</label>
                        <input
                          type="text"
                          placeholder="..."
                          name="weapon_cachas_other"
                          id="weapon_cachas_other"
                          onChange={onInputChange}
                          value={formState.weapon_cachas_other}
                          disabled={avalible}
                          autoComplete="off"
                        />
                      </>
                    )}
                    <label htmlFor="weapon_empunadura">Empu&ntilde;adura</label>
                    <select
                      type="text"
                      name="weapon_empunadura"
                      id="weapon_empunadura"
                      onChange={onInputChange}
                      value={formState.weapon_empunadura}
                      disabled={avalible}
                    >
                      <option> -- Empunadura -- </option>
                      {material_types.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {formState.weapon_empunadura === "Otro" && (
                      <>
                        <label htmlFor="weapon_empunadura_other">Otro</label>
                        <input
                          type="text"
                          placeholder="..."
                          name="weapon_empunadura_other"
                          id="weapon_empunadura_other"
                          onChange={onInputChange}
                          value={formState.weapon_empunadura_other}
                          autoComplete="off"
                          disabled={avalible}
                        />
                      </>
                    )}

                    <label htmlFor="weapon_culata">Culata</label>
                    <input
                      type="text"
                      name="weapon_culata"
                      id="weapon_culata"
                      placeholder="..."
                      onChange={onInputChange}
                      value={formState.weapon_culata}
                      disabled={avalible}
                      autoComplete="off"
                    />
                    <label htmlFor="weapon_guardamano">Guardamanos</label>
                    <select
                      type="text"
                      name="weapon_guardamano"
                      id="weapon_guardamano"
                      onChange={onInputChange}
                      disabled={avalible}
                      value={formState.weapon_guardamano}
                    >
                      <option> -- Guardamanos -- </option>
                      {material_types.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {formState.weapon_guardamano === "Otro" && (
                      <>
                        <label htmlFor="weapon_guardamano_other">Otro</label>
                        <input
                          type="text"
                          placeholder="..."
                          name="weapon_guardamano_other"
                          id="weapon_guardamano_other"
                          onChange={onInputChange}
                          value={formState.weapon_guardamano_other}
                          disabled={avalible}
                          autoComplete="off"
                        />
                      </>
                    )}
                    <label htmlFor="weapon_adj_specials">
                      Aditamentos especiales
                    </label>
                    <input
                      type="text"
                      name="weapon_adj_specials"
                      id="weapon_adj_specials"
                      placeholder="..."
                      onChange={onInputChange}
                      disabled={avalible}
                      value={formState.weapon_adj_specials}
                      autoComplete="off"
                    />
                    <label htmlFor="weapon_observation">Observaciones</label>
                    <textarea
                      name="weapon_observation"
                      id="weapon_observation"
                      placeholder="Observaciones..."
                      onChange={onInputChange}
                      value={formState.weapon_observation}
                      disabled={avalible}
                      autoComplete="off"
                    />
                  </>
                )
              }
              {
                /* -------------------------------------------------------------------------- */
                /*                                 FORM PAG 2                                 */
                /* -------------------------------------------------------------------------- */

                pag === 2 && (
                  <>
                    <h3 htmlFor="projectile_type">
                      Informaci&oacute;n del proyectil
                    </h3>
                    <h3 htmlFor="registro">Registro del investigador</h3>
                    <div className="form__container">
                      <div className="form__container-no-modify">
                        <ul>
                          <div>
                            <li className="white">Tipo</li>
                            <li>
                              {validateForm(
                                weapon.projectile_type,
                                weapon.projectile_type_other
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
                                weapon.projectile_caliber,
                                weapon.projectile_caliber_other
                              )}
                            </li>
                          </div>
                        </ul>
                      </div>
                    </div>
                    <br />
                    <label htmlFor="projectile_shape">Forma</label>
                    <select
                      type="text"
                      name="projectile_shape"
                      id="projectile_shape"
                      onChange={onInputChange}
                      disabled={avalible}
                      value={formState.projectile_shape}
                    >
                      <option> -- Forma -- </option>
                      {shape.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {formState.projectile_shape === "Otro" && (
                      <>
                        <label htmlFor="projectile_shape_other">Otro</label>
                        <input
                          type="text"
                          placeholder="..."
                          name="projectile_shape_other"
                          id="projectile_shape_other"
                          onChange={onInputChange}
                          value={formState.projectile_shape_other}
                          disabled={avalible}
                          autoComplete="off"
                        />
                      </>
                    )}
                    <label htmlFor="peritaje_projectile_observation">
                      Observaciones
                    </label>
                    <textarea
                      name="peritaje_projectile_observation"
                      id="peritaje_projectile_observation"
                      placeholder="Observaciones..."
                      onChange={onInputChange}
                      value={formState.peritaje_projectile_observation}
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
                    <h3 htmlFor="vainilla_type">
                      Informaci&oacute;n de la vainilla
                    </h3>
                    <h3 htmlFor="registro">Registro del investigador</h3>
                    <div className="form__container">
                      <div className="form__container-no-modify">
                        <ul>
                          <div>
                            <li className="white">Tipo</li>
                            <li>
                              {validateForm(
                                weapon.vainilla_type,
                                weapon.vainilla_type_other
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
                                weapon.vainilla_caliber,
                                weapon.vainilla_caliber_other
                              )}
                            </li>
                          </div>
                        </ul>
                      </div>
                    </div>
                    <br />
                    <label htmlFor="vainilla_shape">Forma</label>
                    <select
                      type="text"
                      name="vainilla_shape"
                      id="vainilla_shape"
                      onChange={onInputChange}
                      disabled={avalible}
                      value={formState.vainilla_shape}
                    >
                      <option> -- Forma -- </option>
                      {shape.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {formState.vainilla_shape === "Otro" && (
                      <>
                        <label htmlFor="vainilla_shape_other">Otro</label>
                        <input
                          type="text"
                          placeholder="..."
                          name="vainilla_shape_other"
                          id="vainilla_shape_other"
                          onChange={onInputChange}
                          value={formState.vainilla_shape_other}
                          disabled={avalible}
                          autoComplete="off"
                        />
                      </>
                    )}
                    <label htmlFor="vainilla_percution">Percusi&oacute;n</label>
                    <select
                      type="text"
                      name="vainilla_percution"
                      id="vainilla_percution"
                      onChange={onInputChange}
                      disabled={avalible}
                      value={formState.vainilla_percution}
                    >
                      <option> -- Percusion -- </option>
                      {percution.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    <label htmlFor="vainilla_observation">Observaciones</label>
                    <textarea
                      name="vainilla_observation"
                      id="vainilla_observation"
                      placeholder="Observaciones..."
                      onChange={onInputChange}
                      value={formState.vainilla_observation}
                      disabled={avalible}
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
              {pag < 3 && (
                <button
                  className="btn btn-primary"
                  onClick={addPag}
                  type="button"
                >
                  Siguiente
                </button>
              )}
              {pag === 3 && (
                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
