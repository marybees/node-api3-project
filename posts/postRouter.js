const express = require("express");

const Posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error retrieving your posts!",
      });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error retrieving your post.",
      });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The post has been deleted!" });
      } else {
        res.status(404).json({ message: "The post could not be found." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "We encountered an error removing the post.",
      });
    });
});

router.put("/:id", (req, res) => {
  Posts.update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post could not be found." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "We encountered an error updating the post.",
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

// endpoints
server.use("/api/posts", validatePostId, postsRouter);

module.exports = router;
