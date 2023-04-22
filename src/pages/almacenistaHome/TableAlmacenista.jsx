import React, { useState } from "react"
import "./almacenistaHome.css"
import { AlmacenistForm } from "../../components/form/AlmacenistForm"

export const TableAlmacenist = ({ data }) => {
  const [modal, setModal] = useState(false)
  const [ley, setLey] = useState(false)
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
            <th className="center">Acciones</th>
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
                  <td className="center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setWeapon(w)
                        setLey(false)
                        toggleModal()
                      }}
                    >
                      DECRETO 2535 1993
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setWeapon(w)
                        setLey(true)
                        toggleModal()
                      }}
                    >
                      LEY 906 2004
                    </button>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
      {modal && (
        <AlmacenistForm toggleModal={toggleModal} weapon={weapon} ley={ley} />
      )}
    </>
  )
}
