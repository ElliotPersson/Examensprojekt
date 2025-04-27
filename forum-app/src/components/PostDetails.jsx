import { useParams } from "react-router-dom"; // Lets you use parameters from url
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase";
import { useState, useEffect } from "react";


function PostDetails() {

    const { id } = useParams()

    const [post, setPost] = useState(null);

    useEffect(() => {

        async function fetchPost() {

            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc (docRef);

            if (docSnap.exists()) {
                setPost(docSnap.data());
            } else {
                console.log("no document found")
            }       
        }

        fetchPost()
    }, [id]);


    return (
        <div>
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </>
            ) : (
                <p>Loading post...</p>
            )}
        </div>
    );
}

export default PostDetails;