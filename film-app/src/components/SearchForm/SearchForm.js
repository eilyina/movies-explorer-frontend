import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'
import React, { useState } from "react";
// export let search = ''
function SearchForm(props) {

    

    // function handleSearchQueryChange(e) {
    //     e.preventDefault();
    //     props.searchQuery(e.target.value);
    //     setSearchQuery(props.searchQuery)
    //     // search = searchQuery;

    // }


   
    return (
        <>
            <section className='search-form'>
                <form className='search-form__form' method="post" onSubmit={props.handleSubmitSearch} onChange={props.handleSearchQueryChange}>
                    <div className='search-form__input-wide'>
                        <button type="submit" className="search-form__submit" ></button>


                        <input className='search-form__input' placeholder='Фильм' onChange={props.handleSearchQueryChange} defaultValue={props.searchQuery || ''}>
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
