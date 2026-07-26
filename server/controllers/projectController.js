const fs = require("fs");
const path = require("path");

const Project = require("../models/project");


exports.getProjects = async (req, res) => {

    try {

        const projects = await Project.getAll();

        res.status(200).json(projects);


    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error fetching projects"
        });

    }

};

exports.createProject = async (req, res) => {
    try {

        const {
            title,
            description,
            github_url,
            live_url,
            technologies,
            featured
        } = req.body;

        const image = req.file ? req.file.filename : null;

        const id = await Project.create({
            title,
            description,
            image,
            github_url,
            live_url,
            technologies,
            featured: featured === "true" || featured === true ? 1 : 0
        });

        res.status(201).json({
            message: "Project created successfully.",
            id
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Failed to create project."
        });

    }
};

exports.updateProject = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            github_url,
            live_url,
            technologies,
            featured
        } = req.body;

        const existing = await Project.getById(id);

        if (!existing) {

            return res.status(404).json({
                message: "Project not found."
            });

        }

        const image = req.file ? req.file.filename : null;

        await Project.update(id, {
            title,
            description,
            image,
            github_url,
            live_url,
            technologies,
            featured: featured === "true" || featured === true ? 1 : 0
        });

        // Remove the old image file if it was replaced
        if (image && existing.image) {

            const oldPath = path.join(
                __dirname,
                "..",
                "uploads",
                existing.image
            );

            fs.unlink(oldPath, () => { });

        }

        res.json({
            message: "Project updated."
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Update failed."
        });

    }

};

exports.deleteProject = async (req, res) => {

    try {

        const { id } = req.params;

        const existing = await Project.getById(id);

        if (!existing) {

            return res.status(404).json({
                message: "Project not found."
            });

        }

        await Project.delete(id);

        if (existing.image) {

            const imagePath = path.join(
                __dirname,
                "..",
                "uploads",
                existing.image
            );

            fs.unlink(imagePath, () => { });

        }

        res.json({
            message: "Project deleted."
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Delete failed."
        });

    }

};