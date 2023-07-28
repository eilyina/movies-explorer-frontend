import './MoviesCardList.css'
import '../MoviesCard/MoviesCard'
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';


function MoviesCardList(props) {
    const location = useLocation();



    console.log(props.movies)
    return (
        <>
         {console.log(props.movies)} 
            <section className="card-list">
                {props.movies.length === 0 ? <p>Ничего не найдено</p> :
                
                    <>
                        {props.movies.map((movie) =>
                       

                        (
                            

                            <ul className="card-list__list" key={(location.pathname === '/movies') ? movie.id : movie.movieId}>

                                <MoviesCard 
                                //  key={movie.id}
                                    // id={movie.id}
                                 
                                    nameRU={movie.nameRU}
                                    nameEN={movie.nameEN}
                                    duration={movie.duration}
                                    image={(location.pathname === '/movies') ? `https://api.nomoreparties.co${movie.image.url}` : `${movie.image}`}
                                    trailerLink={movie.trailerLink}
                                    country={movie.country}
                                    thumbnail={(location.pathname === '/movies') ? `https://api.nomoreparties.co${movie.image.url}` : `${movie.image}`}
                                    description={`olol`}
                                    director={movie.director}
                                    // movieId={movie.id}
                                    movieId= {(location.pathname === '/movies') ? movie.id : movie.movieId }
                                    year={movie.year}

                                    handleLikeClick={props.handleLikeClick}
                                    handleDeleteMovie={props.handleDeleteMovie}
                                    savedMovies={props.savedMovies}

                                ></MoviesCard>
                            </ul>
                        ))
                        }
                    </>}

                { (location.pathname === '/movies' ) ?
                    <button className={props.isSavedMovies ? "more-button more-button__type_saved-movies" : "more-button"} type='button'>Ещё</button>
                    : <div></div>
                }



            </section>

        </>
    );
}

export default MoviesCardList;
