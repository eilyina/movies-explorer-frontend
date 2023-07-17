import './AboutMe.css'
import HeaderBlock from '../HeaderBlock/HeaderBlock';

function AboutMe() {
    return (
        <section className="about-me" id="student">
            <HeaderBlock title={'Студент'}></HeaderBlock>
            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__name">Виталий</h3>
                    <p className="about-me__job-title">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__description">Я родился и живу в Саратове, закончил факультет экономики СГУ.
                        У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                        С 2015 года работал в компании «СКБ Контур».
                        После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a className="about-me__link-github" href="https://github.com/eilyina" rel="noreferrer" target="_blank">Github</a>
                </div>
                <div className="about-me__photo"></div>
            </div>
            <h4 className="about-me__portfolio">Портфолио</h4>
            <ul className="about-me__list">
                <li className="about-me__item">
                    <a className="about-me__link-site" href="https://github.com/eilyina/how-to-learn" rel="noreferrer" target="_blank">
                        <p className="about-me__link-site-text" >Статичный сайт</p>
                        <div className="about-me__link-site-icon" ></div>
                    </a>

                </li>
                <li className="about-me__item">
                    <a className="about-me__link-site" href="https://github.com/eilyina/russian-travel" rel="noreferrer" target="_blank">
                        <p className="about-me__link-site-text" >Адаптивный сайт</p>
                        <div className="about-me__link-site-icon" ></div>
                    </a>

                </li>
                <li className="about-me__item">
                    <a className="about-me__link-site" href="https://github.com/eilyina/mesto-react" rel="noreferrer" target="_blank">
                        <p className="about-me__link-site-text" >Одностраничное приложение</p>
                        <div className="about-me__link-site-icon" ></div>
                    </a>

                </li>
            </ul>
        </section>

    );
}

export default AboutMe;