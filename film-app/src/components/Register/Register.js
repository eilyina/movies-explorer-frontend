
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import './Register.css'
import { Link } from 'react-router-dom'



function Register() {

    return (

        <>
            <main className="content">
                <section className="register">
                    <Link to="/" className="header__logo-link"><Logo ></Logo></Link>
                    <h3 className="register__title">Добро пожаловать!</h3>
                    <form className="register__form" method="post" >
                        <Input input={'input'} type={"string"} name={"Имя"} placeholder={"Ваше имя"}></Input>
                        <Input input={'input'} type={"email"} name={"E-mail"} placeholder={"Ваш email"}></Input>
                        <Input input={'input'} type={"password"} name={"Пароль"} placeholder={"Ваш пароль"}></Input>

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
