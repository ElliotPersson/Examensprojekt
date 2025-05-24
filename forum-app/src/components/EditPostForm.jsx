import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function EditPostForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setContent(data.content);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, { title, content });
      navigate(`/post/${id}`)
    } catch (err) {
      setError("Failed to update post");
    }
  }

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Edit title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Edit content"
        ></textarea>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditPostForm;