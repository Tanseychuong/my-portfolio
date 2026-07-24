const db = require("../config/database");


const Comment = {


    async create(blog_id, name, comment) {

        const sql = `
            INSERT INTO comments
            (blog_id,name,comment)

            VALUES(?,?,?)
        `;


        const [result] = await db.execute(
            sql,
            [
                blog_id,
                name,
                comment
            ]
        );


        return result.insertId;

    },


    async getByBlog(blog_id) {

        const [rows] = await db.execute(
            `
            SELECT *
            FROM comments
            WHERE blog_id=?
            `,
            [blog_id]
        );


        return rows;

    }


};


module.exports = Comment;