const express = require("express");

const postsRouter = require("./posts/postRouter");

const server = express();

server.use(express.json());
server.use(logger);
server.use(validateUserId);
server.use(validateUser);
server.use(validatePost);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// global middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}

//endpoints that inlude id param (ex: /api/users/:id)

function validateUserId(req, res, next) {
  const id = /:id
  if (req.headers.id === id) {
    req.id = id;
    next();
  } else {
    res.satus(404).json({ errorMessage: "Incorrect User Id" });
  }
}

// validateUser validates the body on a request to create a new user
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
// if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }
function validateUser(req, res, next) {
  function (user, name) {
    if (req.body.Includes(user) && req.body.Includes(name) {
      next();
    } if (req.body.user !== user) {
      res.satus(400).json({ errorMessage: "Missing user data" });
    } else {
      res.satus(400).json({ errorMessage: "Missing required ame field" });
    }
  }
}

// validatePost validates the body on a request to create a new post
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
// if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" }
function validatePost(req, res, next) {
  function() {
    if (req.body && req.body.text) {
      next();
    } if (req.body === "") {
      res.satus(400).json({ errorMessage: "Missing post data" });
    } else if {
      res.satus(400).json({ errorMessage: "Missing required text field" });
    } else {
      //cancel
    }
  }
}

// endpoints
server.use("/api/posts", logger, validateUserId, validateUser, validatePost , postsRouter);

module.exports = server;
