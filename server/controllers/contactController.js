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


exports.getMessages = async (req, res) => {

    try {

        const [messages] = await db.query(
            "SELECT * FROM messages ORDER BY created_at DESC"
        );

        res.json(messages);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch messages"
        });

    }

};


exports.deleteMessage = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            "DELETE FROM messages WHERE id = ?",
            [id]
        );

        res.json({
            message: "Message deleted"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete message"
        });

    }

};


//end of the code