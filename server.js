const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// logger logs to the console the following information about each request: request method, request url, and a timestamp
// this middleware runs on every request made to the API
function logger(req, res, next) {}

// this middleware will be used for all endpoints that include an id parameter in the url (ex: /api/users/:id and it should check the database to make sure there is a user with that id. If there is no user with that id return HTTP status code 404 and a useful error message. If a user with that id is found, then let the request continue.
//   if the id parameter is valid, store that user object as req.user
//   if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" }
function validateUserId(req, res, next) {}

// validateUser validates the body on a request to create a new user
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
// if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }
function validateUser(req, res, next) {}

// validatePost validates the body on a request to create a new post
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
// if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" }
function validatePost(req, res, next) {}

module.exports = server;
