const Nav = () => {
    return (
        <nav>
            <div className="logo-container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/resources">Resources</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
        </nav>
    );
}