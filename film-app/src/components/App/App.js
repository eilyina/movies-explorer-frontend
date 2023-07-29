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
// import { search } from '../SearchForm/SearchForm'

function App() {
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [onlyShortMovie, setOnlyShortMovie] = useState(JSON.parse(localStorage.getItem('onlyShortMovie')) || false);
  const navigate = useNavigate()
  // const location = useLocation()
  // const [userData, setUserData] = useState({ email: '', name: '' })
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('listSavedMovies')) || []);
  // const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovie, setFilteredMovie] = useState(JSON.parse(localStorage.getItem('list')) || []);
  const [savedMoviesNoFilter, setSavedMoviesNoFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState(JSON.parse(localStorage.getItem('search')) || '');

  // console.log(currentUser)

  const handleOnlyShortMovie = (e) => {
    // e.preventDefault();
    setOnlyShortMovie(!onlyShortMovie);
    console.log(onlyShortMovie)
  }



  const handleSearchQueryChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    // handleSearchQueryChange(e)

    if (searchQuery === '') {
      alert("Нужно ввести ключевое слово")
    } else {
      handleGetMovies()
    }
  }



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
        }, 1000)

        localStorage.setItem('list', JSON.stringify(filteredMovie));
        localStorage.setItem('search', JSON.stringify(searchQuery));
        localStorage.setItem('onlyShortMovie', JSON.stringify(onlyShortMovie));

      })
      .then(() => {
        console.log(movies)
        setFilteredMovie(movies.filter(function (movie) {
          return (onlyShortMovie ?
            (movie.duration < 40 &&
              (((movie.nameRU?.toLowerCase()).includes(searchQuery?.toLowerCase())) ||
                ((movie.nameEN?.toLowerCase()).includes(searchQuery?.toLowerCase())))
            )

            :
            (((movie.nameRU?.toLowerCase()).includes(searchQuery?.toLowerCase())) ||
              ((movie.nameEN?.toLowerCase()).includes(searchQuery?.toLowerCase())))
          )
        }))
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

  const handleDeleteMovie = (movie) => {
    const savedMovieId = savedMovies.find((savedMovie) => {
      return movie.movieId === savedMovie.movieId;
    });
    // console.log(savedMovieId)
    api.deleteMovie(savedMovieId._id)
      .then((delMovie) => {
        const updatedMovies = savedMovies.filter(savedMovie => {
          return savedMovie._id !== delMovie.movie._id && savedMovie.owner === currentUser._id
        });
        setSavedMovies(updatedMovies);

      }

      )
      .catch(() => console.log('Произошла ошибка'))
  }

  useEffect(() => {
    tokenCheck()

  }, []);

  useEffect(() => {
    if (loggedIn) {

      Promise.all([
        api.getUserInfo(),
        moviesApi.getMovies(),
        api.getSavedMovies()
      ])

        .then(([{ name, email, _id }, moviesData, savedMoviesData]) => {
          setCurrentUser({ name, email, _id });
          setMovies(moviesData)
          setSavedMoviesNoFilter(savedMoviesData)

        })
        .catch(() => {
          console.log('Произошла ошибка')
        })

    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      setSavedMovies(savedMoviesNoFilter.filter((item) => item.owner === currentUser._id));
    }
  }
    , [loggedIn, savedMoviesNoFilter, currentUser._id])


  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem('listSavedMovies', JSON.stringify(savedMovies));
      if (searchQuery !== '') {
        handleGetMovies()
      }
    }

  }
    , [loggedIn, savedMovies, onlyShortMovie])
  // , [filteredMovie, searchQuery, loggedIn, savedMovies, onlyShortMovie])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Routes>
          <Route path="/signup" element={<Register handleRegister={handleRegister} registrationStatus={registrationStatus} />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} registrationStatus={registrationStatus} />} />
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies}
            loggedIn={loggedIn}
            movies={savedMovies}
            handleDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
            isShort={handleOnlyShortMovie}
          />} />
          <Route path="/profile" element={<ProtectedRouteElement element={Profile} loggedIn={loggedIn} currentUser={currentUser} />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/*" element={<Main loggedIn={loggedIn} />} />
          <Route path="/movies" element={<ProtectedRouteElement
            element={Movies} loggedIn={loggedIn}
            // handleGetMovies={handleGetMovies}

            searchQuery={searchQuery}
            handleSearchQueryChange={handleSearchQueryChange}
            handleSubmitSearch={handleSubmitSearch}
            handleGetSavedMovies={handleGetSavedMovies}
            isLoading={isLoading}
            movies={filteredMovie}
            handleLikeClick={handleLikeClick}
            savedMovies={savedMovies}
            currentUser={currentUser}
            isShort={handleOnlyShortMovie}
          />} />

        </Routes>
      </>
    </CurrentUserContext.Provider>



  );
}
export default App;