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
import { useEffect, useState, useContext } from "react";
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import SearchForm from '../SearchForm/SearchForm';
import { search } from '../SearchForm/SearchForm'

function App() {
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [onlyShortMovie, setOnlyShortMovie] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const [userData, setUserData] = useState({ email: '', name: '' })
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovie, setFilteredMovie] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');

  // console.log(currentUser)

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
          // setUserData({ email, name })
          setCurrentUser({ email, name })
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
          // setUserData(res)
          setCurrentUser(res)
          navigate(lastPage)

        }
      })
      .catch(() => {
        console.log('Произошла ошибка')
      })
  }

  const handleGetMovies = () => {
    setIsLoading(true)

    moviesApi.getMovies()
      .then((data) => {
        setTimeout(() => {
          setIsLoading(false)
          setMovies(data)

          // console.log(data)

        }, 1000)

      })
      .then(() => {
        setFilteredMovie(movies.filter(function (movie) {
          // console.log(movie.nameRU)
          // console.log(search)
          return (movie.nameRU?.toLowerCase()).includes(search?.toLowerCase())
        }))

        localStorage.setItem('list', JSON.stringify(filteredMovie));
        localStorage.setItem('search', JSON.stringify(search));
        // localStorage.setItem('isShortMovie', JSON.stringify(onlyShortMovie));
      })
      .catch(() => {
        console.log('Произошла ошибка')
      })
  }

  const handleGetSavedMovies = () => {
    setIsLoading(true)

    api.getSavedMovies()
      .then((data) => {
        setTimeout(() => {
          setIsLoading(false)
          // setSavedMovies(data)
          setSavedMovies(data.filter(item => {
            // console.log(item.owner)
            // console.log(currentUser)
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

          // savedMovies.push(newMovie);
          setSavedMovies([...savedMovies, newMovie]);
          console.log(savedMovies)
        })

        .catch(() => console.log('Произошла ошибка'))
    }


  }

  const handleLikeClick = (movie, isLiked) => {
    handleAddMovie(movie, isLiked);
  }

  // console.log(savedMovies)

  // let filterMovieList = movies.filter(function (movie) {
  //   // return hasStr(movie.nameRU, search)
  //   // console.log(movie.nameRU)
  //   // console.log(search)
  //   return (movie.nameRU?.toLowerCase()).includes(search?.toLowerCase())
  // })



  // localStorage.setItem('list', JSON.stringify(filterMovieList));
  // localStorage.setItem('search', JSON.stringify(searchQuery));
  // localStorage.setItem('isShortMovie', JSON.stringify(onlyShortMovie));


  // useEffect(() => {
  //   if(onlyShortMovie){
  //     filterMovieList = movies.filter((movie) => movie.duration < 40);
  //   }

  // }, [onlyShortMovie,filterMovieList]);

  // const shortMovies = movies.filter((movie) => movie.duration < 40)
  // console.log(shortMovies)


  useEffect(() => {
    tokenCheck()
    handleGetSavedMovies()

  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then(({ name, email, _id }) => {
          setCurrentUser({ name, email, _id });
          // console.log(userData)
        })
        .catch((err) => console.log(`${err}`))
    }
  }, [loggedIn])



  // console.log(currentUser)
  //   getMovies();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Routes>
          <Route path="/signup" element={<Register handleRegister={handleRegister} registrationStatus={registrationStatus} />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} registrationStatus={registrationStatus} />} />
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} loggedIn={loggedIn} />} />
          <Route path="/profile" element={<ProtectedRouteElement element={Profile} loggedIn={loggedIn} currentUser={currentUser} />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/*" element={<Main loggedIn={loggedIn} />} />
          <Route path="/movies" element={<ProtectedRouteElement
            element={Movies} loggedIn={loggedIn}
            handleGetMovies={handleGetMovies}
            handleGetSavedMovies={handleGetSavedMovies}
            isLoading={isLoading}
            movies={filteredMovie}
            handleLikeClick={handleLikeClick}
            savedMovies={savedMovies}
            currentUser={currentUser}
          // searchQuery={searchQuery}

          />} />
          {/* {console.log(movies)} */}
        </Routes>
      </>
    </CurrentUserContext.Provider>



  );
}
export default App;
