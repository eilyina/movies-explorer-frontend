import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

function SearchForm() {

    return (
        <>
            <section className='search-form'>
                <form className='search-form__form'>
                    <div className='search-form__input-wide'>
                        <button type="submit" className="search-form__submit"></button>


                        <input className='search-form__input' placeholder='Фильм' required>
                        </input>

                        <button type="submit" className="search-form__submit-orange"></button>

                    </div>
                    <FilterCheckbox></FilterCheckbox>
                </form>
            </section>

        </>
    );
}

export default SearchForm;