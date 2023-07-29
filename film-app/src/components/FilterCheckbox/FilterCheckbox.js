import './FilterCheckbox.css'
import React, { useState } from "react";

function FilterCheckbox(props) {

    return (
        <>

            <div className="toggle-button">
                <input type="checkbox" name="toggle" id="toggle-button" className="toggle-button__input" onChange={props.isShort}></input>
                <label htmlFor="toggle-button" className="toggle-button__text">Короткометражки</label>
            </div>
        </>
    );
}

export default FilterCheckbox;