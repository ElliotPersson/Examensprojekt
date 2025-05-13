import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        

        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            console.log("user logged in:", userCred.user)

        } catch (error) {
            console.error("Error logging in:", error.message);
        }
    }

    return (
        <div className="form-wrapper">
        <form onSubmit={handleLogin}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
            <button type="submit">Login</button>
        </form>
        </div>
    );
}

export default Login

