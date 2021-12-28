import React from 'react';
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {
  const avatarField = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

  React.useEffect(() => {
    avatarField.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarField.current.value
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popup_content_update"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}>
      <fieldset className="form__profile-info">
        <input
          type="url"
          name="avatar"
          id="cardurl-input"
          className="form__text-input form__text-input_name_cardurl"
          placeholder="Ссылка на аватар"
          ref={avatarField}
          required
        />
        <span className="form__input-error cardurl-input-error"></span>
      </fieldset>
    </PopupWithForm>
  )

}

export default EditAvatarPopup;
