import '../index.css'
import React from 'react'
import { Link } from 'react-router-dom'

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password)
  }

  return (
    <form className="login-register" onSubmit={handleSubmit}>
      <h1 className="login-register__title">Регистрация</h1>
      <input className="login-register__input" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" type="email" required></input>
      <input className="login-register__input" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Пароль" type="password" required></input>
      <button className="login-register__button" >Зарегистрироваться</button>
      <p className="login-register__text">
        Уже зарегистрированы?{' '}
        <Link to="/signin" className="login-register__text">
          Войти
        </Link>
      </p>
    </form>
  )
}

export default Register
