import './Input.css'

function Input({type, name, placeholder}) {

    return (

        <>
        <div className="input">
        <label className="input__label"> {name} </label>
                <input type={type} className="input__input" name={name} placeholder={placeholder} required />
                <span className="input__error">wwww</span>
        </div>
         
           

        </>
    );
}

export default Input;
