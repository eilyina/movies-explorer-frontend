
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import './Login.css'
import { Link } from 'react-router-dom'

function Login() {
    return (

        <>
            <header className="header-login">
            </header>
            <main className="content">
                <section className="login">
                    <Link to="/" className="login__logo-link"><Logo ></Logo></Link>
                    <h1 className="login__title">Рады видеть!</h1>
                    <form className="register__form" method="post" >
                        <Input input={'input'} type={"email"} name={"E-mail"} placeholder={"Ваш email"} minLength="2"
                            maxLength="64"></Input>
                        <Input input={'input'} type={"password"} name={"Пароль"} placeholder={"Ваш пароль"} minLength="2"
                            maxLength="64"></Input>
                        <button type="submit" className="login__submit">Войти</button>
                        <p className="login__link-text">Ещё не зарегистрированы?
                            <Link to="/sign-up" className="login__link">Регистрация</Link>
                        </p>

                    </form>
                </section>
            </main>

        </>
    );
}

export default Login;
