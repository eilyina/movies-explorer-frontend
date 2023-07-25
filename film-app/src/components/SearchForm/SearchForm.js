import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'
import React, { useState } from "react";
export let search = ''
function SearchForm(props) {

    const [searchQuery, setSearchQuery] = useState('');

    // function handleSearchQueryChange(e) {
    //     e.preventDefault();
    //     props.searchQuery(e.target.value);
    //     setSearchQuery(props.searchQuery)
    //     // search = searchQuery;

    // }

    const handleSearchQueryChange= (e) => {
           e.preventDefault();
           setSearchQuery(e.target.value);

    // setSearchQuery(props.searchQuery)
    search = searchQuery;
    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearchQueryChange(e)
       
        if (searchQuery === '') {
            console.log("Нужно ввести ключевое слово")
        } else {
            props.handleGetMovies()
        }
        localStorage.setItem('search', JSON.stringify(searchQuery));
    }
   
    return (
        <>
            <section className='search-form'>
                <form className='search-form__form' method="post" onSubmit={handleSubmit} onChange={handleSearchQueryChange}>
                    <div className='search-form__input-wide'>
                        <button type="submit" className="search-form__submit" ></button>


                        <input className='search-form__input' placeholder='Фильм' onChange={handleSearchQueryChange}>
                        </input>

                        <button type="submit" className="search-form__submit-orange"></button>

                    </div>
                   
                </form>
                <FilterCheckbox></FilterCheckbox>
            </section>

        </>
    );
}

export default SearchForm;
