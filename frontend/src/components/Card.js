import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.cardData.owner === currentUser._id;
  const isLiked = props.cardData.likes.some((i) => i === currentUser._id);

  const cardDeleteButtonClassName = `figure__basket ${
    isOwn ? "figure__basket" : "figure__basket_hide"
  }`;

  const cardLikeButtonClassName = `figure__like ${
    isLiked ? "figure__like_active" : "figure__like"
  }`;

  function handleClick() {
    props.onCardClick(props.cardData);
  }

  function handleLikeClick() {
    props.onCardLike(props.cardData);
  }

  function handleBasketClick() {
    props.onCardDelete(props.cardData);
  }

  return (
    <li className="figure">
      <img
        className="figure__pic figure__pic-btn"
        src={props.cardData.link}
        alt={props.cardData.name}
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleBasketClick}
      ></button>
      <h2 className="figure__name">{props.cardData.name}</h2>
      <button
        type="button"
        className={cardLikeButtonClassName}
        onClick={handleLikeClick}
      >
        <p className="figure__like-counter">{props.cardData.likes.length}</p>
      </button>
    </li>
  );
}

export default Card;
