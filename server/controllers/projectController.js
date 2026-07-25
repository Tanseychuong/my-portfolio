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