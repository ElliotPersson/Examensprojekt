import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../firebase/firestore/posts"; 

function Posts({ searchTerm }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = getAllPosts(setPosts); 

    return () => unsubscribe(); 
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="post-section">
      <h3>See anything interesting?</h3>

      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-wrapper">
            <Link to={`/post/${post.id}`} className="post-link" draggable="false">
              <div className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
