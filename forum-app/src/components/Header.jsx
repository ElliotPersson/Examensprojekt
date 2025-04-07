import { useState, useEffect, } from "react";
import { Link } from "react-router-dom";

function Header() {

    return(<>
    
    <header>
        <button id="login-btn">Login</button>
        <Link to="/register">Register</Link>

        
        <div id="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>
    
    
    </>)
}


export default Header;