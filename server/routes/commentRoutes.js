const express = require("express");

const router = express.Router();

const CommentController =
    require("../controllers/commentController");


// Add comment
router.post(
    "/",
    CommentController.createComment
);


// Get comments for a blog
router.get(
    "/:blog_id",
    CommentController.getComments
);


module.exports = router;