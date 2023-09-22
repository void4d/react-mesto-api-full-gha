import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const [nameError, setNameError] = React.useState('');
  const [linkError, setLinkError] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleSetName(e) {
    setName(e.target.value);

    if (!e.target.value) {
      setNameError('Поле не может быть пустым');
      setIsFormValid(false);
    } else {
      setNameError('');
      setIsFormValid(true);
    }
  }

  function handleSetLink(e) {
    setLink(e.target.value);

    if (!e.target.value) {
      setLinkError('Поле не может быть пустым');
      setIsFormValid(false);
    } else {
      setLinkError('');
      setIsFormValid(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!nameError & !linkError) {
      onAddPlace({
      name: name,
      link: link,
    });
    }
    
  }

  React.useEffect(() => {
    setName('');
    setLink('');
    setNameError('');
    setLinkError('');
    setIsFormValid(false)
  }, [isOpen]);

  return (
    <PopupWithForm
      class="add-card"
      id="addform"
      name="profile-name"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Создать'}
      isFormValid={isFormValid}
    >
      <div className="popup__input-container">
        <input
          id="cardname"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleSetName}
          value={name}
        />
        <span id="cardname-error" className="popup__error-message">{nameError}</span>
      </div>
      <div className="popup__input-container">
        <input
          id="link"
          className="popup__input popup__input_type_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          type="url"
          onChange={handleSetLink}
          value={link}
        />
        <span id="link-error" className="popup__error-message">{linkError}</span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
