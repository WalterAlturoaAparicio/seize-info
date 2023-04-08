import React, { useState } from "react"
import "./balisticHome.css"
import { BalisticForm } from "../../components/form/BalisticForm"

export const BalisticoHome = () => {
  //modal
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }
  modal
    ? document.body.classList.add("active-modal")
    : document.body.classList.remove("active-modal")

  return (
    <section className="invest">
      <div className="container invest__container">
        <button className="btn btn-primary" onClick={toggleModal}>
          Nuevo
        </button>
        {modal && <BalisticForm toggleModal={toggleModal}/>}
      </div>
    </section>
  )
}
