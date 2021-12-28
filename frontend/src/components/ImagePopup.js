import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_content_image ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__figure">
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <div className="popup__figcaption">{props.card.name}</div>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close popup__close_content_image"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
