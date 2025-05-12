import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";


function RequireAuth({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) //controlls when the CreatePost component is visable     


    // Listens for user login statsu (login or logout):
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            
            setUser(currentUser);
            setLoading(false); // Update loading so that the component can load when user is logged in

        });

        return () => unsubscribe();
    }, []);

    // Prevent component to render if auth status isnt known:
    if (loading) return null;

    //Redirect user to login page if not logged in:
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default RequireAuth;