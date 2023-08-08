import Input from '../Input/Input';
import './Profile.css'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Header/Header';
import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MainApi';
import { useFormWithValidation } from '../Hooks/useForm';
import {CONFLICT_ERROR_CODE,
    CONFLICT_ERROR_MESSAGE,
    SUCCESS_UPDATE_USER_MESSAGE,
    SERVER_ERROR_MESSAGE} from '../../utils/constants'

function Profile(props) {

    const currentUser = useContext(CurrentUserContext);
    // const { user, setUserContext } = useContext(UserContext);
    const [isEditProfile, setIsEditProfile] = useState(false);
    // const [formValue, setFormValue] = useState({ name: '', email: '' })
    const { values, handleChange, errors, isValid, resetForm, setValues } = useFormWithValidation();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setValues({ name: currentUser.name ?? '', email: currentUser.email ?? '' });

    }, [currentUser]);

    const handleUpdateUser = (currentUser) => {
        setErrorMessage('')
        api.updateUserInfo(currentUser)
            .then((userData) => {
                // setValues({ name: currentUser.name ?? '', email: currentUser.email ?? '' });
                handleSaveProfile()
                setErrorMessage(SUCCESS_UPDATE_USER_MESSAGE)

            })
            .catch((err) => {
                handleEditProfile();
                if( err === CONFLICT_ERROR_CODE)
                {
                    setErrorMessage(CONFLICT_ERROR_MESSAGE)
                }
                else {
                    setErrorMessage(SERVER_ERROR_MESSAGE)
                }
            
                 console.log(err)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email } = values;
        handleUpdateUser({ name, email })
    }

    function handleEditProfile() {
        setErrorMessage('')
        setIsEditProfile(true);
    }

    function handleSaveProfile() {
        setIsEditProfile(false);
    }

    // console.log(props.currentUser)

    return (

        <>
            <Header isLogged={true}></Header>
            {/* <Header isLogged={true}></Header> */}
            <main className="profile">
                <section className="profile__section">
                    <h1 className="profile__title">{`Привет, ${values.name ?? ''}!`}</h1>
                    <form className="profile__form" method="post" onSubmit={handleSubmit}>

                        <Input input={"input-profile"}
                            type={"text"}
                            name={"name"}
                            title={"Имя"}
                            pattern='[a-zA-Zа-яА-Я \-\s]{1,}'
                            disabled={!isEditProfile}
                            placeholder={"Ваше имя"}
                            minLength="2"
                            maxLength="40"
                            value={values.name ?? ''}
                            onChange={handleChange}
                            errors={errors.name}
                        >
                        </Input>
                        <Input input={"input-profile"}
                            type={"email"}
                            name={"email"}
                            title={"E-mail"}
                            value={values.email ?? ''}
                            disabled={!isEditProfile}
                            placeholder={"Ваша почта"}
                            pattern='[a-zA-Z0-9]+@[a-z]+\.{1,1}[a-z]{2,}'
                            errors={errors.email}
                            onChange={handleChange}>
                        </Input>
                        <span className='profile__error'>{errorMessage}</span>
                        {
                            isEditProfile ?
                                ( 
                                < button type="submit" className="profile__save-button"
                                
                                    disabled={!isValid || (currentUser.name === values.name && currentUser.email === values.email)}>Сохранить</button>)
                                :
                                (<>

                                    {/* <span className='profile__error'>{errorMessage}</span> */}
                                    <button type="button" className="profile__edit-button" onClick={handleEditProfile}>Редактировать</button>
                                    <Link to="/" className="profile__logout-link" onClick={props.signOut}>Выйти из аккаунта</Link>
                                </>)

                        }

                    </form>

                </section>
            </main>

        </>
    );
}

export default Profile;
