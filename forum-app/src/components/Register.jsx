import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase"; 
import { setDoc, doc, serverTimestamp } from "firebase/firestore";





function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    async function handleSubmit(e) {
        
        e.preventDefault()

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered:", userCred.user);

            await setDoc(doc(db, "users", userCred.user.uid), {
                email: userCred.user.email,
                createdAt: serverTimestamp(),
                username
                
            });

        } catch (error) {
            console.error("Error during registration", error.message);
        }

    }

    return (
        <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your Email" />
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Create a username" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Create a password" />
            <button>Register</button>
        </form>
        </div>
    )
}

export default Register;