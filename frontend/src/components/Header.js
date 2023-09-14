import logo from "../images/logo.svg";
import line from "../images/line.svg";
import { Link, Routes, Route } from "react-router-dom";

function Header({ isLoggedIn, onLogout, headerEmail }) {
  return (
    <header className="header">
      <img src={logo} alt="Место. Россия" className="header__logo" />
      <div className="header__login-block">
        {isLoggedIn ? <p className="header__email">{headerEmail}</p> : ""}
        {isLoggedIn ? <p className="header__login-logout-text" onClick={onLogout}>Выйти</p> : ''}

        {!isLoggedIn && (
          <Routes>
            <Route
              path="/signin"
              element={
                <Link to="/signup">
                  <p className="header__login-logout-text">Регистрация</p>
                </Link>
              }
            />{" "}
            :
            <Route
              path="/signup"
              element={
                <Link to="/signin">
                  <p className="header__login-logout-text">Войти</p>
                </Link>
              }
            />
          </Routes>
        )}
      </div>
      {isLoggedIn ? (
        <div className="header__menu-button">
          <img src={line} className="header__line"></img>
          <img src={line} className="header__line"></img>
          <img src={line} className="header__line"></img>
        </div>
      ) : (
        ''
      )}


    </header>
  );
}

export default Header;
