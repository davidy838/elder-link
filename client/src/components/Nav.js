import logo from '../images/main.jpeg';
import logo2 from '../images/main2.jpeg';

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp})=> {
    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(false);
    }
    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal? logo : logo2 } alt = "logo"/>
            </div>
            {!authToken && !minimal && 
            <button 
            className="nav-button" 
            onClick={handleClick}
            disabled={showModal}
            > Log in </button>}
        </nav>
    );
}
export default Nav;