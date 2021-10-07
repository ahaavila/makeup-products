import React from 'react';
import './styles.scss';

export const modalClosedStyle = {
  display: 'none'
}

const ModalDefault = ({ children, modalType, closeModal, isModalOpen }) => {

  switch (modalType) {
    case "MODAL_LOADING":
      return (
        <div style={{ "display": "block" }} className="modal-wrapper">
          <div className="modal-content">
            <div style={{ "marginTop": "35px" }}>
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>
            <div>
                <p style={{ "fontSize": "18px", "marginTop": "25px" }}>Aguarde...</p>
            </div>
            <div>
                {children}
            </div>
          </div>
        </div>
      )
    case "MODAL_IMAGE":
      return (
        <div  className="modal-wrapper" style={isModalOpen ? { "display": "flex", justifyContent: 'flex-start' } : { ...modalClosedStyle }}>
          <div className="modal-content" style={{ height: '60%', overflow: 'auto'}}>
            {closeModal &&
              <div className="modal-close-button" onClick={() => {
                  if (closeModal) {
                      closeModal()
                  }
                }}>{"\u00D7"}
              </div>
            }
            <div style={{ minWidth: '65%', maxHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {children}
            </div>
          </div>
        </div>
      )
    default:
      return (
        <div className="modal-wrapper" style={isModalOpen ? { "display": "block" } : { ...modalClosedStyle }}>
          <div className="modal-content">
            {closeModal ?
              <div className="modal-close-button" onClick={() => { if (closeModal) { closeModal() } }}>
                  {"\u00D7"}
              </div>
              :
              null
            }
            {children}
          </div>
        </div>
      )
  }
}

export default ModalDefault;