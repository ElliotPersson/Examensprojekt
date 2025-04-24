import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";



function CreatePost() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
            await addDoc(collection(db, "posts"), {
              title,
              content,
              createdAt: serverTimestamp()
            });
            
            setTitle("");
            setContent("");
    } catch (error) {
        console.error("Error with adding post:", error);
    }
 }

    return(<>

        <form className="create-form" onSubmit={handleSubmit}>

        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <button type="submit">Create post</button>

        </form> 
    
    </>)    
}

export default CreatePost