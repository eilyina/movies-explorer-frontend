
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import './Register.css'
import { Link } from 'react-router-dom'
import { useState } from "react";
import InfoTooltip from '../InfoToolTip/InfoTooltip';
import { useForm, useFormWithValidation } from '../Hooks/useForm'

function Register(props) {

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    console.log(isValid)
    // const { values, handleSubmit, setValues} = useForm();

 //const [formValue, setFormValue] = useState({ 'email': '', 'password': '', 'name': '' })


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormValue(
    //         {
    //             ...formValue,
    //             [name]: value
    //         }
    //     )
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        //  const { email, password, name } = ;
        // console.log(values)
        props.handleRegister(values) ;

    }

    return (

        <>
            <header className="header-register"></header>
            <main className="content">
                <section className="register">
                    <Link to="/" className="register__logo-link"><Logo ></Logo></Link>
                    <h1 className="register__title">Добро пожаловать!</h1>
                    <form className="register__form" method="post" onSubmit={handleSubmit}>
                        <Input
                            input={'input'}
                            type={"text"}
                            name={"name"}
                            title={"Имя"}
                            placeholder={"Ваше имя"}
                            minLength="2"
                            maxLength="40"
                            onChange={handleChange}
                            pattern='[a-zA-Zа-яА-Я \-\s]{1,}'
                            errors={errors.name}
                            value={values.name || ""}
                        >
                        </Input>
                        <Input
                            input={'input'}
                            type={"email"}
                            name={"email"}
                            title={"E-mail"}
                            placeholder={"Ваш email"}
                            minLength="2"
                            maxLength="64"
                            onChange={handleChange}
                            pattern='[a-zA-Z0-9]+@[a-z]+\.{1,1}[a-z]{2,}'
                           // [a-z0-9]+@[a-z]+\\.{1,1}[a-z]{2,}
                            errors={errors.email}
                            value={values.email || ""}
                        >

                        </Input>
                        <Input input={'input'}
                            type={"password"}
                            name={"password"}
                            title={"Пароль"}
                            placeholder={"Ваш пароль"}
                            minLength="2"
                            maxLength="64"
                            onChange={handleChange}
                            errors={errors.password}
                            value={values.password || ""}
                        ></Input>

                        <button type="submit" className="register__submit" disabled={!isValid}>Зарегистрироваться</button>
                     
                        <span className='register__error'>{props.registrationStatus}</span>

                        <p className="register__link-text">Уже зарегистрированы?
                            <Link to="/signin" className="register__link">Войти</Link>
                        </p>


                    </form>
                </section>
            </main>
            {/* <InfoTooltip isSuccess={props.registrationOk} text={props.registrationOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
                isOpen={props.isOpen} onClose={props.onClose}></InfoTooltip> */}

        </>
    );
}

export default Register;
