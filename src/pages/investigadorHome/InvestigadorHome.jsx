import React, { useState } from "react"
import "./investigadorHome.css"
import { InvestForm } from "../../components/form/InvestForm"

export const InvestigadorHome = () => {
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
        {modal && <InvestForm toggleModal={toggleModal}/>}
      </div>
    </section>
  )
}
