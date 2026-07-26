const db = require("../config/database");


// Get comments for a blog post
exports.getComments = async (req, res) => {

    try {

        const { blogId } = req.params;


        const [comments] = await db.query(
            `
            SELECT *
            FROM comments
            WHERE blog_id = ?
            ORDER BY created_at DESC
            `,
            [blogId]
        );


        res.status(200).json(comments);


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch comments"
        });

    }

};



// Create comment
exports.createComment = async (req, res) => {

    try {

        const {
            blog_id,
            name,
            comment
        } = req.body;



        await db.query(
            `
            INSERT INTO comments
            (
                blog_id,
                name,
                comment
            )

            VALUES(?,?,?)
            `,
            [
                blog_id,
                name,
                comment
            ]
        );


        res.status(201).json({

            message: "Comment created successfully"

        });


    } catch (error) {

        console.error(error);


        res.status(500).json({

            message: "Failed to create comment"

        });

    }

};