import './MoviesCardList.css'
import '../MoviesCard/MoviesCard'
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';


function MoviesCardList(props) {
    return (
        <>
        <section className="card-list">
        <ul className="card-list__list">
                <MoviesCard card={{"name":"alt_1"}}></MoviesCard>
                <MoviesCard card={{"name":"alt_2"}}></MoviesCard>
                <MoviesCard card={{"name":"alt_3"}}></MoviesCard>
                <MoviesCard card={{"name":"alt_4"}}></MoviesCard>
                <MoviesCard card={{"name":"alt_5"}}></MoviesCard>
                {/* <Preloader></Preloader> */}

            </ul>
            <button className={props.isSavedMovies ? "more-button more-button__type_saved-movies" : "more-button"} type='button'>Ещё</button>

        </section>

        </>
    );
}

export default MoviesCardList;
