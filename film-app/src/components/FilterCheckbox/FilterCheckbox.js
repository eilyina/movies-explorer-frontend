import './FilterCheckbox.css'
import React, { useState } from "react";

function FilterCheckbox(props) {

    const [checked, setIsChecked] = useState(false);

    function handleChange(e) {
        // e.preventDefault();
        // console.log('нажатие')
        // setIsChecked(e.target.checked);
        setIsChecked(!checked)

    }
    // console.log(checked)

    return (
        <>

            <div className="toggle-button">
                <input type="checkbox" name="toggle" id="toggle-button" className="toggle-button__input" checked={checked} onChange={handleChange}></input>
                <label htmlFor="toggle-button" className="toggle-button__text">Короткометражки</label>
            </div>
        </>
    );
}

export default FilterCheckbox;