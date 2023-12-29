import logo from '../images/main.jpeg';
import logo2 from '../images/main2.jpeg';

const Nav = ({ minimal, setShowModal, showModal, setIsSignUp})=> {
    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(false);
    }

    const authToken = true;
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