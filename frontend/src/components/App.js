import "../index.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';

import Header from "./Header.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import InfoTooltipPopup from "./InfoTooltipPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ApproveDeletePopup from "./ApproveDeletePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute.js"; // импортируем HOC
import * as Auth from '../utils/auth.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpened] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpened] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpened] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpened] = useState(false);
  const [infoTooltipData, setInfoTooltipData] = useState({status: false, message: ''});
  const [isApproveDeletePopupOpen, setIsApproveDeletePopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const history = useHistory();

  // Аналогично componentDidMount и componentDidUpdate:

  useEffect(() => {
    // Загружаем первоначальную информация с сервера
    Promise.all([
      api.getUserInfo(),
      // api.getInitialCards(),
    ])
      .then(([userData, initialCardsData]) => {
        console.log(userData);
        setCurrentUser(userData);
        //setCards(initialCardsData);
      })
      .catch((err) => {
        // попадаем сюда, если один из промисов завершится ошибкой
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // если у пользователя есть токен в localStorage, проверим валидность токена
    const jwt = localStorage.getItem('jwt');
    //console.log(jwt);
    if (jwt){
      // проверим токен
      Auth.getContent(jwt).then((res) => {
        if (res){
          // авторизуем пользователя
          //console.log('logged');
          setCurrentUserData(res.data);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        // попадаем сюда, если один из промисов завершится ошибкой
        console.log(err);
      });
    }
  }, [history]);




  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpened(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpened(true);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
      });
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`)
    });

  };

  function handleOpenDeletePopup(card) {
    setSelectedCard(card);
    setIsApproveDeletePopupOpened(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setIsImagePopupOpened(false);
    setIsApproveDeletePopupOpened(false);
    setIsInfoTooltipPopupOpened(false);
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
      });
  }

  function handleUpdateAvatar(userData) {
    api.updateAvatar(userData)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
      });
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setCurrentUserData({email: email});
  }

  function handleLoginError(status, message) {
    setInfoTooltipData({status: status, message: message})
    setIsInfoTooltipPopupOpened(true);
  }

  function handleRegister(status, message) {
    setInfoTooltipData({status: status, message: message})
    setIsInfoTooltipPopupOpened(true);
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUserData({email: ''});
    history.push('/login');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <div className="page">
          <Header logged={loggedIn} user={currentUserData} onSignOut={handleSignOut} />
          <Switch>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} onLoginError={handleLoginError} />
            </Route>
            {/* ниже разместим защищённые маршруты */}
            {/* и передадим несколько пропсов: loggedIn, path, component */}
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleOpenDeletePopup}
            />
            <Route>
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Redirect to="/sign-in" />
              )}
            </Route>
          </Switch>
          <Footer />
        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <ApproveDeletePopup selectedCard={selectedCard} isOpen={isApproveDeletePopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} buttonText="Да" />

        <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard} />

        <InfoTooltipPopup onClose={closeAllPopups} isOpen={isInfoTooltipPopupOpen} tooltipData={infoTooltipData} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
