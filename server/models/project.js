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

    },


    getById: async (id) => {

        const [rows] = await db.query(
            `
            SELECT *
            FROM projects
            WHERE id = ?
            `,
            [id]
        );

        return rows[0];

    },


    update: async (id, project) => {

        const {
            title,
            description,
            image,
            github_url,
            live_url,
            technologies,
            featured
        } = project;

        if (image) {

            await db.query(
                `
                UPDATE projects
                SET title = ?,
                    description = ?,
                    image = ?,
                    github_url = ?,
                    live_url = ?,
                    technologies = ?,
                    featured = ?
                WHERE id = ?
                `,
                [
                    title,
                    description,
                    image,
                    github_url,
                    live_url,
                    technologies,
                    featured,
                    id
                ]
            );

        } else {

            await db.query(
                `
                UPDATE projects
                SET title = ?,
                    description = ?,
                    github_url = ?,
                    live_url = ?,
                    technologies = ?,
                    featured = ?
                WHERE id = ?
                `,
                [
                    title,
                    description,
                    github_url,
                    live_url,
                    technologies,
                    featured,
                    id
                ]
            );

        }

    },


    delete: async (id) => {

        await db.query(
            "DELETE FROM projects WHERE id = ?",
            [id]
        );

    }


};


module.exports = Project;