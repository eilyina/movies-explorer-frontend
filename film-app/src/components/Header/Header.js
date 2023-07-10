import Account from '../Account/Account';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import './Header.css'
import { Link, NavLink } from 'react-router-dom';

function Header(props) {
  const setActive = ({ isActive }) => (isActive ? "header__link-films header__link-films_active" : "header__link-films");
  return (
    <header className="header">
      {props.isLogged ?
        <>
          <div className="header__container">
            <Link to="/" className="header__logo-link"><Logo></Logo></Link>
            <NavLink to="/movies" className={setActive} >Фильмы</NavLink>
            <NavLink to="/saved-movies" className={setActive} >Сохраненные фильмы</NavLink>
          </div>
          <Account type={"header"}></Account>
          <div className="burger__container">
            <input type="checkbox" className="burger__input" id="burger"></input>
            <label className="burger__label" for="burger"></label>
            <Navigation></Navigation>
          </div>
        </>
        :
        <>
          <Link to="/" className="header__logo-link"><Logo></Logo></Link>
          <nav>
            <Link to="/sign-up" className="header__link" >Регистрация</Link>
            <Link to="/sign-in" className="header__link" >Войти</Link>
          </nav>
        </>
      }


    </header>
  );
}

export default Header;