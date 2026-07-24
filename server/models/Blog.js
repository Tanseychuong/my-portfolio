const db = require("../config/database");


const Blog = {


    async create(title, content, image) {

        const sql = `
            INSERT INTO blogs
            (title, content, image)
            VALUES (?, ?, ?)
        `;


        const [result] = await db.execute(
            sql,
            [
                title,
                content,
                image
            ]
        );


        return result.insertId;

    },


    async getAll() {

        const [rows] = await db.execute(
            "SELECT * FROM blogs ORDER BY created_at DESC"
        );

        return rows;

    },


    async getById(id) {

        const [rows] = await db.execute(
            "SELECT * FROM blogs WHERE id=?",
            [id]
        );


        return rows[0];

    },


    async delete(id) {

        await db.execute(
            "DELETE FROM blogs WHERE id=?",
            [id]
        );

    }


};


module.exports = Blog;