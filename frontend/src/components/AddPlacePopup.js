import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleSetName(e) {
    setName(e.target.value)
  }

  function handleSetLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name: name,
      link: link,
    })
  }

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  return (
    <PopupWithForm class="add-card" id="addform" name="profile-name" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText={'Создать'}>
      <div className="popup__input-container">
        <input id="cardname" className="popup__input popup__input_type_name" name="name" placeholder="Название" required minLength="2" maxLength="30" onChange={handleSetName} value={name} />
        <span id="cardname-error" className="popup__error-message"></span>
      </div>
      <div className="popup__input-container">
        <input id="link" className="popup__input popup__input_type_link" name="link" placeholder="Ссылка на картинку" required type="url" onChange={handleSetLink} value={link} />
        <span id="link-error" className="popup__error-message"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup
