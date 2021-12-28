import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form className="form" name={`${props.name}`} onSubmit={props.onSubmit}>
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button type="submit" value="Сохранить" className="form__submit-button">
            {props.buttonText}
          </button>
        </form>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close popup__close_content_profile"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
