require("dotenv").config();

const bcrypt = require("bcrypt");
const db = require("../config/database");


async function createAdmin() {

    const email = "admin@example.com";

    const password = "yourStrongPassword";


    const hashedPassword =
        await bcrypt.hash(password, 10);



    await db.query(
        `
    INSERT INTO users
    (
        username,
        email,
        password,
        role
    )

    VALUES(?,?,?,?)
    `,
        [
            "Chuong",
            email,
            hashedPassword,
            "admin"
        ]
    );


    console.log(
        "Admin created successfully"
    );


    process.exit();

}



createAdmin();