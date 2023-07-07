import './NavTab.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';


function NavTab() {
    return (
 
        <nav className="nav__links">
            <Link to="/" className="nav__link" >О проекте</Link>
            <Link to="/" className="nav__link" >Технологии</Link>
            <Link to="/" className="nav__link" >Студент</Link>  
        </nav>

    );
  }
  
  export default NavTab;