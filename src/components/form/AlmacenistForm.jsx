import React, { useEffect, useState } from "react"
import { useForm } from "../../hook/useForm"
// import { error } from "../../utils/error"
// import { validateForm } from "../../utils/forms"

export const AlmacenistForm = (props) => {
  const { toggleModal, weapon, ley } = props
  const initialValues = {
    ...weapon,
  }
  const { formState } = useForm(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [pag, setPag] = useState(0)
  const [isNext, setIsNext] = useState(false)

  const registerSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formState))
    setIsSubmit(true)
  }
  const validate = (values) => {
    const errors = {}
    switch (pag) {
      case 0:
        break
      case 1:
        break
      case 2:
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
    setPag(pag - 1)
  }
  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      if (isNext) {
        setPag(pag + 1)
        setIsNext(false)
      }
      if (isSubmit) {
        toggleModal()
      }
    }
  }, [formErrors, pag, isSubmit, toggleModal, isNext])
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
                    pag === 0 && <></>
                  }
                  {
                    /* -------------------------------------------------------------------------- */
                    /*                                 FORM PAG 1                                 */
                    /* -------------------------------------------------------------------------- */
                    pag === 1 && <></>
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
                    pag === 0 && <></>
                  }
                  {
                    /* -------------------------------------------------------------------------- */
                    /*                                 FORM PAG 1                                 */
                    /* -------------------------------------------------------------------------- */
                    pag === 1 && <></>
                  }
                  {
                    /* -------------------------------------------------------------------------- */
                    /*                                 FORM PAG 2                                 */
                    /* -------------------------------------------------------------------------- */

                    pag === 2 && <></>
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
                  {pag < 2 && (
                    <button
                      className="btn btn-primary"
                      onClick={addPag}
                      type="button"
                    >
                      Siguiente
                    </button>
                  )}
                  {pag === 2 && (
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
