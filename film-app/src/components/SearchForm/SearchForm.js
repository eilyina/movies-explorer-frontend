import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

function SearchForm() {

    return (
        <>
            <form className='search-form'>
                <button type="submit" className="search-form__submit"></button>
                <button type="submit" className="search-form__submit-orange"></button>
                <div className='search-form__input-wide'>
                    <input className='search-form__input' placeholder='Фильм'>
                    </input>
                </div>

            </form>

            <FilterCheckbox></FilterCheckbox>
        </>
    );
}

export default SearchForm;