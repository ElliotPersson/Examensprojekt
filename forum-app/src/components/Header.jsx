import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [username, setUsername] = useState("");


    // Listen for authentication state changes:
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            
            // Fetch username from Firestore if user is logged in:
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUsername(userDoc.data().username);
                }
            } else {
                setUsername("");
            }
        });

        return () => unsubscribe();
    }, []);


    // Handle logout:
    async function handleLogout() {
        try {
            await signOut(auth);
            console.log("User logged out");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    }

    return (
        <header className="header">

            <div className="auth-section">
                {currentUser && (
                    <div className="user-info">
                        <div className="profile-pic"></div>
                        <span className="username">{username}</span>
                    </div>
                )}

                {!currentUser ? (
                    <>
                        <button className="login-btn">
                            <Link to="/login" className="login-btn">Login</Link>
                        </button>
                        <Link to="/register" className="register-btn">Register</Link>
                    </>
                ) : (
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                )}
            </div>

            {/* Hamburger menu: */}
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
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/create" onClick={() => setMenuOpen(false)}>Create Post</Link>
                    
                </nav>
            </div>

        </header>
    );
}

export default Header;
