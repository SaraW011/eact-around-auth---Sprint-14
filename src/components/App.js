import React from "react";
import { Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
//Use Routes instead of Switch in react-router v6
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function App() {
  // state variables responsible for the visibility of popups:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isPreviewImageOpen, setIsPreviewImageOpen] = React.useState(false);
  const [isDeleteImagePopupOpen, setIsDeleteImagePopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [loggdIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const navigate = useNavigate();

  //**----------->> AUTH <<--------*/

  // register
  function handleRegistration(evt) {
    evt.preventDefault();
    try {
      auth
        .signup(email, password)
        .then(() => {
          navigate.push("/");
          setIsRegistered(true);
        })
        .catch((err) => {
          console.log(err.status, err.statusText);
          setIsRegistered(false);
        });
    } finally {
      setIsInfoTooltipOpen(true);
    }
  }

  // check if user token valid
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .tokenCheck(jwt)
        .getContent(jwt)
        .then((res) => {
          if (res) {
            const userData = {
              email: res.userData.email,
              id: res.userData._id,
            };
            setLoggedIn(true);
            navigate.push("/");
          }
        })
        .catch((err) => console.error(err.status, err.statusText));
    }
  }, []);

  // login ??????????????????????????????????????????????????????
  function handleLogin(evt) {
        evt.preventDefault();
    auth
      .signin(email, password)
      .getContent()
      .then(() => {
        setLoggedIn(true);
        navigate.push("/");
      })
      .catch((err) => {
        console.log(err.status, err.statusText);
      });
  }

  // logout
  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    navigate.push("/.signin"); //???????????????????
  }

  function handleMobileMenu() {
    if (!mobileMenu) {
      setMobileMenu(true);
    } else {
      setMobileMenu(false);
    }
  }

  //put where???????????????????
  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  //put where???????????????????
  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  //put where???????????????????
  function handleInfoTooltipClose() {
    setIsInfoTooltipOpen(true);
    setIsRegistered(false);
  }

  //**----------->> API <<-------------------*/
  //??????????????????????????????????????????????????
  React.useEffect(() => {
    api
      .getData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err.status, err.statusText);
      });
  }, []);

  React.useEffect(() => {
    (async function () {
      try {
        const cardsData = await api.getInitialCards();
        if (cardsData) {
          setCards(cardsData);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function handleUpdateUser(input) {
    api
      .editUserInfo(input.name, input.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status, err.statusText);
      });
  }

  function handleUpdateAvatar(input) {
    api
      .editAvatar(input.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status, err.statusText);
      });
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Send a request to the API and get updated card data
    if (!isLiked) {
      api.likeCard(card._id, !isLiked).then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      });
    } else {
      api.dislikeCard(card._id).then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err.status, err.statusText);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addPlaceCard(cardData.name, cardData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.status, err.statusText);
      });
  }

  // **----------->> HANDLE POPUPS <<-------------------*/

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsPreviewImageOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeletePlaceClick() {
    setIsDeleteImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPreviewImageOpen(false);
    setIsDeleteImagePopupOpen(false);

    setSelectedCard({});

    setIsInfoTooltipOpen(false);

    setMobileMenu(false);
  }

  React.useEffect(() => {
    // code on mount
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    // code on unmount
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []); // dependencies array

  //**----------->> RENDER <<-------------------*/
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          handleLogout={handleLogout}
          loggdIn={loggdIn}
          isOpen={setMobileMenu}
          // handleMobileMenu={handleMobileMenu}
        />

        <div className="main">
          <Routes>
            <Route
              path="/signin"
              element={
                <Login
                  email={email}
                  password={password}
                  setEmail={setEmail}
                  setLoggedIn={setLoggedIn}
                  handleLogin={handleLogin}
                  handleEmail={handleEmail}
                  handlePassword={handlePassword}
                />
              }
            ></Route>

            <Route
              path="/signup"
              element={<Register handleRegistration={handleRegistration} />}
            ></Route>

            <Route
              path="/"
              element={<ProtectedRoute exact path="/"></ProtectedRoute>}
            >
              <Route
                path="*"
                element={<p>There's nothing here: 404!</p>}
              ></Route>
            </Route>
          </Routes>
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />

          <ConfirmDeletePopup
            isOpen={isDeleteImagePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeletePlaceClick}
          />

          <ImagePopup
            name="preview-image"
            onClose={closeAllPopups}
            isOpen={isPreviewImageOpen}
            imageLink={selectedCard.link}
            imageText={selectedCard.name}
          />

          <InfoTooltip
            name="tooltip"
            isOpen={isInfoTooltipOpen}
            onClose={handleInfoTooltipClose}
            isRegistered={isRegistered}
          />

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
