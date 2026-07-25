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

        await db.query(
            `INSERT INTO projects
            (title, description, image, github_url, live_url, technologies, featured)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                description,
                image,
                github_url,
                live_url,
                technologies,
                featured || 0
            ]
        );

        res.status(201).json({
            message: "Project created successfully."
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

        if (req.file) {

            await db.query(
                `UPDATE projects
                SET title=?,
                    description=?,
                    image=?,
                    github_url=?,
                    live_url=?,
                    technologies=?,
                    featured=?
                WHERE id=?`,
                [
                    title,
                    description,
                    req.file.filename,
                    github_url,
                    live_url,
                    technologies,
                    featured,
                    id
                ]
            );

        } else {

            await db.query(
                `UPDATE projects
                SET title=?,
                    description=?,
                    github_url=?,
                    live_url=?,
                    technologies=?,
                    featured=?
                WHERE id=?`,
                [
                    title,
                    description,
                    github_url,
                    live_url,
                    technologies,
                    featured,
                    id
                ]
            );

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

        await db.query(
            "DELETE FROM projects WHERE id=?",
            [id]
        );

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