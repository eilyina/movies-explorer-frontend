import './Promo.css'
import NavTab from '../NavTab/NavTab'


function Promo() {
    return (
        <section className="promo">
            <div className="promo__background-container">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <NavTab></NavTab>
            </div>
        </section>

    );
}

export default Promo;