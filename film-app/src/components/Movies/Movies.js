
import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import React, { useState, useEffect } from "react";


function Movies(props) {

    // const searchQuery = JSON.parse(localStorage.getItem('search'));
    // console.log(props)
    console.log(props.isShortValue)

    return (
        <>
            <Header isLogged={props.loggedIn}> </Header>

            <main className='movie-content'>
                <SearchForm
                    // handleGetMovies={props.handleGetMovies}
                    handleSearchQueryChange={props.handleSearchQueryChange}
                    handleSubmitSearch={props.handleSubmitSearch}
                    searchQuery={props.searchQuery}
                    isShort={props.isShort}
                    isShortValue={props.isShortValue}
                //    {(localStorage.getItem('search')?.length > 0 && localStorage.getItem('list')?.length >0) ?
                //    searchQuery :
                //     props.searchQuery}

                ></SearchForm>
               
                {(props.movies.length === 0 && props.searchQuery === '') ?
                    <p></p> :
                    <>{(props.isLoading) ? <Preloader></Preloader> 
                    : 
                    <MoviesCardList 
                    handleLikeClick={props.handleLikeClick} 
                    // isSavedMovies={false} 
                    movies={props.movies}
                        savedMovies={props.savedMovies}
                    ></MoviesCardList>}
                    </>

                }

            </main>
            <Footer></Footer>

        </>
    );
}

export default Movies;
