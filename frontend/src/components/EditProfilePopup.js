import React from 'react';
import PopupWithForm from "./PopupWithForm";
//import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";



function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="popup_content_profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">
      <fieldset className="form__profile-info">
        <input
          type="text"
          name="name"
          id="name-input"
          className="form__text-input form__text-input_name_name"
          value={name}
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
          required
        />
        <span className="form__input-error name-input-error"></span>
        <input
          type="text"
          name="about"
          id="name-job"
          className="form__text-input form__text-input_name_job"
          value={description}
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          onChange={handleChangeDescription}
          required
        />
        <span className="form__input-error name-job-error"></span>
      </fieldset>
    </PopupWithForm>
  )

}

export default EditProfilePopup;
