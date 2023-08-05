import './MoviesCardList.css'
import '../MoviesCard/MoviesCard'
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from "react";
import {

    USER_WINDOW_WIDTH_480,
    START_NUMBERS_OF_MOVIES_MOBILE,
    START_NUMBERS_OF_MOVIES,
    MORE_BUTTON_NUMBERS_OF_MOVIES_MOBILE,
    MORE_BUTTON_NUMBERS_OF_MOVIES
} from '../../utils/constants'

function MoviesCardList(props) {
    const location = useLocation();
    const [showMore, setShowMore] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const [step, getStep] = useState(width < USER_WINDOW_WIDTH_480 ? MORE_BUTTON_NUMBERS_OF_MOVIES_MOBILE : MORE_BUTTON_NUMBERS_OF_MOVIES);
    const [numberOfMovies, setNumbersOfMovies] = useState(width < USER_WINDOW_WIDTH_480 ? START_NUMBERS_OF_MOVIES_MOBILE : START_NUMBERS_OF_MOVIES);
    const [movies, setMovies] = useState(props.movies ? props.movies : []);

// console.log(props)
    function handleShowMoreClick() {
        setNumbersOfMovies(numberOfMovies + step)
    }
    useEffect(() => {

        const handleWindowResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, [])

    useEffect(() => {
        setNumbersOfMovies(width < USER_WINDOW_WIDTH_480 ? START_NUMBERS_OF_MOVIES_MOBILE : START_NUMBERS_OF_MOVIES)
        getStep(width < USER_WINDOW_WIDTH_480 ? MORE_BUTTON_NUMBERS_OF_MOVIES_MOBILE : MORE_BUTTON_NUMBERS_OF_MOVIES)


    }, [width])


    useEffect(() => {
        if (movies.length > numberOfMovies) {

            setShowMore(false)

        } else {
            setShowMore(true)
        }

    }, [numberOfMovies, movies.length]);



    // console.log(props)
    return (
        <>
            <section className="card-list">
               { 
                    (location.pathname === '/movies') ?
                        <> {

                            movies.slice(0, numberOfMovies).map((movie) =>
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
                                        movieId={(location.pathname === '/movies') ? movie.id : movie.movieId}
                                        year={movie.year}

                                        handleLikeClick={props.handleLikeClick}
                                        handleDeleteMovie={props.handleDeleteMovie}
                                        savedMovies={props.savedMovies}

                                    ></MoviesCard>
                                </ul>
                            ))
                        }
                        </>
                        :
                        <>
                            {props.savedMovies.map((movie) =>


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
                                        movieId={(location.pathname === '/movies') ? movie.id : movie.movieId}
                                        year={movie.year}

                                        handleLikeClick={props.handleLikeClick}
                                        handleDeleteMovie={props.handleDeleteMovie}
                                        savedMovies={props.savedMovies}

                                    ></MoviesCard>
                                </ul>
                            ))
                            }
                        </>

                }
            

                {(location.pathname === '/movies') && !showMore ?
                    <button className={props.isSavedMovies ? "more-button more-button__type_saved-movies" : "more-button"} type='button' onClick={handleShowMoreClick}>Ещё</button>
                    : <div></div>
                }



            </section>

        </>
    );
}

export default MoviesCardList;
