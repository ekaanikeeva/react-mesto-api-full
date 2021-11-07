import React from "react";

function Login(props) {
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
    props.onLogin(email, password);
  }

  return (
    <form
      action="#"
      name={props.name}
      className={`form form_login`}
      onSubmit={handleSubmit}
    >
      <h2 className="form__title form__title_login">Вход</h2>
      <input
        onChange={handleChangeEmail}
        value={email || ""}
        type="email"
        name="email"
        className="form__info form__info_login form__info_title"
        id="input-email"
        placeholder="E-mail"
        required
        minLength={2}
        maxLength={30}
      />
      <span className="input-title-error form__input-error" />
      <input
        onChange={handleChangePassword}
        value={password || ""}
        type="password"
        name="password"
        className="form__info form__info_login form__info_link"
        placeholder="Пароль"
        id="input-password"
        required
      />
      <span className="input-link-error form__input-error" />
      <button type="submit" className="form__btn-save form__btn-save_login">
        Войти
      </button>
    </form>
  );
}

export default Login;
