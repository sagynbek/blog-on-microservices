import React from 'react';
import PostCreate from './posts/PostCreate';
import PostList from './posts/PostList';

const App = () => {
  return (
    <div className="container">
      <h1>Create post</h1>
      <PostCreate />

      <h1>Posts list</h1>
      <PostList />
    </div>
  );
}

export default App;
