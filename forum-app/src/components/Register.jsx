import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";




function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit() {
        
    }

    return (

        <form>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            <button>Register</button>
        </form>
    )
}