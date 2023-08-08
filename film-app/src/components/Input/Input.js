import './Input.css'

function Input({ type, name, placeholder,
    input, value, disabled,
    minLength, maxLength, onChange, errors, pattern, title }) {

    return (

        <>
            <div className={input}>
                <div className={`${input}__container`}>
                    <label className={`${input}__label`}> {title} </label>
                    <input type={type} className={`${input}__input`} name={name} placeholder={placeholder} value={value}
                     disabled={disabled} required minLength={minLength} maxLength={maxLength} 
                      onChange={onChange} errors={errors} pattern={pattern}/>
                </div>

                <span className={`${input}__error`}>{errors}</span>
            </div>

        </>
    );
}

export default Input;
