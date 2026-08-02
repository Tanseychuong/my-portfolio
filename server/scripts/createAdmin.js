require("dotenv").config();

const bcrypt = require("bcrypt");
const db = require("../config/database");


async function createAdmin() {

    const username = "chuong16"
    const email = "nyang16@outlook.com";

    const password = "H@ck_@2028";


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
            username,
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