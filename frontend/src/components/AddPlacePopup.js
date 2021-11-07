import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const cardTitleRef = React.useRef();
  const cardLinkRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();

    props.onAddCard({
      title: cardTitleRef.current.value,
      link: cardLinkRef.current.value,
    });
    cardTitleRef.current.value = "";
    cardLinkRef.current.value = "";
  }
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      nameSubmitBtn="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        className="form__info form__info_title"
        id="input-title"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
        ref={cardTitleRef}
      />
      <span className="input-title-error form__input-error" />
      <input
        type="url"
        name="link"
        className="form__info form__info_link"
        placeholder="Ссылка на картинку"
        id="input-link"
        ref={cardLinkRef}
        required
      />
      <span className="input-link-error form__input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
