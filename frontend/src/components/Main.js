import React from "react";
import { CardsContext } from "../context/CardsContext";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          className="profile__change-avatar-btn"
          onClick={props.onEditAvatar}
        />
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Аватар профиля"
        />
        <div className="profile__info">
          <h1 id="profile-name" className="profile__name">
            {currentUser.name}
          </h1>
          <p id="profile-status" className="profile__status">
            {currentUser.about}
          </p>
        </div>
        <button
          type="button"
          className="profile__edit-btn"
          onClick={props.onEditProfile}
        />
        <button
          type="button"
          className="profile__add-btn"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="photo-list">
        <ul className="figures">
          {cards.map((item) => {
            return (
              <Card
                key={item._id}
                cardData={item}
                onCardClick={props.onCardClick}
                onCardLike={props.handleCardLike}
                onCardDelete={props.handleCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
