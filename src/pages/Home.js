import Nav from "../components/Nav"



const Home = () => {
    const authToken = true
    
    const handleClick = () => {
        console.log("clicked")
    }

    return (
        <>
        <Nav/>
        <div className = "home">
            <h1>Embrace the Link, Make It Yours!™</h1>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? "Signout" : "Create Account"}
            </button>
        </div>
        </>
    );
}

export default Home;