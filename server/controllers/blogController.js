const fs = require("fs");
const path = require("path");

const Blog = require("../models/Blog");


exports.createBlog = async (req, res) => {

    try {

        const image = req.file ? req.file.filename : null;

        const id = await Blog.create(
            req.body.title,
            req.body.content,
            image
        );


        res.status(201).json({
            message: "Blog created",
            id
        });


    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

};



exports.getBlogs = async (req, res) => {

    try {

        const blogs = await Blog.getAll();

        res.json(blogs);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch blogs"
        });

    }

};



exports.getBlog = async (req, res) => {

    try {

        const blog = await Blog.getById(req.params.id);

        if (!blog) {

            return res.status(404).json({
                message: "Blog not found"
            });

        }

        res.json(blog);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch blog"
        });

    }

};



exports.updateBlog = async (req, res) => {

    try {

        const { id } = req.params;

        const existing = await Blog.getById(id);

        if (!existing) {

            return res.status(404).json({
                message: "Blog not found"
            });

        }

        const image = req.file ? req.file.filename : null;

        await Blog.update(
            id,
            req.body.title,
            req.body.content,
            image
        );

        if (image && existing.image) {

            const oldPath = path.join(
                __dirname,
                "..",
                "uploads",
                existing.image
            );

            fs.unlink(oldPath, () => {});

        }

        res.json({
            message: "Blog updated"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update blog"
        });

    }

};



exports.deleteBlog = async (req, res) => {

    try {

        const { id } = req.params;

        const existing = await Blog.getById(id);

        if (!existing) {

            return res.status(404).json({
                message: "Blog not found"
            });

        }

        await Blog.delete(id);

        if (existing.image) {

            const imagePath = path.join(
                __dirname,
                "..",
                "uploads",
                existing.image
            );

            fs.unlink(imagePath, () => {});

        }

        res.json({
            message: "Blog deleted"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete blog"
        });

    }

};
