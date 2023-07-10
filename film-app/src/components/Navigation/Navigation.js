import './Navigation.css'
import { NavLink } from 'react-router-dom';
import Account from '../Account/Account';


function Navigation() {

    const setActive = ({ isActive }) =>(isActive ? "navigation__link navigation__links_active" : "navigation__link");
    return (
        <>
            <nav className="navigation">
                <ul className="navigation__links">
                    <li>
                    <NavLink   className={setActive} to="/" >Главная</NavLink>
                    </li>
                    <li>
                    <NavLink className={setActive} to="/movies" >Фильмы</NavLink>
                    </li>
                    <li>
                    <NavLink className={setActive} to="/saved-movies" >Сохраненные фильмы</NavLink>
                    </li>
                    <li>
                    <Account type="menu"></Account>
                    </li>
                    
                </ul>

            </nav>

        </>
    );
}

export default Navigation