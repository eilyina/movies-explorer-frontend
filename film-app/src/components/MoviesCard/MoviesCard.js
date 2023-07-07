import './MoviesCard.css'
import link from '../../images/wordsaboutdesign.png'


function MoviesCard() {

    return (
        <>
            <li className="card">
                <div className="card__info">
                    <p className="card__title">33 слова о дизайне</p>
                    <p className="card__duration">1ч 42м</p>
                    <button className="card__like card__like_active" type="button"></button>
                </div>
                <img className="card__image" src={link} alt="wordsaboutdesign"></img>

            </li>

        </>
    );
}

export default MoviesCard;
