import './HeaderBlock.css'
// import AboutProject from '../AboutProject/AboutProject'


function HeaderBlock(props) {
    return (
       
            <h2 className="header-block__title">{props.title}</h2>
     

    );
}

export default HeaderBlock;