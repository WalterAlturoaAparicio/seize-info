import React from "react"
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
export const InvestigadorHome = () => {
  const { weapon_type, weapon_type_other, weapon_brand, onInputChange } =
    useForm({
      weapon_type: "",
      weapon_type_other: "",
      weapon_brand: "",
    })
  return (
    <section className="invest">
      <div className="container invest__container">
        <div className="invest__container-form">
          <form onSubmit className="invest__form">
            <h3 htmlFor="weapon_type">Arma</h3>
            <div className="invest__form-inputs">
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
                  <option>{opt}</option>
                ))}
              </select>
              {weapon_type === "otra" ? (
                <input
                  type="text"
                  placeholder="otra, ¿Cual?"
                  name="weapon_type_other"
                  id="weapon_type_other"
                  onChange={onInputChange}
                  value={weapon_type_other}
                  autoComplete="off"
                />
              ) : (
                <></>
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
    </section>
  )
}
