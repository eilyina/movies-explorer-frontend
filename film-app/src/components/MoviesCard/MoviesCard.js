import './MoviesCard.css'
import link from '../../images/wordsaboutdesign.png'
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useState, useEffect } from "react";


function MoviesCard(movie) {

    const user = useContext(CurrentUserContext);
    const location = useLocation();
    let isLiked = false;

    if (location.pathname === '/movies') {
        isLiked = movie.savedMovies.some((savedMovie) => {
            return movie.movieId === savedMovie.movieId && savedMovie.owner === user._id;
        });
    }

    function handleLikeClick() {
        movie.handleLikeClick(movie, isLiked);
    }

    function handleDeleteMovie() {
        movie.handleDeleteMovie(movie);
    }

    const cardLikeButtonClassName =
        `card__like ${isLiked && 'card__like_active'}`;

    const cardDeleteButtonClassName = `card__like card__delete-icon`


    return (
        <>
            <li className="card">
                <div className="card__info">
                    <h2 className="card__title">{movie?.nameRU}</h2>
                    <p className="card__duration">{`${parseInt(movie.duration / 60)}ч ${parseInt(movie.duration % 60)}м`}</p>
                    {

                        location.pathname === '/saved-movies' ?
                            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteMovie}></button>
                            :
                            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} ></button>}
                </div>
                <a className="card__link" href={movie.trailerLink} rel="noreferrer" target="_blank">
                    <img className="card__image" src={movie.image}
                        alt={movie?.name}
                    ></img>
                </a>


            </li>

        </>
    );
}

export default MoviesCard