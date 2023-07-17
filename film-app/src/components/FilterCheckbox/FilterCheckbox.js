import './FilterCheckbox.css'

function FilterCheckbox(props) {

    return (
        <>

            <div className="toggle-button">
                <input type="checkbox" name="toggle" id="toggle-button" className="toggle-button__input"></input>
                <label htmlFor="toggle-button" className="toggle-button__text">Короткометражки</label>
            </div>
        </>
    );
}

export default FilterCheckbox;