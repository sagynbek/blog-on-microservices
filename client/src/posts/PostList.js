import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from '../comments/CommentCreate';
import CommentList from '../comments/CommentList';


const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const result = await axios.get("http://localhost:4000/posts");
    setPosts(result.data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);


  const postsContainer = Object.values(posts).map(post => {
    return (
      <div key={post.id} className="card" style={{ width: "30%", marginBottom: "20px" }}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList postId={post.id} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    )
  })

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {postsContainer}
    </div>
  );
}

export default PostList;
