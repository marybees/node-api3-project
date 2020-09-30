const express = require("express");

const Users = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the user.",
      });
    });
});

router.post("/:id/posts", (req, res) => {
  const userInfo = { ...req.body, user_id: req.params.id };

  Users.insert(userInfo)
    .then((user) => {
      res.status(210).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error getting the user for the post.",
      });
    });
});

router.get("/", (req, res) => {
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the users.",
      });
    });
});

router.get("/:id", (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the user.",
      });
    });
});

router.get("/:id/posts", (req, res) => {
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error getting the posts for the user.",
      });
    });
});

router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({ message: "The user has been deleted." });
      } else {
        res.status(404).json({ message: "The user could not be found." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the hub",
      });
    });
});

router.put("/:id", (req, res) => {
  Users.update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the user.",
      });
    });
});

//custom middleware

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
server.use("/api/user", validateUserId, validateUser, validatePost, postsRouter);

module.exports = router;
