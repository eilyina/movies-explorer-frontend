import './MoviesCard.css'
import link from '../../images/wordsaboutdesign.png'
import { useLocation } from 'react-router-dom';


function MoviesCard({ card }) {

    const location = useLocation();

    return (
        <>
            <li className="card">
                <div className="card__info">
                    <h2 className="card__title">33 слова о дизайне</h2>
                    <p className="card__duration">1ч 42м</p>
                    {

                        location.pathname === '/saved-movies' ?
                            <button className="card__like card__delete-icon" type="button"></button>
                            :
                            <button className="card__like card__like_active" type="button"></button>}
                </div>
                <a className="card__link" href="https://www.kinopoisk.ru/film/1302273/" rel="noreferrer" target="_blank">
                    <img className="card__image" src={link} alt={card?.name}></img>
                </a>


            </li>

        </>
    );
}

export default MoviesCard