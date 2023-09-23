import '../index.css';
import React from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!emailError & !passwordError) {
      onLogin(email, password);
    }
  }

  function handleInputEmail(e) {
    setEmail(e.target.value);

    if (!e.target.value) {
      setEmailError('Поле не может быть пустым');
      setIsFormValid(false);
    } else {
      setEmailError('');
      setIsFormValid(true);
    }
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);

    if (!e.target.value) {
      setPasswordError('Поле не может быть пустым');
      setIsFormValid(false);
    } else {
      setPasswordError('');
      setIsFormValid(true);
    }
  }

  return (
    <form className="login-register" onSubmit={handleSubmit}>
      <h1 className="login-register__title">Вход</h1>
      <div class="login-register__input-container">
        <input
          className="login-register__input"
          value={email}
          onChange={handleInputEmail}
          placeholder="Email"
          type="email"
          required
        ></input>
        <span className="login-register__error-message">{emailError}</span>
      </div>
      <div class="login-register__input-container">
        <input
          className="login-register__input"
          value={password}
          onChange={handleInputPassword}
          placeholder="Пароль"
          type="password"
          required
        ></input>
        <span className="login-register__error-message">{passwordError}</span>
      </div>
      <button className={`login-register__button ${!isFormValid ? 'popup__save-button_disabled' : ''}`} disabled={!isFormValid}>Войти</button>
    </form>
  );
}

export default Login;
