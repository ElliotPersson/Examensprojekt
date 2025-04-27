import { useState, useEffect, } from "react";
import { getAllPosts } from "../firebase/firestore/posts";
import { Link } from "react-router-dom";

function Posts() {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        async function fetchData() {
            const data = await getAllPosts();
            console.log(data)
            setPosts(data)
        }

        fetchData();
    }, []);




    return (

        <div className="post-section">

            <h3>See anything interesting?</h3>

            {posts.map(post => (
                <Link to={`/post/${post.id}`} key={post.id}>
                    <div className="post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                </Link>
            ))}


        </div>
    )
}

export default Posts;