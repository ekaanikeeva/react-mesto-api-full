import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_photo ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container-photo">
        <button
          type="button"
          className="popup__btn-close"
          aria-label="Закрыть"
          title="Закрыть"
          onClick={props.onClose}
        />
        <img className="popup__img" src={props.link} alt={props.name} />
        <h2 className="popup__name">{props.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
