const mysql = require("mysql2/promise");


const db = mysql.createPool({

    host: process.env.DB_HOST,

    port: process.env.DB_PORT || 3306,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME

});


db.getConnection()
    .then(connection => {

        console.log("Database connected");

        connection.release();

    })
    .catch(error => {

        console.log("Database connection failed");

        console.log(error.message);

    });


module.exports = db;