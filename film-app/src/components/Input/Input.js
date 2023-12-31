import './Input.css'

function Input({ type, name, placeholder,
    input, value, disabled,
    minLength, maxLength }) {

    return (

        <>
            <div className={input}>
                <div className={`${input}__container`}>
                    <label className={`${input}__label`}> {name} </label>
                    <input type={type} className={`${input}__input`} name={name} placeholder={placeholder} value={value}
                     disabled={disabled} required minLength={minLength} maxLength={maxLength}/>
                </div>

                <span className={`${input}__error`}></span>
            </div>

        </>
    );
}

export default Input;
