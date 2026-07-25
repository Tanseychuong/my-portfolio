const db = require("../config/database");


const Project = {


    getAll: async () => {

        const [rows] = await db.query(
            `
            SELECT *
            FROM projects
            ORDER BY created_at DESC
            `
        );

        return rows;

    },


    getFeatured: async () => {

        const [rows] = await db.query(
            `
            SELECT *
            FROM projects
            WHERE featured = TRUE
            ORDER BY created_at DESC
            `
        );

        return rows;

    },


    create: async (project) => {

        const {
            title,
            description,
            image,
            github_url,
            live_url,
            technologies
        } = project;


        const [result] = await db.query(

            `
            INSERT INTO projects
            (
                title,
                description,
                image,
                github_url,
                live_url,
                technologies
            )

            VALUES(?,?,?,?,?,?)

            `,

            [
                title,
                description,
                image,
                github_url,
                live_url,
                technologies
            ]

        );


        return result.insertId;

    }


};


module.exports = Project;