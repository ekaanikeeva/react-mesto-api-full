import React from "react";
import logo from "../images/logo.svg";
import { Link, Route } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип с белым текстом Место Россия"
      />
      <Route path="/signup">
        <Link to="/signin" className="header__link">
          Войти
        </Link>
      </Route>
      <Route path="/signin">
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      </Route>
      <Route exact path="/">
        <div className="header__data">
          <h3 className="header__email">{props.email}</h3>
          <Link to="/signin" className="header__link" onClick={props.out}>
            Выйти
          </Link>
        </div>
      </Route>
    </header>
  );
}

export default Header;
