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