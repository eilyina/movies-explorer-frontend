
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import './Register.css'
import { Link } from 'react-router-dom'



function Register() {

    return (

        <>
            <header className="header-register"></header>
            <main className="content">
                <section className="register">
                    <Link to="/" className="register__logo-link"><Logo ></Logo></Link>
                    <h1 className="register__title">Добро пожаловать!</h1>
                    <form className="register__form" method="post" >
                        <Input input={'input'} type={"text"} name={"Имя"} placeholder={"Ваше имя"} minLength="2"
                            maxLength="40"></Input>
                        <Input input={'input'} type={"email"} name={"E-mail"} placeholder={"Ваш email"} minLength="2"
                            maxLength="64"></Input>
                        <Input input={'input'} type={"password"} name={"Пароль"} placeholder={"Ваш пароль"} minLength="2"
                            maxLength="64"></Input>

                        <button type="submit" className="register__submit">Зарегистрироваться</button>

                        <p className="register__link-text">Уже зарегистрированы?
                            <Link to="/sign-in" className="register__link">Войти</Link>
                        </p>

                    </form>
                </section>
            </main>

        </>
    );
}

export default Register;
