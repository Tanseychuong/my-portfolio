const db = require("../config/database");


// Track visitor
exports.trackVisitor = async (req, res) => {

    try {

        const {
            ip,
            device,
            duration,
            page
        } = req.body;


        await db.query(
            `
            INSERT INTO visitors
            (
                ip,
                device,
                duration,
                page
            )
            VALUES(?,?,?,?)
            `,
            [
                ip,
                device,
                duration,
                page
            ]
        );


        res.status(201).json({
            message: "Visitor tracked"
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Analytics error"
        });

    }

};



// Dashboard statistics
exports.getAnalytics = async (req, res) => {

    try {

        const [visitors] = await db.query(
            `
            SELECT COUNT(*) AS totalVisitors
            FROM visitors
            `
        );


        res.json({

            visitors:
                visitors[0].totalVisitors

        });


    } catch (error) {

        console.error(error);


        res.status(500).json({
            message: "Failed to load analytics"
        });

    }

};

// End of the code