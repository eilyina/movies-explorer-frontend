
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import './Login.css'
import { Link } from 'react-router-dom'
import { useForm, useFormWithValidation } from '../Hooks/useForm'

function Login(props) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        //  const { email, password, name } = ;
        // console.log(values)
        props.handleLogin(values) ;

    }

    return (

        <>
            <header className="header-login">
            </header>
            <main className="content">
                <section className="login">
                    <Link to="/" className="login__logo-link"><Logo ></Logo></Link>
                    <h1 className="login__title">Рады видеть!</h1>
                    <form className="register__form" method="post" onSubmit={handleSubmit} >
                        <Input
                            input={'input'}
                            type={"email"}
                            name={"email"}
                            title={"E-mail"}
                            placeholder={"Ваш email"}
                            minLength="2"
                            maxLength="64"
                            pattern='[a-zA-Z0-9]+@[a-z]+\.{1,1}[a-z]{2,}'
                            // [a-z0-9]+@[a-z]+\\.{1,1}[a-z]{2,}
                            onChange={handleChange}
                            errors={errors.email}
                            value={values.email || ""}
                        >

                        </Input>
                        <Input
                            input={'input'}
                            type={"password"}
                            name={"password"}
                            title={"Пароль"}
                            placeholder={"Ваш пароль"}
                            minLength="2"
                            maxLength="64"
                            onChange={handleChange}
                            errors={errors.password}
                            value={values.password || ""}>

                        </Input>
                        <button type="submit" className="login__submit" disabled={!isValid}>Войти</button>
                        <span className='login__error'>{props.registrationStatus}</span>
                        <p className="login__link-text">Ещё не зарегистрированы?
                            <Link to="/signup" className="login__link">Регистрация</Link>
                        </p>

                    </form>
                </section>
            </main>

        </>
    );
}

export default Login;
