const db = require("../config/database");

exports.getDashboardStats = async (req, res) => {

    try {

        const [[projects]] =
            await db.query(
                "SELECT COUNT(*) AS total FROM projects"
            );

        const [[blogs]] =
            await db.query(
                "SELECT COUNT(*) AS total FROM blogs"
            );

        const [[messages]] =
            await db.query(
                "SELECT COUNT(*) AS total FROM contacts"
            );

        const [[visitors]] =
            await db.query(
                "SELECT COUNT(*) AS total FROM visitors"
            );

        res.json({

            projects: projects.total,

            blogs: blogs.total,

            messages: messages.total,

            visitors: visitors.total

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Unable to load dashboard."

        });

    }

};