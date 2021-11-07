import React from "react";
// import { useCookies } from 'react-cookie';
import "../index.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import { CardsContext } from "../context/CardsContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Route, Switch, useHistory } from "react-router";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { register, login, token } from "../utils/apiAuth.js";

function App() {
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isHappyRegister, setIsHappyRegister] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");

  const history = useHistory();

  function tokenCheck() {
      token()
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data[0].email);
          history.push("/");

        })
        .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (loggedIn){
      api
      .getUserInfo()
      .then((res) => {
      setCurrentUser(res.data[0])
      }
      )
      .catch((err) => {
        console.log(`Не удалось загрузить данные пользователя ${err}`);
      });

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(`Не удалось загрузить карточки на страницу ${err}`);
      });}
  }, [loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, [history]);

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (someLike) => someLike === currentUser._id
    );
    {
      !isLiked
        ? api
            .postLike(card._id)
            .then((newCard) =>
              setCards((state) =>
                state.map((cardLikes) =>
                  cardLikes._id === card._id ? newCard : cardLikes
                )
              )
            )
            .catch((err) => {
              console.log(
                `Не удалось постаить лайк картинке. Попробуйте позже ${err}`
              );
            })
        : api
            .deleteLike(card._id)
            .then((newCard) =>
              setCards((cardsArray) =>
                cardsArray.map((cardLikes) =>
                  cardLikes._id === card._id ? newCard : cardLikes
                )
              )
            )
            .catch((err) => {
              console.log(`Лайк остался, не удалось убрать лайк ${err}`);
            });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((cardsArray) =>
          cardsArray.filter((element) => element._id !== card._id)
        )
      )
      .catch((err) => {
        console.log(`Не удалось удалить картинку ${err}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInform({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Не удалось редактировать данные пользователя ${err}`);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Не удалось редактировать аватар пользователя ${err}`);
      });
  }

  function handleAddPlaceSubmit({ title, link }) {
    api
      .addCard({ title, link })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Не удалось добавить новое место ${err}`);
      });
  }

  function handleRegister(email, password) {
    register(password, email)
      .then(() => {
        setIsHappyRegister(true);
        setIsInfoTooltipOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        setIsHappyRegister(false);
        setIsInfoTooltipOpen(true);
        console.log(`Не удалось зарегистрироваться ${err}`);
      });
  }

  function handleLogin(email, password) {
    login(password, email)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(email);
        history.push("/");
        // setCookie("token", res.token);
      })
      .catch((err) => {
        console.log(`Не удалось войти ${err}`);
      });
  }

  function signOut() {
    setLoggedIn(false);
    history.push("/signin");
  }
  

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          nameSubmitBtn="Да"
        ></PopupWithForm>

        <InfoTooltip
          name="log"
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          whatRegister={isHappyRegister}
        />
        <Header email={userEmail} out={signOut} />
        <Switch>
          <Route path="/signup">
            <Register name="register" onRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login name="login" onLogin={handleLogin} />
          </Route>
          <CardsContext.Provider value={cards}>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />
          </CardsContext.Provider>
          <Footer />
        </Switch>
        <ImagePopup
          isOpen={selectedCard}
          onClose={closeAllPopups}
          link={selectedCard?.link}
          name={selectedCard?.name}
        ></ImagePopup>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;