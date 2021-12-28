import React from 'react';
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {

  const cardTitleField = React.useRef();
  const cardLinkField = React.useRef();

  React.useEffect(() => {
    cardTitleField.current.value = '';
    cardLinkField.current.value = '';
  }, [props.isOpen]);


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    props.onAddPlace({
      name: cardTitleField.current.value,
      link: cardLinkField.current.value,
    })

  }

  return (
    <PopupWithForm
      title="Новое место"
      name="popup_content_article"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">
      <fieldset className="form__profile-info">
        <input
          ref={cardTitleField}
          type="text"
          name="name"
          id="title-input"
          className="form__text-input form__text-input_name_title"
          //value=""
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__input-error title-input-error"></span>
        <input
          ref={cardLinkField}
          type="url"
          name="link"
          id="link-input"
          className="form__text-input form__text-input_name_link"
          //value=""
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__input-error link-input-error"></span>
      </fieldset>
    </PopupWithForm>
  )

}

export default AddPlacePopup;
