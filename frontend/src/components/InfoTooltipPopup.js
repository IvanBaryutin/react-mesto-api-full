import React from 'react';
import errorPath from "../images/alert.png";
import successPath from "../images/ok.png";

function InfoTooltipPopup(props) {
  return (
    <div className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img className="popup__alert-image" alt="icon" src={props.tooltipData.status ? successPath : errorPath} />
        <p className="popup__alert-message">{props.tooltipData.message}</p>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltipPopup;
