import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";



function CreatePost() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
            await addDoc(collection(db, "posts"), {
              title,
              content,
              createdAt: serverTimestamp(),
              userId: auth.currentUser.uid
            });
            
            setTitle("");
            setContent("");
    } catch (err) {
        console.error("Error with adding post:", err);
        setError(err.message)
    }
 }

    return(<>
        <div className="form-wrapper">
        <form className="create-form" onSubmit={handleSubmit}>

        <input type="text" placeholder="Enter a title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <button type="submit">Create post</button>


        {error && <p className="error-msg">{error}</p>}
        </form> 
        </div>
    </>)    
}

export default CreatePost