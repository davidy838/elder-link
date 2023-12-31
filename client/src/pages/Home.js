import Nav from "../components/Nav"
import { useState } from 'react';
import AuthModal from "../components/AuthModal";
import {useCookies} from 'react-cookie'




const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);

    const [cookies, setCookie, removeCookie] = useCookies(['user'])


    const authToken = cookies.authToken;


    const handleClick = () => {
    if (authToken) {
            removeCookie('AuthToken');
            removeCookie('UserId');
            window.location.reload();
            return;
        }
        console.log("clicked")
        setShowModal(true);
        setIsSignUp(true);

    }

    return (
        <div className="overlay">
        <Nav authToken={authToken}
             minimal={false} 
             setShowModal={setShowModal} 
             showModal = {showModal}
             setIsSignUp={setIsSignUp} />
        <div className = "home">
            <h1 className="primary-title">Link Anywhere!™</h1>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? "Signout" : "Create Account"}
            </button>
            {showModal && (<AuthModal setShowModal = {setShowModal} isSignUp={isSignUp}/>)}

        </div>
        </div>
    );
}

export default Home;