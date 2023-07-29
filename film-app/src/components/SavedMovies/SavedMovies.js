
import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import { useEffect, useState } from "react";


function SavedMovies(props) {
    console.log(props)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSavedMovies, setFilteredSavedMovies] = useState(props.movies);
    const [isShort, setIsShort] = useState(false);
    // console.log(props.isShort)

    const handleOnlyShortMovieForSaved = (e) => {
        // e.preventDefault();
        setIsShort(!isShort);
        console.log(isShort)
    }

    const handleSearchQueryChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }
    // console.log(props)

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        // handleSearchQueryChange(e)

        if (searchQuery === '') {
            alert("Нужно ввести ключевое слово")
        } else {
            setFilteredSavedMovies(handleFilterSavedMovies(searchQuery, filteredSavedMovies, isShort))
            console.log(searchQuery)
            console.log(filteredSavedMovies)
            console.log(isShort)
        }
    }

    const handleFilterSavedMovies = (searchQuery, savedMovies, isShort) => {

        return savedMovies.filter(function (movie) {
            return (isShort ?
                (movie.duration < 40 &&
                    (((movie.nameRU?.toLowerCase()).includes(searchQuery?.toLowerCase())) ||
                        ((movie.nameEN?.toLowerCase()).includes(searchQuery?.toLowerCase())))
                )

                :
                (((movie.nameRU?.toLowerCase()).includes(searchQuery?.toLowerCase())) ||
                    ((movie.nameEN?.toLowerCase()).includes(searchQuery?.toLowerCase())))
            )
        })

    }
    console.log(filteredSavedMovies)
    // console.log(savedMovies)

    useEffect(() => {
        setFilteredSavedMovies(props.savedMovies)
        console.log('olol')

    }, [props.savedMovies]);

    useEffect(() => {
        if (searchQuery !== '') {
            setFilteredSavedMovies(handleFilterSavedMovies(searchQuery, filteredSavedMovies, isShort))
        }



    }, [isShort, searchQuery]);

    return (

        <>
            {/* { console.log(props.movies)} */}
            <Header isLogged={props.loggedIn}> </Header>
            <main className='movie-content'>
                <SearchForm
                    handleSearchQueryChange={handleSearchQueryChange}
                    handleSubmitSearch={handleSubmitSearch}
                    searchQuery={searchQuery}
                    isShort={handleOnlyShortMovieForSaved}
                ></SearchForm>
                {/* { 
                console.log(filteredSavedMovies)} */}
                <MoviesCardList


                    movies={filteredSavedMovies}
                    handleDeleteMovie={props.handleDeleteMovie}
                ></MoviesCardList>
            </main>
            <Footer></Footer>

        </>
    );
}

export default SavedMovies;
