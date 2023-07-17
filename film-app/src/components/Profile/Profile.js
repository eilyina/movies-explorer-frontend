import Input from '../Input/Input';
import './Profile.css'
import { Link } from 'react-router-dom'
import Header from '../Header/Header';
import React, { useState } from "react";

function Profile() {

    const [isEditProfile, setIsEditProfile] = useState(false);

    function handleEditProfile() {
        setIsEditProfile(true);
    }

    function handleSaveProfile() {
        setIsEditProfile(false);
    }



    return (

        <>
            <Header isLogged={true}></Header>
            {/* <Header isLogged={true}></Header> */}
            <main className="profile">
                <section className="profile__section">
                    <h1 className="profile__title">Привет, Виталий!</h1>
                    <form className="profile__form" method="post" onSubmit={handleSaveProfile}>

                        <Input input={"input-profile"} type={"text"} name={"Имя"} value={"Виталий"} disabled={!isEditProfile} placeholder={"Ваше имя"} minLength="2"
            maxLength="40"></Input>
                        <Input input={"input-profile"} type={"email"} name={"E-mail"} value={"pochta@yandex.ru"} disabled={!isEditProfile} placeholder={"Ваша почта"}></Input>
                        {
                        isEditProfile ?
                            (< button type="submit" className="profile__save-button">Сохранить</button>)
                            :
                            (<>

                                <button type="button" className="profile__edit-button" onClick={handleEditProfile}>Редактировать</button>
                                <Link to="/" className="profile__logout-link">Выйти из аккаунта</Link>
                            </>)
                    }
                    </form>
            
                </section>
            </main>

        </>
    );
}

export default Profile;
