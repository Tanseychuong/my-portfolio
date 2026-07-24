const db = require("../config/database");


exports.sendMessage = async (req, res) => {


    const {
        name,
        email,
        message
    } = req.body;


    try {

        await db.execute(

            `
            INSERT INTO messages
            (name,email,message)

            VALUES(?,?,?)
            `,

            [
                name,
                email,
                message
            ]

        );


        res.json({
            message: "Message sent"
        });


    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }


};