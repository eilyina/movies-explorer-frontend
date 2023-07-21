
import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';


function Movies(props) {
    console.log(`movies ${props.loggedIn}`)

    return (
        <>
            <Header isLogged={props.loggedIn}> </Header>
            <main className='movie-content'>
                <SearchForm></SearchForm>
                <MoviesCardList isSavedMovies={false}></MoviesCardList>
            </main>
            <Footer></Footer>

        </>
    );
}

export default Movies;
