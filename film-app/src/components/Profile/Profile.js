import Input from '../Input/Input';
import './Profile.css'
import { Link } from 'react-router-dom'
import Header from '../Header/Header';

function Profile() {

    return (

        <>
            <Header isLogged={true}> </Header>
            <main className="profile">

                <h3 className="profile__title">Привет, Виталий!</h3>
                <form className="profile__form" method="post" >

                    <Input input={"input-profile"} type={"text"} name={"Имя"} value={"Виталий"} disabled></Input>
                    <Input input={"input-profile"} type={"email"} name={"E-mail"} value={"pochta@yandex.ru"} disabled></Input>

                </form>
                <button type="button" className="profile__edit-button">Редактировать</button>


                <Link to="/" className="profile__logout-link">Выйти из аккаунта</Link>


            </main>

        </>
    );
}

export default Profile;
