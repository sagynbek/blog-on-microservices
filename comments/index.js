const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  const newComment = {
    id: commentId,
    content,
    status: "pending",
  };

  comments.push(newComment);
  commentsByPostId[req.params.id] = comments;


  await axios.post('http://event-bus-srv:4005/events', {
    type: "CommentCreated",
    data: {
      ...newComment,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];

    comment = comments.find(comment => comment.id === id)
    comment.status = status;


    await axios.post('http://event-bus-srv:4005/events', {
      type: "CommentUpdated",
      data: {
        id, 
        postId, 
        content,
        status,
      },
    });
  }
  res.send({});
})

app.listen(4001, () => {
  console.log("Listening on port 4001");
})