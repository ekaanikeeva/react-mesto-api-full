import React from "react";
import positiveImg from "../images/Union.png";
import negativeImg from "../images/Union2.png";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_withTooltip ">
        <button
          type="button"
          className="popup__btn-close"
          aria-label="Закрыть"
          title="Закрыть"
          onClick={props.onClose}
        />
        <img
          className="form__infoTool-image"
          alt={
            props.whatRegister
              ? "Ура! Получилось! Зеленая галочка"
              : "Не вышло :( Красный крестик"
          }
          src={props.whatRegister ? positiveImg : negativeImg}
        />
        <h2 className="form__title form__title_center">
          {props.whatRegister
            ? `Вы успешно зарегистрировались!`
            : `Что-то пошло не так!
Попробуйте ещё раз.`}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
