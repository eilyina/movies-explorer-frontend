import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import'./Main.css'
import Preloader from '../Preloader/Preloader';

function Main(props) {
  return (
    <>
    {(props.isLoading) ? <Preloader></Preloader> :
     <>
     <Header isLogged={props.loggedIn}></Header>
      <main className="main">
      <Promo></Promo>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>
      </main>
      <Footer></Footer>
  
     </> }
    </>


  );
}

export default Main;