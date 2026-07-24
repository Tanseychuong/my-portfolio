const Blog = require("../models/blog");


exports.createBlog = async (req, res) => {

    try {

        const id = await Blog.create(
            req.body.title,
            req.body.content,
            req.body.image
        );


        res.json({
            message: "Blog created",
            id
        });


    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};



exports.getBlogs = async (req, res) => {

    const blogs = await Blog.getAll();

    res.json(blogs);

};