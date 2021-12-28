//import React, { useState } from "react";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  let deleteButton;
  deleteButton = (isOwn) ? <button type="button" onClick={handleCardDelete} className="element__delete-icon" aria-label="Удалить" ></button> : ""

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (isLiked) ? "element__like-icon element__like-icon_active" : "element__like-icon";

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }



  return (
    <article className="element">
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      {deleteButton}
      <div className="element__description">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__likearea">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )

}
export default Card;
