
import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import React, { useState, useEffect } from "react";
import { NOTHING_WAS_FOUND_MESSAGE } from '../../utils/constants';


function Movies(props) {

    const [resaltSearch, setResaltSearch] = useState('');

    useEffect(() => {
        if (props.movies.length === 0) {
            setResaltSearch(NOTHING_WAS_FOUND_MESSAGE)
            if (props.searchQuery === '') {
                setResaltSearch('')
            }

        } else {
            setResaltSearch('')
        }
    }, [props.movies])


    return (

        <> <Header isLogged={props.loggedIn}> </Header>
            <main className='movie-content'>
                <SearchForm
                    handleSearchQueryChange={props.handleSearchQueryChange}
                    handleSubmitSearch={props.handleSubmitSearch}
                    searchQuery={props.searchQuery}
                    isShort={props.isShort}
                    isShortValue={props.isShortValue}
                ></SearchForm>



                {(props.isLoading) ? <Preloader></Preloader>
                    :
                    <>
                        <p>{resaltSearch}</p>

                        <MoviesCardList
                            handleLikeClick={props.handleLikeClick}
                            // isSavedMovies={false} 
                            movies={props.movies}
                            savedMovies={props.savedMovies}
                        ></MoviesCardList>
                    </>
                    }

                

            </main>
            <Footer></Footer>

        </>
    );
}

export default Movies;
