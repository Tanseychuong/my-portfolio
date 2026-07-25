const express = require("express");

const router = express.Router();

const blogController = require("../controllers/blogController");

const auth = require("../middleware/auth");


// Public: get all blogs
router.get(
    "/",
    blogController.getBlogs
);


// Admin: create blog
router.post(
    "/",
    auth,
    blogController.createBlog
);


module.exports = router;