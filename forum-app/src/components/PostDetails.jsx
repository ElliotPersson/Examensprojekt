import { useParams } from "react-router-dom"; // Lets you use parameters from url
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { useState, useEffect } from "react";
import { getComments, addComment } from "../firebase/firestore/comments";
import EditPostButton from "./EditPost";
import DeletePostButton from "./DeletePost";

function PostDetails() {
    const { id } = useParams();
    const currentUserId = auth.currentUser?.uid

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [creatorUsername, setCreatorUsername] = useState("")

    useEffect(() => {
        async function fetchPost() {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const postData = docSnap.data()
                setPost(postData);

                if (postData.userId) {

                    const userRef = doc(db, "users", postData.userId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        setCreatorUsername(userSnap.data().username || "Unknown");
                    } else {
                        setCreatorUsername("Unknown");
                    }
                }

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
  <div className="post-details-wrapper">
    {post ? (
      <>
        <div className="post-section-box">
          <h1 className="post-title">{post.title}</h1>
          <p className="post-meta">Posted by: {creatorUsername}</p>
          <p className="post-content">{post.content}</p>

          {post.userId === currentUserId && (
            <div className="post-actions">
              <EditPostButton postId={id} />
              <DeletePostButton />
            </div>
          )}
        </div>

        <div className="comment-section-box">
          <h3 className="comments-heading" >Comments</h3>
          <form className="comment-form" onSubmit={handleSubmit}>
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit">Send</button>
          </form>

          <div className="comments-section">
            {comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <p><strong>{comment.username}</strong></p>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    ) : (
      <p>Loading post...</p>
    )}
  </div>
);

        
}

export default PostDetails;