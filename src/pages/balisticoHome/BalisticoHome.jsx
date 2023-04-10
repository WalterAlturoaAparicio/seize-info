import React, { useState } from "react"
import "./balisticHome.css"
import { weapons } from "../../data/data"
import { TableBalistic } from "./TableBalistic"
import { searchField } from "../../utils/forms"

export const BalisticoHome = () => {
  const [busqueda, setBusqueda] = useState("")
  const [error, setError] = useState()

  const weapons_peritaje = weapons.filter((weapon) => !weapon.peritaje)

  const handleSearch = (e) => {
    e.preventDefault()
    const res = searchField(busqueda, weapons, "nunc")
    if (res.error) setError(res.error)
    else setError()
  }
  const handleChangeSearch = ({ target: { value } }) => {
    setBusqueda(value)
  }
  return (
    <section className="invest">
      <div className="container invest__container">
        <form onSubmit={handleSearch}>
          <p className="error-form">{error}</p>
          <div className="table__title">
            <h3 className="title">Registros sin peritaje</h3>
            <input
              type="text"
              name="buscar"
              className="buscar"
              placeholder="Ingrese el nunc"
              value={busqueda}
              onChange={handleChangeSearch}
            />
            <button className="btn btn-primary btn-buscar" type="submit">
              Buscar
            </button>
          </div>
        </form>
        <br />
        <TableBalistic data={weapons_peritaje} />
      </div>
    </section>
  )
}
