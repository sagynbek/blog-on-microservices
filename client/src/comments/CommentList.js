import React from 'react';

const CommentList = ({ comments }) => {

  const commentContainer = comments.map(comment => (
    <li key={comment.id}>
      {comment.content}
    </li>
  ))

  return (
    <ul>
      {commentContainer}
    </ul>
  );
}

export default CommentList;
