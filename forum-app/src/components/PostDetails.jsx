import { useParams } from "react-router-dom"; // Lets you use parameters from url
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { useState, useEffect } from "react";
import { getComments, addComment } from "../firebase/firestore/comments";

function PostDetails() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        async function fetchPost() {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPost(docSnap.data());
            } else {
                console.log("No document found");
            }
        }

        async function fetchComments() {
            const data = await getComments(id);
            setComments(data);
        }

        fetchPost();
        fetchComments();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();

        const user = auth.currentUser;

        if (!user) {
            alert("You must log in to comment");
            return;
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const username = userDoc.exists() ? userDoc.data().username : "Anonymous";

        await addComment(id, {
            content: newComment,
            userId: user.uid,
            username: username,
        });

        setNewComment("");

        const data = await getComments(id);
        setComments(data);
    }

    return (
        <div>
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>

                    <form onSubmit={handleSubmit}>
                        <input
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                        />
                        <button type="submit">Send</button>
                    </form>

                    <div>
                        <h3>Comments</h3>
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <p>{comment.username}</p>
                                <p>{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading post...</p>
            )}
        </div>
    );
}

export default PostDetails;