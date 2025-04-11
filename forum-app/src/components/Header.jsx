import { useState, useEffect, } from "react";
import { Link } from "react-router-dom";

function Header() {

    return(

    <header className="header">
        <button className="login-btn">Login</button>
        <Link to="/register">Register</Link>

        
        <div className="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>
    
    
    )
}


export default Header;