import './App.css';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile';
import { moviesApi } from '../../utils/MoviesApi';
import { api } from '../../utils/MainApi';
import { useEffect, useState } from "react";
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import {
  CONFLICT_ERROR_CODE,
  CONFLICT_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_CODE,
  UNAUTHORIZED_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  DURATION_SHORT_MOVIES,
  SUCCESS_REGISTRATION_MESSAGE
} from '../../utils/constants'

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  // const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const localFilteredMovies = localStorage.getItem('list')
  const [filteredMovie, setFilteredMovie] = useState(localFilteredMovies ? JSON.parse(localFilteredMovies) : []);
  const localSearchQuery = localStorage.getItem('search')
  const [searchQuery, setSearchQuery] = useState(localSearchQuery ? JSON.parse(localSearchQuery) : '');
  const localOnlyShortMoviie = localStorage.getItem('onlyShortMovie')
  const [onlyShortMovie, setOnlyShortMovie] = useState(localOnlyShortMoviie ? JSON.parse(localOnlyShortMoviie) : false);
  const [token, setTokenResult] = useState(false);
  

  const handleOnlyShortMovie = (e) => {
    if (searchQuery === '' || searchQuery == null) {
      alert("Нужно ввести ключевое слово")
    } else {
      setOnlyShortMovie(!onlyShortMovie);
      handleGetMovies(!onlyShortMovie, searchQuery)
    }
  }

  const handleSearchQueryChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    handleGetMovies(onlyShortMovie, searchQuery)
  }

  const handleRegister = ({ email, password, name }) => {
    api.register(email, password, name)
      .then(() => {
        setRegistrationStatus(SUCCESS_REGISTRATION_MESSAGE)
        handleLogin({ email, password })
      })
      .catch((err) => {
        if (err === CONFLICT_ERROR_CODE) {
          setRegistrationStatus(CONFLICT_ERROR_MESSAGE)
        }
        else {
          setRegistrationStatus(SERVER_ERROR_MESSAGE)
        }
      })
  }

  const handleLogin = ({ email, name, password }) => {

    api.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token)
          setLoggedIn(true)
          setCurrentUser({ email, name })
          navigate('/movies')
        }
      })
      .catch((err) => {
        if (err === UNAUTHORIZED_ERROR_CODE) {
          setRegistrationStatus(UNAUTHORIZED_ERROR_MESSAGE)
        }
        else {
          setRegistrationStatus(SERVER_ERROR_MESSAGE)
        }
        console.log('Произошла ошибка')
      })
  }

  const tokenCheck = () => {
    // setTokenResult(false)
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      setTokenResult(true)
      return
    }
   
    api.checkToken()
      .then(res => {
        if (res) {
          setIsLoading(false)
          setLoggedIn(true)
          setCurrentUser(res)
          setTokenResult(true)
        }
        else {
          setTokenResult(true)
        }
      })

      .catch(() => {
        console.log('Произошла ошибка')
        setTokenResult(true)
      })

  }

  const handleGetMovies = (onlyShortMovie, searchQuery) => {
    if (searchQuery === '' || searchQuery == null) {
      alert("Нужно ввести ключевое слово")
    } else {

      setIsLoading(true)
      moviesApi.getMovies()
        .then((data) => {
          setTimeout(() => {
            setIsLoading(false)
            setMovies(data)
          }, 1000)

        })
        .catch(() => {
          console.log('Произошла ошибка')
        })
      setFilteredMovie(movies.filter(function (movie) {
        return (onlyShortMovie ?
          (movie.duration < DURATION_SHORT_MOVIES &&
            (((movie.nameRU?.toLowerCase()).includes(searchQuery?.toLowerCase())) ||
              ((movie.nameEN?.toLowerCase()).includes(searchQuery?.toLowerCase())))
          )

          :
          (((movie.nameRU?.toLowerCase()).includes(searchQuery?.toLowerCase())) ||
            ((movie.nameEN?.toLowerCase()).includes(searchQuery?.toLowerCase())))
        )
      })

      )
      localStorage.setItem('search', JSON.stringify(searchQuery));
      localStorage.setItem('onlyShortMovie', JSON.stringify(onlyShortMovie));
      localStorage.setItem('list', JSON.stringify(filteredMovie));

     
    }
  }

  const handleGetSavedMovies = () => {
    setIsLoading(true)
    api.getSavedMovies()
      .then((data) => {
        setTimeout(() => {
          setIsLoading(false)
          // console.log(user)
          setSavedMovies(data.filter(item => {
            return item.owner === currentUser._id
          }))

        }, 1000)

      })
      .catch(() => {
        console.log('Произошла ошибка')
      })
  }

  const handleAddMovie = (movie, isLiked) => {
    if (isLiked) {
      const savedMovieId = savedMovies.find((savedMovie) => {
        return movie.movieId === savedMovie.movieId
          && savedMovie.owner === currentUser._id;
      });
      console.log(savedMovieId)
      api.deleteMovie(savedMovieId._id)
        .then((delMovie) => {
          const updatedMovies = savedMovies.filter(savedMovie => {

            return savedMovie._id !== delMovie.movie._id && savedMovie.owner === currentUser._id
          });
          setSavedMovies(updatedMovies);

        }

        )
    } else {
      api.createMovie(movie)
        .then((newMovie) => {
          setSavedMovies([...savedMovies, newMovie]);
        })

        .catch(() => console.log('Произошла ошибка'))
    }
  }

  const handleLikeClick = (movie, isLiked) => {
    handleAddMovie(movie, isLiked);
  }

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('search');
    localStorage.removeItem('list');
    localStorage.removeItem('listSavedMovies');
    setFilteredMovie([])
    setSavedMovies([])
    setSearchQuery('')
    setOnlyShortMovie(false)
    localStorage.clear()

    navigate('/signin');
  }

  useEffect(() => {
    tokenCheck()
  }, []);




  useEffect(() => {
    if (loggedIn) {

      Promise.all([
        api.getUserInfo(),
        moviesApi.getMovies()
        // api.getSavedMovies()
      ])

        .then(([userData, moviesData
          // , savedMoviesData
        ]) => {
          setCurrentUser(userData);
          setMovies(moviesData)
          // setSavedMovies(savedMoviesData.filter((item) => item.owner === userData._id));
          // setUser(userData)
        })
        .catch(() => {
          console.log('Произошла ошибка')
        })
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem('list', JSON.stringify(filteredMovie));
      localStorage.setItem('onlyShortMovie', JSON.stringify(onlyShortMovie));
      localStorage.setItem('search', JSON.stringify(searchQuery));
    }
  }
    , [loggedIn, filteredMovie, onlyShortMovie, searchQuery])

    useEffect(() => {
      setRegistrationStatus('')
      if (location.pathname === '/movies') {
        handleGetSavedMovies()
      }
     
    }, [location, currentUser]);

  return (
    token ?
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/signup" element={loggedIn ?
          <Navigate to='/' /> :
          <Register handleRegister={handleRegister} registrationStatus={registrationStatus} />} />
        <Route path="/signin" element={loggedIn ?
          <Navigate to='/' /> :
          <Login handleLogin={handleLogin} registrationStatus={registrationStatus} />} />
        {/* {console.log(savedMovies)} */}
        <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies}
          loggedIn={loggedIn}
        />} />
        <Route path="/profile" element={<ProtectedRouteElement element={Profile}
          signOut={signOut}
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
          currentUser={currentUser} />} />
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        {/* {console.log(searchQuery)} */}
        <Route path="/movies" element={<ProtectedRouteElement
          element={Movies} loggedIn={loggedIn}
          searchQuery={searchQuery}
          handleSearchQueryChange={handleSearchQueryChange}
          handleSubmitSearch={handleSubmitSearch}
          // handleGetSavedMovies={handleGetSavedMovies}
          isLoading={isLoading}
          movies={filteredMovie ? filteredMovie : []}
          handleLikeClick={handleLikeClick}
          savedMovies={savedMovies}
          currentUser={currentUser}
          isShort={handleOnlyShortMovie}
          isShortValue={onlyShortMovie}
        />} />
        <Route path="*" element={<ErrorPage loggedIn={loggedIn} />}></Route>

      </Routes>
    </CurrentUserContext.Provider>
    : "Загрузка ..."


  );
}
export default App;