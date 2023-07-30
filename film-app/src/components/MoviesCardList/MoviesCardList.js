import './MoviesCardList.css'
import '../MoviesCard/MoviesCard'
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from "react";

function MoviesCardList(props) {
    const location = useLocation();
    const [showMore, setShowMore] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const [step, getStep] = useState(width < 480 ? 2 : 1);
    const [numberOfMovies, setNumbersOfMovies] = useState(width < 480 ? 5 : 4);


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
        setNumbersOfMovies(width < 480 ? 5 : 4)
        getStep(width < 480 ? 2 : 1)


    }, [width])


    useEffect(() => {
        if (props.movies.length > numberOfMovies) {

            setShowMore(false)

        } else {
            setShowMore(true)
        }

    }, [numberOfMovies, props.movies.length]);




    return (
        <>
    
            <section className="card-list">
                {/* <h2>Width: {width}</h2> */}

                {props.movies.length === 0 ? <p>Ничего не найдено</p> :
                    (location.pathname === '/movies') ?
                        <>
                            {props.movies.slice(0, numberOfMovies).map((movie) =>


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
