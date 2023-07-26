import './MoviesCardList.css'
import '../MoviesCard/MoviesCard'
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';


function MoviesCardList(props) {
    console.log(props.movies)
    return (
        <>
            <section className="card-list">
                {props.movies.length === 0 ? <p>Ничего не найдено</p> :
                <>
                    {props.movies.map((movie) =>
                    (
                        <ul className="card-list__list" key={movie.id}>
                            <MoviesCard  savedMovies={props.savedMovies} 
                                // id={movie.id}
                                nameRU={movie.nameRU}
                                nameEN={movie.nameEN}
                                duration={movie.duration}
                                image={`https://api.nomoreparties.co${movie.image.url}`}
                                trailerLink={movie.trailerLink}
                                country={movie.country}
                                thumbnail={`https://api.nomoreparties.co${movie.image.url}`}
                                description={`olol`}
                                director={movie.director}
                                movieId={movie.id}
                                year={movie.year}

                                handleLikeClick={props.handleLikeClick}

                                // {"country":"country1",
                                // "director":"F Jonson1",
                                // "duration":"132",
                                // "year":"2023",
                                // "description":"description",
                                // "image":"https://www.kinopoisk.ru/series/708110/",
                                // "trailerLink":"https://www.kinopoisk.ru/series/708110/",
                                // "nameRU":"Код убийства",
                                // "nameEN":"The Bletchley Circle",
                                // "thumbnail":"https://www.kinopoisk.ru/series/708110/",
                                // "movieId":"8879997"}
                            


                                // {this.props.items.map((item, index) =>
                                //     <a href={item.link} key={index}>{item.label}</a>
                                //   )
                                // }
                            // owner={card.owner}
                            // link={card.link}
                            // likes={card.likes}
                            // onCardClick={props.onCardClick}
                            // onCardLike={props.onCardLike}
                            // onCardDelete={props.onCardDelete}
                            ></MoviesCard>
                        </ul>
                    ))
                    }
                </>}




                {/* <ul className="card-list__list">
                <MoviesCard card={{"name":"alt_1"}}></MoviesCard>
                <MoviesCard card={{"name":"alt_2"}}></MoviesCard>
                <MoviesCard card={{"name":"alt_3"}}></MoviesCard>
                <MoviesCard card={{"name":"alt_4"}}></MoviesCard>
                <MoviesCard card={{"name":"alt_5"}}></MoviesCard>
                {/* <Preloader></Preloader> 

            </ul> */}

                <button className={props.isSavedMovies ? "more-button more-button__type_saved-movies" : "more-button"} type='button'>Ещё</button>

            </section>

        </>
    );
}

export default MoviesCardList;
