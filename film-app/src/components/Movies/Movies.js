
import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import React, { useState, useEffect } from "react";


function Movies(props) {
    // console.log(`movies ${props.loggedIn}`)
    const search =  localStorage.getItem('search');
 console.log(search)
    return (
        <>
            <Header isLogged={props.loggedIn}> </Header>
            
            <main className='movie-content'>
                <SearchForm 
                // handleGetMovies={props.handleGetMovies}
                   handleSearchQueryChange={props.handleSearchQueryChange}
                   handleSubmitSearch={props.handleSubmitSearch}  
                 searchQuery={props.searchQuery}
                 ></SearchForm>
                {(search === null) ? 
                <p></p>  :
                <>{(props.isLoading) ? <Preloader></Preloader> : <MoviesCardList handleLikeClick={props.handleLikeClick} isSavedMovies={false} movies={props.movies}
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
