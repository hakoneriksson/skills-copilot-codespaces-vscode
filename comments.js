// create web server

// Import express
const express = require("express");

// Create an express application
const app = express();

// Import the comments.json file
let comments = require("./comments.json");

// Use express's built-in middleware to parse incoming JSON payloads
app.use(express.json());

// Create a router for the comments
const commentsRouter = express.Router();

// Create a get request to get all comments
commentsRouter.get("/", function (request, response) {
    // Return the comments array
    response.json(comments);
});

// Create a post request to post a comment
commentsRouter.post("/", function (request, response) {
    // Add the comment to the comments array
    comments.push(request.body);
    // Return the comments array
    response.json(comments);
});

// Create a put request to edit a comment
commentsRouter.put("/:id", function (request, response) {
    // Get the id from the route
    const id = parseInt(request.params.id);
    // Get the comment from the request body
    const comment = request.body;
    // Find the comment by id from the comments array
    const commentFound = comments.find((comment) => comment.id === id);
    // Check if comment exists
    if (!commentFound) {
        return response.status(404).json({ error: "Comment not found" });
    }
    // Update the comment content
    commentFound.content = comment.content;
    // Return the comments array
    response.json(comments);
});

// Create a delete request to delete a comment
commentsRouter.delete("/:id", function (request, response) {
    // Get the id from the route
    const id = parseInt(request.params.id);
    // Find the comment by id from the comments array
    const commentFound = comments.find((comment) => comment.id === id);
    // Check if comment exists
    if (!commentFound) {
        return response.status(404).json({ error: "Comment not found" });
    }
    // Get the index of the comment
    const index = comments.indexOf(commentFound);
    // Remove the comment
    comments.splice(index, 1);
    // Return the comments array
    response.json(comments);
});

// Use the comments router for all /comments routes
app.use("/comments", commentsRouter);

// Listen on port 3000
app.listen(3000, function () {
    console.log("Web server is listening on port 3000!");
});