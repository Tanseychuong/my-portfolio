const express = require("express");

const router = express.Router();

const blogController = require("../../blog-messages-feature/server/controllers/blogController");

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");


// Public: get all blogs
router.get(
    "/",
    blogController.getBlogs
);


// Public: get single blog
router.get(
    "/:id",
    blogController.getBlog
);


// Admin: create blog
router.post(
    "/",
    auth,
    upload.single("image"),
    blogController.createBlog
);


// Admin: update blog
router.put(
    "/:id",
    auth,
    upload.single("image"),
    blogController.updateBlog
);


// Admin: delete blog
router.delete(
    "/:id",
    auth,
    blogController.deleteBlog
);


module.exports = router;
