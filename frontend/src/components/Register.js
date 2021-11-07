import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(change) {
    setEmail(change.target.value);
  }

  function handleChangePassword(change) {
    setPassword(change.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <>
      <form
        action="#"
        name={props.name}
        className={`form form_login`}
        onSubmit={handleSubmit}
      >
        <h2 className="form__title form__title_login">Регистрация</h2>
        <input
          value={email || ""}
          type="email"
          name="emailWithRegister"
          className="form__info form__info_login form__info_title"
          id="input-reg-email"
          placeholder="E-mail"
          required
          minLength={2}
          maxLength={50}
          onChange={handleChangeEmail}
        />
        <span className="input-title-error form__input-error" />
        <input
          value={password || ""}
          onChange={handleChangePassword}
          type="password"
          name="passwordWithRegister"
          className="form__info form__info_login form__info_link"
          placeholder="Пароль"
          id="input-reg-password"
          required
        />
        <span className="input-link-error form__input-error" />
        <button
          type="submit"
          className="form__btn-save form__btn-save_register"
        >
          Зарегистрироваться
        </button>
        <Link to="/signin" className="form__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </>
  );
}

export default Register;
