
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
            setFilteredSavedMovies(handleFilterSavedMovies(searchQuery, filteredSavedMovies))
        }
    }

    const handleFilterSavedMovies = (searchQuery, savedMovies) => {
        return savedMovies.filter(function (movie) {
            return (movie.nameRU?.toLowerCase()).includes(searchQuery?.toLowerCase())
        })
    }
    console.log(filteredSavedMovies
    )

    useEffect(() => {
        setFilteredSavedMovies(props.savedMovies)
        console.log('olol')

    }, [props.savedMovies]);

    return (

        <>
            {/* { console.log(props.movies)} */}
            <Header isLogged={props.loggedIn}> </Header>
            <main className='movie-content'>
                <SearchForm
                    handleSearchQueryChange={handleSearchQueryChange}
                    handleSubmitSearch={handleSubmitSearch}
                    searchQuery={searchQuery}
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
