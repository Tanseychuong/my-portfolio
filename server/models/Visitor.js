const db = require("../config/database");


const Visitor = {


    async create(data) {

        const sql = `
        INSERT INTO visitors
        (ip_address,page,device,duration)

        VALUES(?,?,?,?)
        `;


        await db.execute(
            sql,
            [
                data.ip_address,
                data.page,
                data.device,
                data.duration
            ]
        );

    },


    async getStats() {

        const [rows] = await db.execute(
            `
            SELECT 
            COUNT(*) AS totalVisitors
            FROM visitors
            `
        );


        return rows[0];

    }


};


module.exports = Visitor;