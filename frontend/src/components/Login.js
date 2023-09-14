import '../index.css'
import React from 'react'

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password)
  }

  return (
    <form className="login-register" onSubmit={handleSubmit}>
      <h1 className="login-register__title">Вход</h1>
      <input className="login-register__input" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" type="email" required></input>
      <input className="login-register__input" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Пароль" type="password" required></input>
      <button className="login-register__button">Войти</button>
    </form>
  )
}

export default Login

