import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

function SearchForm(props) {

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
            {/* <div className="toggle-button">
                <input type="checkbox" name="toggle" id="toggle-button" className="toggle-button__input"></input>
                <label for="toggle-button" className="toggle-button__text">Короткометражки</label>
            </div> */}
            <FilterCheckbox></FilterCheckbox>
        </>
    );
}

export default SearchForm;