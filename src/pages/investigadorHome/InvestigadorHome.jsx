import React, { useState } from "react"
import { useForm } from "../../hook/useForm"
import "./investigadorHome.css"

const weapon_types = [
  "Pistola",
  "revolver",
  "fusil",
  "ametralladora",
  "escopeta",
  "carabina",
  "otra",
]

const weapons = []
export const InvestigadorHome = () => {
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }
  modal
    ? document.body.classList.add("active-modal")
    : document.body.classList.remove("active-modal")

  const {
    funcionario,
    weapon_type,
    weapon_type_other,
    weapon_brand,
    uni_poli,
    onInputChange,
  } = useForm({
    funcionario: "",
    weapon_type: "",
    weapon_type_other: "",
    weapon_brand: "",
  })
  return (
    <section className="invest">
      <div className="container invest__container">
        <button className="btn btn-primary" onClick={toggleModal}>
          Nuevo
        </button>
        {modal && (
          <div className="modal">
            <div className="overlay">
              <div className="invest__container-form">
                <button className="btn btn-close" onClick={toggleModal}></button>
                <form className="invest__form">

                  <div className="invest__form-inputs">
                    <h3 htmlFor="weapon_type">Informaci&oacute;n principal</h3>
                    <label htmlFor="consecutivo">Consecutivo</label>
                    <input
                      type="text"
                      name="consecutivo"
                      id="consecutivo"
                      value={weapons.length + 1}
                      disabled={true}
                    />
                    <label htmlFor="funcionario">
                      Funcionario que Incauta/Recibe el arma y/o municiones.{" "}
                      <span className="input__required">*</span>
                    </label>
                    <input
                      type="text"
                      name="funcionario"
                      id="funcionario"
                      placeholder="Grado / cedula / nombre"
                      onChange={onInputChange}
                      value={funcionario}
                      autoComplete="off"
                    />
                    <label htmlFor="uni_poli">Unidad Policial</label>
                    <input
                      type="text"
                      placeholder="20001"
                      name="uni_poli"
                      id="uni_poli"
                      value={uni_poli}
                      onChange={onInputChange}
                      autoComplete="off"
                    />
                    <h3 htmlFor="weapon_type">Arma</h3>
                    <label htmlFor="weapon_type">Tipo</label>
                    <select
                      type="text"
                      placeholder="Tipo"
                      name="weapon_type"
                      id="weapon_type"
                      onChange={onInputChange}
                      value={weapon_type}
                      autoComplete="off"
                    >
                      {weapon_types.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    {weapon_type === "otra" && (
                      <input
                        type="text"
                        placeholder="otra, ¿Cu&aacute;l?"
                        name="weapon_type_other"
                        id="weapon_type_other"
                        onChange={onInputChange}
                        value={weapon_type_other}
                        autoComplete="off"
                      />
                    )}
                    <input
                      type="text"
                      placeholder="Marca"
                      name="weapon_brand"
                      id="weapon_brand"
                      onChange={onInputChange}
                      value={weapon_brand}
                      autoComplete="off"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Registrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
