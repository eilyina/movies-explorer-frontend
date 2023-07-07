import './AboutProject.css'
import '../HeaderBlock/HeaderBlock'
import HeaderBlock from '../HeaderBlock/HeaderBlock';
// import AboutProject from '../AboutProject/AboutProject'


function AboutProject() {
    return (
        <section className="project">
            <HeaderBlock title={'О проекте'}></HeaderBlock>
            {/* <h2 className="project__header">О проекте</h2> */}
            <div className="project__info">
                    <p className="project__title">Дипломный проект включал 5 этапов</p>
                    <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    <p className="project__title">На выполнение диплома ушло 5 недель</p>
                    <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="project__progress-bar">
              
                    <p className="project__progress-text-weeks">1 неделя</p>
                    <p className="project__progress-text-weeks">4 недели</p>
                    <p className="project__progress-text-type">Back-end</p>
       
                {/* <div className="project__progress-bar-colomn"> */}
                    
                    <p className="project__progress-text-type">Front-end</p>
                {/* </div> */}
            </div>

        </section>

    );
}

export default AboutProject;