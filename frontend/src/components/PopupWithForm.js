import React from 'react';

function PopupWithForm({ isOpen, onClose, name, onSubmit, title, children, id, buttonText, isFormValid, ...props }) {
  return (
    <div className={`popup popup_type_${props.class} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <form id={id} className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          <h2 className="popup__heading">{title}</h2>
          {children}
          <button className={`popup__save-button ${!isFormValid ? 'popup__save-button_disabled' : ''}`} type="submit" disabled={!isFormValid}>{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
