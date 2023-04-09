import React, { useState } from "react"
import "./balisticHome.css"
import { BalisticForm } from "../../components/form/BalisticForm"

export const TableBalistic = ({ data }) => {
  const [modal, setModal] = useState(false)
  const [weapon, setWeapon] = useState({})
  const toggleModal = () => {
    setModal(!modal)
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="left">Consecutivo</th>
            <th className="left">Nunc</th>
            <th className="right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.lenght === 0 ? (
            <tr>
              <td colSpan={3}>Sin datos</td>
            </tr>
          ) : (
            data.map((w) => {
              return (
                <tr key={w.consecutivo}>
                  <td className="left">{w.consecutivo}</td>
                  <td className="left">{w.nunc}</td>
                  <td className="right">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setWeapon(w)
                        toggleModal()
                      }}
                    >
                      Peritaje
                    </button>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
      {modal && <BalisticForm toggleModal={toggleModal} weapon={weapon} />}
    </>
  )
}
