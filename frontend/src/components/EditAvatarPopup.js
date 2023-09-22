import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  const [avatar, setAvatar] = React.useState('');
  const [avatarError, setAvatarError] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    setAvatar('')
    setIsFormValid(false)
  }, [isOpen])

  function handleAvatarChange(e) {
    const value = e.target.value;
    setAvatar(value);

    if (!value) {
      setAvatarError('Поле не может быть пустым');
      setIsFormValid(false)
    } else {
      setAvatarError('');
      setIsFormValid(true)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!avatarError) {
      onUpdateAvatar({
        avatar: avatarRef.current.value,
      });
    }
  }

  return (
    <PopupWithForm
      class="change-avatar"
      id="change-avatar-form"
      name="change-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
      isFormValid={isFormValid}
    >
      <div className="popup__input-container">
        <input
          id="avatar-link"
          className="popup__input popup__input_type_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          type="url"
          ref={avatarRef}
          onSubmit={handleSubmit}
          value={avatar}
          onChange={handleAvatarChange}
        ></input>
        <span id="avatar-link-error" className="popup__error-message">
          {avatarError}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
