
import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MainApi';
import { DURATION_SHORT_MOVIES, NOTHING_WAS_FOUND_MESSAGE } from '../../utils/constants'
import Preloader from '../Preloader/Preloader';


function SavedMovies(props) {
    // const allSavedMovies = useContext(SavedMoviesContext);
    const currentUser = useContext(CurrentUserContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [allSavedMovies, setAllSavedMovies] = useState([]);
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
    const [isShort, setIsShort] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [resaltSearch, setResaltSearch] = useState('');


    useEffect(() => {
        if (filteredSavedMovies.length === 0) {
            setResaltSearch(NOTHING_WAS_FOUND_MESSAGE)
            if (searchQuery === '') {
                setResaltSearch('')
            }

        } else {
            setResaltSearch('')
        }
    }, [filteredSavedMovies, searchQuery])

    const handleOnlyShortMovieForSaved = (e) => {
        if (searchQuery === '') {
            alert("Нужно ввести ключевое слово")
        } else {
            console.log(isShort)
            setIsShort(!isShort);
            handleFilterSavedMovies(searchQuery, allSavedMovies, !isShort)
            console.log(isShort)
        }
    }

    const handleSearchQueryChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }
    // console.log(props)

    const handleSubmitSearch = (e) => {
        e.preventDefault();

        if (searchQuery === '') {
            alert("Нужно ввести ключевое слово")
        } else {
            handleFilterSavedMovies(searchQuery, allSavedMovies, isShort)
        }


    }
    const handleDeleteMovie = (movie) => {
        const savedMovieId = filteredSavedMovies.find((savedMovie) => {
            return movie.movieId === savedMovie.movieId;
        });
        // console.log(savedMovieId)
        api.deleteMovie(savedMovieId._id)
            .then((delMovie) => {
                const updatedMovies = filteredSavedMovies.filter(savedMovie => {
                    return savedMovie._id !== delMovie.movie._id && savedMovie.owner === currentUser._id
                });
                setFilteredSavedMovies(updatedMovies);

            }

            )
            .catch(() => console.log('Произошла ошибка'))
    }

    const handleFilterSavedMovies = (searchQuery, savedMovies, isShort) => {

        setFilteredSavedMovies(savedMovies.filter(function (item) {
            return (isShort ?
                (item.duration < DURATION_SHORT_MOVIES &&
                    (((item.nameRU?.toLowerCase()).includes(searchQuery?.toLowerCase())) ||
                        ((item.nameEN?.toLowerCase()).includes(searchQuery?.toLowerCase())))
                )

                :
                (((item.nameRU?.toLowerCase()).includes(searchQuery?.toLowerCase())) ||
                    ((item.nameEN?.toLowerCase()).includes(searchQuery?.toLowerCase())))
            )
        }))

    }


    useEffect(() => {
        setIsLoading(true)
        api.getSavedMovies()
            .then((data) => {
                setTimeout(() => {
                    setIsLoading(false)
                    setAllSavedMovies(data.filter(item => {
                        return item.owner === currentUser._id
                    }))
                    setFilteredSavedMovies(data.filter(item => {
                        return item.owner === currentUser._id
                    }))

                }, 1000)

            })
            .catch(() => {
                console.log('Произошла ошибка')
            })


    }, []);


    return (

        <>
            {/* {console.log(filteredSavedMovies)} */}
            <Header isLogged={props.loggedIn}> </Header>
            <main className='movie-content'>
                <SearchForm
                    handleSearchQueryChange={handleSearchQueryChange}
                    handleSubmitSearch={handleSubmitSearch}
                    searchQuery={searchQuery}
                    isShort={handleOnlyShortMovieForSaved}
                    isShortValue={isShort}
                ></SearchForm>

                {(isLoading) ? <Preloader></Preloader>
                    :
                    <>
                        <p>{resaltSearch}</p>
                        <MoviesCardList


                            savedMovies={filteredSavedMovies}
                            handleDeleteMovie={handleDeleteMovie}
                        ></MoviesCardList></>}

            </main>
            <Footer></Footer>

        </>
    );
}

export default SavedMovies;
