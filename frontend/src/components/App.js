import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip.js';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { auth } from '../utils/Auth';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' }); // Стейт текущего пользователя
  const [cards, setCards] = React.useState([]); // Стейт массива карточекн
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false); // Стейт  открытого попапа редактирования профиля
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false); // Стейт открытого попапа добавления места
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false); // Стейт открытого попапа редактирования аватара
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false); // Стейт открытого попапа успешности регистрации
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false); // Стейт открытого попапа изображения
  const [selectedCard, setSelectedCard] = React.useState({}); // Стейт выбранной карточки для попапа изображения
  const [isSuccessful, setIsSuccessful] = React.useState(false); // Стейт успешности регистрации
  const [headerEmail, setHeaderEmail] = React.useState('');

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Стейт статуса входа

  const isAnyPopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isImagePopupOpen ||
    isInfoTooltipOpen;

  const jwt = localStorage.getItem('jwt');

  React.useEffect(() => {
    // Получение данных карточек и профиля

    if (isLoggedIn) {
      Promise.all([api.getUserInfoApi(jwt), api.getInitialCardsApi(jwt)])
        .then(([profile, cards]) => {
          setCards(cards);
          setCurrentUser(profile);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {

    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setHeaderEmail(res.email);
            navigate('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  // Клик по аватарке
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  // Клик по кнопке редактирования профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  // Клик по кнопке добавления места
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  // Закрытие попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  // Клик по изображению карточки
  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  React.useEffect(() => {
    // Закрытие попапов по оверлею или Esc
    if (isAnyPopupOpen) {
      function handleCloseByEscOrOverlay(evt) {
        if (evt.key === 'Escape' || evt.target.classList.contains('popup_opened')) {
          closeAllPopups();
        }
      }
      document.addEventListener('keydown', handleCloseByEscOrOverlay);
      document.addEventListener('click', handleCloseByEscOrOverlay);

      return () => {
        document.removeEventListener('keydown', handleCloseByEscOrOverlay);
        document.removeEventListener('click', handleCloseByEscOrOverlay);
      };
    }
  }, [isAnyPopupOpen]);

  // Лайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (profile) => profile === currentUser._id
    );

    if (!isLiked) {
      api
        .putLikeApi(card._id, jwt)
        .then((newCard) => {
          setCards((state) => {
            return state.map((c) => (c._id === card._id ? newCard : c));
          });
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLikeApi(card._id, jwt)
        .then((newCard) => {
          setCards((state) => {
            return state.map((c) => (c._id === card._id ? newCard : c));
          });
        })
        .catch((err) => console.log(err));
    }
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCardApi(card._id, jwt)
      .then(() => {
        setCards((state) => {
          return state.filter((c) => c._id !== card._id);
        });
      })
      .catch((err) => console.log(err));
  }

  // Редактирование профиля
  function handleUpdateUser(data) {
    api
      .setUserInfoApi(data.name, data.about, jwt)
      .then((profile) => {
        setCurrentUser({...currentUser, name: profile.name, about: profile.about});
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Редактирование аватарки
  function handleUpdateAvatar(avatarLink) {
    api
      .changeAvatar(avatarLink.avatar, jwt)
      .then((profile) => {
        setCurrentUser({
          ...currentUser, 
          avatar: profile.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Добавление карточки
  function handleAddPlaceSubmit(data) {
    api
      .postCardApi(data.name, data.link, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Регистрация
  function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then((res) => {
        setIsSuccessful(true);
        setInfoTooltipOpen(true);
        navigate('/signin');
      })
      .catch((res) => {
        setIsSuccessful(false);
        setInfoTooltipOpen(true);
      });
  }

  // Вход
  function handleLogin(email, password) {
    return auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setHeaderEmail(email);
          setIsLoggedIn(true);
          navigate('/');
        }
      })
      .catch((res) => {
        setIsSuccessful(false);
        setInfoTooltipOpen(true);
      });
  }

  // Выход
  function handleLogOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogOut}
          headerEmail={headerEmail}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} />}
          ></Route>
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          ></Route>
          <Route
            path="*"
            element={
              !isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
          />
        </Routes>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccessful={isSuccessful}
          onClose={closeAllPopups}
        />
        <Footer isLoggedIn={isLoggedIn} />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          class="confirm-deletion"
          id="confirm-deletion"
          name="confirm-deletion"
          title="Вы уверены?"
        >
          <button className="popup__save-button" type="submit">
            Да
          </button>
        </PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
