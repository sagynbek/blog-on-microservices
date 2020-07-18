const express = require('express');
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();


const posts = {};

app.use(bodyParser.json());
app.use(cors());


app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id, title
  };

  await axios.post('http://event-bus-srv:4005/events', {
    type: "PostCreated",
    data: posts[id],
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log("Event Received", type);

  res.send({});
})

app.listen(4000, () => {
  console.log("V:0.0.2");
  console.log("Listening on port 4000");
})