import './MoviesCard.css'
import link from '../../images/wordsaboutdesign.png'
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useState, useEffect } from "react";


function MoviesCard(movie) {

    // console.log(movie.savedMovies)
    const user = useContext(CurrentUserContext);
    
    const isLiked = movie.savedMovies.some((savedMovie) => {
        return movie.movieId === savedMovie.movieId && savedMovie.owner === user._id;
    });
// console.log(movie.savedMovies)
 

    // const isLiked = false;



    // console.log(movie)
    // const isLiked = movie.owner === user._id;

    // const isLiked = card.likes.some((i) => {
    //   // console.log(i._id)
    //   // console.log(user._id)
    //   return i === user._id
    // });
    // const isLiked =true;

    function handleLikeClick() {
        movie.handleLikeClick(movie, isLiked);
    }

    const cardLikeButtonClassName =
        `card__like ${isLiked && 'card__like_active'}`;

    // function handleLikeClick() {
    //     card.onCardLike(card);
    //   }

    const location = useLocation();

    return (
        <>
            <li className="card">
                <div className="card__info">
                    <h2 className="card__title">{movie?.nameRU}</h2>
                    <p className="card__duration">{`${parseInt(movie.duration / 60)}ч ${parseInt(movie.duration % 60)}м`}</p>
                    {

                        location.pathname === '/saved-movies' ?
                            <button className="card__like card__delete-icon" type="button"></button>
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