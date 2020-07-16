import React from 'react';

const CommentList = ({ comments }) => {

  const commentContainer = comments.map(comment => {
    let content = null;
    if (comment.status === 'approved') {
      content = comment.content;
    }
    else if (comment.status === "pending") {
      content = "This comment is awaiting moderation";
    }
    else if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }

    return (
      <li key={comment.id}>
        {content}
      </li>
    )
  })

  return (
    <ul>
      {commentContainer}
    </ul>
  );
}

export default CommentList;
