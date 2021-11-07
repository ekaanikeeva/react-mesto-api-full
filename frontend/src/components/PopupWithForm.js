import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__btn-close"
          aria-label="Закрыть"
          title="Закрыть"
          onClick={props.onClose}
        />
        <form
          action="#"
          name={props.name}
          className={`form form_${props.name}`}
          onSubmit={props.onSubmit}
        >
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="form__btn-save">
            {props.nameSubmitBtn}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
