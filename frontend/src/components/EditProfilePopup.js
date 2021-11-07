import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(change) {
    setName(change.target.value);
  }

  function handleChangeStatus(change) {
    setDescription(change.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      nameSubmitBtn="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        value={name || ""}
        onChange={handleChangeName}
        className="form__info form__info_name"
        id="input-name"
        placeholder="Как Вас зовут?"
        required
        minLength={2}
        maxLength={40}
      />
      <span className="input-name-error form__input-error" />
      <input
        type="text"
        name="status"
        value={description || ""}
        onChange={handleChangeStatus}
        className="form__info form__info_status"
        placeholder="Расскажите о себе"
        id="input-status"
        required
        minLength={2}
        maxLength={200}
      />
      <span className="input-status-error form__input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
