import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm class="change-avatar" id="change-avatar-form" name="change-avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText={'Сохранить'}>
      <div className="popup__input-container">
        <input id="avatar-link" className="popup__input popup__input_type_link" name="link" placeholder="Ссылка на картинку" required type="url" ref={avatarRef} onSubmit={handleSubmit}></input>
        <span id="avatar-link-error" className="popup__error-message"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
