import React from 'react';
import PopupWithForm from "./PopupWithForm";


function ApproveDeletePopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.selectedCard)
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="popup_content_confirm"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
    />
  )

}

export default ApproveDeletePopup;
