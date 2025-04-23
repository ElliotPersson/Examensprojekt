import { useState, useEffect, } from "react";
import { Link } from "react-router-dom";

function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (

        <header className="header">

            <div className="auth-btns">

                <button className="login-btn">Login</button>
                <Link to="/register" className="register-btn">Register</Link>

            </div>


            <div
                className={`hamburger-icon ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`menu-panel ${menuOpen ? "open" : ""}`}>
                <nav>
                    <Link to="/create">Create Post</Link>
                    { }
                </nav>
            </div>




        </header>

    )
}



export default Header;