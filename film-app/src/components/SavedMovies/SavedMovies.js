
import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';


function SavedMovies() {

    return (
        <>
            <Header isLogged={true}> </Header>
            <main className='movie-content'>
                <SearchForm></SearchForm>
                <MoviesCardList isSavedMovies={true}></MoviesCardList>
            </main>
            <Footer></Footer>

        </>
    );
}

export default SavedMovies;
