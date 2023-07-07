import './Header.css'
import { Link } from 'react-router-dom';

function Header(props) {
  console.log(props.isLogged)
  return (
    <header className="header">
      {props.isLogged ?
        <>
          <div className="header__container">
            <div className="header__logo"></div>
            <Link to="/movies" className="header__link-films header__link-films_active" >Фильмы</Link>
            <Link to="/saved-movies" className="header__link-films">Сохраненные фильмы</Link>
          </div>
          <Link to="/profile" className="header__link-account">
            <p className="header__link-account-text">Аккаунт</p>
            <div className="header__icon-container">
              <div className="header__link-account-icon"></div>
            </div>

          </Link>

        </>
        :
        <>
          <div className="header__logo"></div>
          <div>
            <Link to="/sign-up" className="header__link" >Регистрация</Link>
            <Link to="/sign-in" className="header__link" >Войти</Link>
          </div>
        </>
      }


    </header>
  );
}

export default Header;