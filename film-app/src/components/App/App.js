import './App.css';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile';
import { moviesApi } from '../../utils/MoviesApi';
import { api } from '../../utils/MainApi';
import { useEffect, useState } from "react";
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const [userData, setUserData] = useState({ email: '', name: '' })
  // const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const handleRegister = ({ email, password, name }) => {
    api.register(email, password, name)
      .then(() => {
        handleLogin({ email, password })
      })
      .catch(() => {
        setRegistrationStatus('"Что-то пошло не так! Попробуйте ещё раз."')
        console.log('Произошла ошибка')
      })
  }

  const handleLogin = ({ email, name, password }) => {

    api.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token)
          setLoggedIn(true)
          setUserData({ email, name })
          navigate('/movies')
        }
      })
      .catch(() => {
        setRegistrationStatus('"Что-то пошло не так! Попробуйте ещё раз."')
        console.log('Произошла ошибка')
      })
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt')
    const lastPage = localStorage.getItem('lastPage')
    if (!jwt) {
      return
    }
    api.checkToken()
      .then(res => {
        if (res) {
          setLoggedIn(true)
          setUserData(res)
          navigate(lastPage)

        }
      })
      .catch(() => {
        console.log('Произошла ошибка')
      })
  }
  useEffect(() => {
    tokenCheck()
  }, []);

  useEffect(() => {
    if (loggedIn) {
     api.getUserInfo()
        .then(({name, email}) => {
          setCurrentUser({name, email});
          console.log(userData)
        })
        .catch((err) => console.log(`${err}`))
    }
    // if (loggedIn) {
    //   Promise.all([api.getUserInfo()
    //     , api.getInitialCards()
    //   ])
    //     .then(([userData, cardData]) => {
    //       setCurrentUser(userData);
    //       setCards(cardData.reverse());
    //     })
    //     .catch((err) => console.log(`${err}`))

  }, [loggedIn])

  // console.log(currentUser)
  const getMovies = () => {
    moviesApi.getMovies()
      .then((data) => {
        console.log(data)

      })
      .catch(() => {
        console.log('Произошла ошибка')
      })
  }

  //   getMovies();

  return (
    <CurrentUserContext.Provider value={currentUser}>
 <>
      <Routes>
        <Route path="/signup" element={<Register handleRegister={handleRegister} registrationStatus={registrationStatus} />} />
        <Route path="/signin" element={<Login handleLogin={handleLogin} registrationStatus={registrationStatus} />} />
        <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} loggedIn={loggedIn}/>}/>
        <Route path="/profile" element={<ProtectedRouteElement element={Profile} loggedIn={loggedIn} currentUser={currentUser}/>}/>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/*" element={<Main loggedIn={loggedIn}/>} />
        {console.log(loggedIn)}
        <Route path="/movies" element={<ProtectedRouteElement 
        element={Movies} loggedIn={loggedIn}
         />} />


      </Routes>
      {/* <Route path="/" element={<ProtectedRouteElement element={Main}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete}
      cards={cards}
      card={selectedCard}
      loggedIn={loggedIn}

    />} /> */}

    </>
    </CurrentUserContext.Provider>
   


  );
}

export default App;