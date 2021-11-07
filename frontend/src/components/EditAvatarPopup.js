import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
    avatarRef.current.value = "";
  }
  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      nameSubmitBtn="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="link"
        className="form__info form__info_link form__info_avatar"
        placeholder="Ссылка на картинку"
        id="input-linkAvatar"
        ref={avatarRef}
        required
      />
      <span className="input-linkAvatar-error form__input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
