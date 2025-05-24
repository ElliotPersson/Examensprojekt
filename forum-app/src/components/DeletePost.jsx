import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";

function DeletePostButton() {
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "posts", id));
      alert("Post successfuly deleted");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete post:", err.message);
    }
  }

  return <button className="delete-btn" onClick={handleDelete}>Delete</button>;
}

export default DeletePostButton;
