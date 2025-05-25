import { useParams } from "react-router-dom";  // Lets you use parameters from url
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { useState, useEffect } from "react";
import { listenToComments, addComment } from "../firebase/firestore/comments";
import EditPostButton from "./EditPost";
import DeletePostButton from "./DeletePost";

function PostDetails() {
  const { id } = useParams();
  
  // Id of the user if logged in:
  const currentUserId = auth.currentUser?.uid;

  const [post, setPost] = useState(null); 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [creatorUsername, setCreatorUsername] = useState(""); 

  // Fetch post and listens to comments:
  useEffect(() => {

  // fetch post data from firestore:
    async function fetchPost() {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const postData = docSnap.data();
        setPost(postData);

        // Get the username of the post creator:
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

    fetchPost(); // 

    // Listens to comment changes:
    const unsubscribe = listenToComments(id, setComments);

    return () => unsubscribe(); 
  }, [id]);

  // Logic for submiting a comment:
  async function handleSubmit(e) {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("You must log in to comment");
      return;
    }

    // Gets the users username from the "users" collection:
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const username = userDoc.exists() ? userDoc.data().username : "Anonymous";

    //Add the new comment to firestor:
    await addComment(id, {
      content: newComment,
      userId: user.uid,
      username: username,
    });

    // Clear the input field:
    setNewComment(""); 
  }

  return (
    <div className="post-details-wrapper">
      {post ? (
        <>
          <div className="post-section-box">
            <div className="post-card">
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
          </div>

          <div className="comment-section-box">
            <h3 className="comments-heading">Comments</h3>
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
