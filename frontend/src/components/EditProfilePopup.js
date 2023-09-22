import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleChangeName(e) {
    setName(e.target.value);

    if (!e.target.value) {
      setNameError('Поле не может быть пустым');
      setIsFormValid(false);
    } else {
      setNameError('');
      setIsFormValid(true);
    }
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);

    if (!e.target.value) {
      setDescriptionError('Поле не может быть пустым');
      setIsFormValid(false);
    } else {
      setDescriptionError('');
      setIsFormValid(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!nameError & !descriptionError) {
      onUpdateUser({
        name: name,
        about: description,
      });
    }
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameError('');
    setDescriptionError('')
    setIsFormValid(false)
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      class="profile-edit"
      id="editform"
      name="profile-name"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
      isFormValid={isFormValid}
    >
      <div className="popup__input-container">
        <input
          id="username"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
          value={name}
        />
        <span id="username-error" className="popup__error-message">
          {nameError}
        </span>
      </div>
      <div className="popup__input-container">
        <input
          id="about"
          className="popup__input popup__input_type_about"
          name="about"
          placeholder="Описание"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangeDescription}
          value={description}
        />
        <span id="about-error" className="popup__error-message">
          {descriptionError}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
