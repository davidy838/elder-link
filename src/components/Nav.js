import logo from '../images/main.jpeg';
import logo2 from '../images/main2.jpeg';

const Nav = ({ minimal, authToken, setShowModal, showModal })=> {
    const handleClick = () => {
        setShowModal(true);
    }
    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal? logo : logo2 } alt = "logo"/>
            </div>
            {!authToken  && 
            <button 
            className="nav-button" 
            onClick={handleClick}
            disabled={showModal}
            > Log in </button>}
        </nav>
    );
}
export default Nav;