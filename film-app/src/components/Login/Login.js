
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import './Login.css'
import {Link} from 'react-router-dom'



function Login() {

 
    

    return (

        <>
        <main className="content">
        <div className="login">
            
            <Logo ></Logo>
          
           
                <h3 className="login__title">Рады видеть!</h3>
                <form className="register__form" method="post" >
               
                    <Input type={"email"} name={"E-mail"} placeholder={"Ваш email"}></Input>
                    <Input type={"password"} name={"Пароль"} placeholder={"Ваш пароль"}></Input>
                
                    <button type="submit" className="login__submit">Зарегистрироваться</button>
                   
                        <p className="login__link-text">Ещё не зарегистрированы? 
                             <Link to="/sign-up" className="login__link">Регистрация</Link> 
                        </p>
                
                </form>
            </div>
        </main>
          
                </>
    );
}

export default Login;
