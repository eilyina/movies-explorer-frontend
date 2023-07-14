import './Techs.css'
import HeaderBlock from '../HeaderBlock/HeaderBlock';
// import AboutProject from '../AboutProject/AboutProject'


function Techs() {
    return (
        <section className="technologies" id="tech">
            <HeaderBlock title={'Технологии'}></HeaderBlock>
            <h3 className="technologies__title">7 технологий</h3> 
            <p className="technologies__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p> 
            <ul className="technologies__list">
                    <li className="technologies__item">HTML</li>
                    <li className="technologies__item">CSS</li>
                    <li className="technologies__item">JS</li>
                    <li className="technologies__item">React</li>
                    <li className="technologies__item">Git</li>
                    <li className="technologies__item">Express.js</li>
                    <li className="technologies__item">mongo.DB</li>
                    
            </ul>
      

        </section>

    );
}

export default Techs;