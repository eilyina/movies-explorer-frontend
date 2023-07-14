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
          <nav className="header__container">
            <ul className="header__link-list">
              <li className="header__link-item"><Link to="/" className="header__logo-link"><Logo></Logo></Link></li>
              <li className="header__link-item"><NavLink to="/movies" className={setActive} >Фильмы</NavLink></li>
              <li className="header__link-item"><NavLink to="/saved-movies" className={setActive} >Сохраненные фильмы</NavLink></li>
            </ul>
          </nav>
          <Account type={"header"}></Account>
          <div className="burger__container">
            <input type="checkbox" className="burger__input" id="burger"></input>
            <label className="burger__label" htmlFor="burger"></label>
            <Navigation></Navigation>
          </div>
        </>
        :
        <>
          <Link to="/" className="header__logo-link"><Logo></Logo></Link>
          <nav className="header__container">
            <ul className="header__link-list">
              <li className="header__link-item"><Link to="/sign-up" className="header__link" >Регистрация</Link></li>
              <li className="header__link-item"><Link to="/sign-in" className="header__link" >Войти</Link></li>
            </ul>
          </nav>
        </>
      }


    </header>


  );
}

export default Header;