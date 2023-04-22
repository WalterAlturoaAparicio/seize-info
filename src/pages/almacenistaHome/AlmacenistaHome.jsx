import React, { useState } from "react"
import "./almacenistaHome.css"
import { weapons } from "../../data/data"
import { searchField } from "../../utils/forms"
import { TableAlmacenist } from "./TableAlmacenista"

export const AlmacenistaHome = () => {
  const [busqueda, setBusqueda] = useState("")
  const [error, setError] = useState()

  const weapons_almacenist = weapons.filter((weapon) => !weapon.almacenista)

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
            <h1 className="title">Registros</h1>
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
        <TableAlmacenist data={weapons_almacenist} />
      </div>
    </section>
  )
}
