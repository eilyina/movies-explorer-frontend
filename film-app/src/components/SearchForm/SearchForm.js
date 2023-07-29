import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'
import React, { useState } from "react";

function SearchForm(props) {

    return (
        <>
            <section className='search-form'>
                <form className='search-form__form' method="post" onSubmit={props.handleSubmitSearch} 
                // onChange={props.handleSearchQueryChange}
                >
                    <div className='search-form__input-wide'>
                        <button type="submit" className="search-form__submit" ></button>


                        <input className='search-form__input' placeholder='Фильм' onChange={props.handleSearchQueryChange} defaultValue={props.searchQuery || ''}>
                        </input>

                        <button type="submit" className="search-form__submit-orange"></button>

                    </div>
                    <FilterCheckbox isShort={props.isShort}></FilterCheckbox>
                </form>
                {/* <FilterCheckbox></FilterCheckbox> */}
            </section>

        </>
    );
}

export default SearchForm;
