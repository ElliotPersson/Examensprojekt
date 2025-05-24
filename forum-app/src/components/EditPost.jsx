import { useNavigate } from "react-router-dom";

function EditPostButton({ postId }) {
  const navigate = useNavigate();

  return <button className="edit-btn" onClick={() => navigate(`/edit/${postId}`)}>Edit</button>;
}

export default EditPostButton;
