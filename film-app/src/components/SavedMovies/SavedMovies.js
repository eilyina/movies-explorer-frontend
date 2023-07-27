
import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';


function SavedMovies(props) {

    return (
        
        <>
        {/* { console.log(props.movies)} */}
            <Header isLogged={props.loggedIn}> </Header>
            <main className='movie-content'>
                <SearchForm></SearchForm>
                <MoviesCardList isSavedMovies={true}
                movies={props.movies}
                handleDeleteMovie={props.handleDeleteMovie}
                // savedMovies={props.savedMovies}
                ></MoviesCardList>
            </main>
            <Footer></Footer>

        </>
    );
}

export default SavedMovies;
