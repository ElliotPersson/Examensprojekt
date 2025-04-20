import { useState, useEffect, } from "react";
import { Link } from "react-router-dom";

function Header() {

    return(

    <header className="header">
        
        <div className="auth-btns">
        
        <button className="login-btn">Login</button>
        <Link to="/register" className="register-btn">Register</Link>
        
        </div>

        
        <div className="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>
    
    
    )
}



export default Header;