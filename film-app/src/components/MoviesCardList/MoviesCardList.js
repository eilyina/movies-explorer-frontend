import './MoviesCardList.css'
import '../MoviesCard/MoviesCard'
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';



function MoviesCardList() {

    return (
        <>
            <ul className="card-list">
     <MoviesCard></MoviesCard>
     <MoviesCard></MoviesCard>
     <MoviesCard></MoviesCard>
     <MoviesCard></MoviesCard>
     <MoviesCard></MoviesCard>
     {/* <Preloader></Preloader> */}
  
            </ul>
            <button className='more-button' type='submit'>Ещё</button>

        </>
    );
}

export default MoviesCardList;
