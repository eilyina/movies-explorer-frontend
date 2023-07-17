
import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';


function Movies() {

    return (
        <>
            <Header isLogged={true}> </Header>
            <main className='movie-content'>
                <SearchForm></SearchForm>
                <MoviesCardList isSavedMovies={false}></MoviesCardList>
            </main>
            <Footer></Footer>

        </>
    );
}

export default Movies;
