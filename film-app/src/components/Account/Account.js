
import './Account.css'
import { Link } from 'react-router-dom';

function Account({type}) {

    return (


        <>

            <Link to="/profile" className={`${type}__link-account`}>
                <p className={`${type}__link-account-text`}>Аккаунт</p>
                <div className={`${type}__icon-container`}>
                    <div className={`${type}__link-account-icon`}></div>
                </div>
            </Link>

            {/* <Link to="/profile" className="header__link-account">
            <p className="header__link-account-text">Аккаунт</p>
            <div className="header__icon-container">
              <div className="header__link-account-icon"></div>
            </div>

          </Link> */}

        </>)


}

export default Account;