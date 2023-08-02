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

  const navigate = useNavigate()
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const localFilteredMovies = localStorage.getItem('list')
  const [filteredMovie, setFilteredMovie] = useState(localFilteredMovies ? JSON.parse(localFilteredMovies) : []);
  const [savedMoviesNoFilter, setSavedMoviesNoFilter] = useState([]);

  const localSearchQuery = localStorage.getItem('search')
  const [searchQuery, setSearchQuery] = useState(localSearchQuery ? JSON.parse(localSearchQuery) : '');
  const localOnlyShortMoviie = localStorage.getItem('onlyShortMovie')
  const [onlyShortMovie, setOnlyShortMovie] = useState(localOnlyShortMoviie ? JSON.parse(localOnlyShortMoviie) : false);



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

  const handleGetMovies = (onlyShortMovie, searchQuery) => {
    // console.log('handleGetMovies')
    // console.log(searchQuery)

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
          (movie.duration < 40 &&
            (((movie.nameRU?.toLowerCase()).includes(searchQuery?.toLowerCase())) ||
              ((movie.nameEN?.toLowerCase()).includes(searchQuery?.toLowerCase())))
          )

          :
          (((movie.nameRU?.toLowerCase()).includes(searchQuery?.toLowerCase())) ||
            ((movie.nameEN?.toLowerCase()).includes(searchQuery?.toLowerCase())))
        )
      })

      )
      // handleGetSavedMovies()
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

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('search');
    localStorage.removeItem('list');
    localStorage.removeItem('listSavedMovies');
    setFilteredMovie([])
    setSearchQuery('')
    setOnlyShortMovie(false)
    localStorage.clear()

    navigate('/signin');
  }

  useEffect(() => {
    tokenCheck()
    // console.log("useEffect1")

  }, []);

  useEffect(() => {
    if (loggedIn) {

      Promise.all([
        api.getUserInfo(),
        moviesApi.getMovies(),
        api.getSavedMovies()
      ])

        .then(([{ name, email, _id }, moviesData
        , savedMoviesData
        ]) => {
          setCurrentUser({ name, email, _id });
          setMovies(moviesData)
          setSavedMovies(savedMoviesData.filter((item) => item.owner === currentUser._id));
          // setSavedMoviesNoFilter(savedMoviesData)
          // setSavedMovies(savedMoviesData.filter((item) => item.owner === currentUser._id))
          // localStorage.setItem('listSavedMovies', JSON.stringify(savedMovies));
          // setSavedMovies(savedMoviesData.filter((item) => item.owner === currentUser._id));
          

        })
        .catch(() => {
          console.log('Произошла ошибка')
        })

        // handleGetSavedMovies()
      // console.log(filteredMovie)
    }
  }, [loggedIn])

  //если передаввать пропсами без этого эффекта нет фильмов 
  // useEffect(() => {
  //   if (loggedIn) {
  //     setSavedMovies(savedMoviesNoFilter.filter((item) => item.owner === currentUser._id));
  //     // console.log("useEffect3")
  //     // console.log(filteredMovie)
  //   }
  // }
  //   , [loggedIn, savedMoviesNoFilter])

  // useEffect(() => {
  //   if (loggedIn) {
  //     localStorage.setItem('listSavedMovies', JSON.stringify(savedMovies));

  //   }

  // }
  //   , [loggedIn, savedMovies])

  useEffect(() => {
    if (loggedIn) {
      // console.log("useEffect запись в хранилище")
      // console.log(searchQuery)
      localStorage.setItem('list', JSON.stringify(filteredMovie));
      localStorage.setItem('onlyShortMovie', JSON.stringify(onlyShortMovie));
      localStorage.setItem('search', JSON.stringify(searchQuery));
      // localStorage.setItem('listSavedMovies', JSON.stringify(savedMovies));

    }

  }
    , [loggedIn, filteredMovie, onlyShortMovie, searchQuery
      //  , savedMovies
    ])



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Routes>
          <Route path="/signup" element={<Register handleRegister={handleRegister} registrationStatus={registrationStatus} />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} registrationStatus={registrationStatus} />} />
          {console.log(savedMovies)}
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies}
            loggedIn={loggedIn}
            // movies={savedMovies}
            handleDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
            isShort={handleOnlyShortMovie}
          />} />
          <Route path="/profile" element={<ProtectedRouteElement element={Profile} signOut={signOut} setLoggedIn={setLoggedIn} loggedIn={loggedIn} currentUser={currentUser} />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/*" element={<Main loggedIn={loggedIn} />} />
          {/* {console.log(searchQuery)} */}
          <Route path="/movies" element={<ProtectedRouteElement
            element={Movies} loggedIn={loggedIn}
            searchQuery={searchQuery}
            handleSearchQueryChange={handleSearchQueryChange}
            handleSubmitSearch={handleSubmitSearch}
            handleGetSavedMovies={handleGetSavedMovies}
            isLoading={isLoading}
            movies={filteredMovie ? filteredMovie : []}
            handleLikeClick={handleLikeClick}
            savedMovies={savedMovies}
            currentUser={currentUser}
            isShort={handleOnlyShortMovie}
            isShortValue={onlyShortMovie}

          />} />

        </Routes>
      </>
    </CurrentUserContext.Provider>



  );
}
export default App;