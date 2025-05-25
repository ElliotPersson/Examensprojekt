import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered:", userCred.user);

            await setDoc(doc(db, "users", userCred.user.uid), {
                email: userCred.user.email,
                createdAt: serverTimestamp(),
                username,
            });

        } catch (err) {
            console.error("Error during registration", err.message);
            setError(err.message);
        }
    }

    return (
        <div className="form-wrapper">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your Email"
                />
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Create a username"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Create a password"
                />
                <button>Register</button>

                {error && <p className="error-msg"> Registration failed: {error}</p>}
            </form>
        </div>
    );
}

export default Register;
