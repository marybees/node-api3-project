const express = require("express");

const postsRouter = require("./posts/postRouter");

const userRouter = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// global middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );

  next();
}

// endpoints
server.use("/api/posts", logger);

module.exports = server;
