require("dotenv").config();

const bcrypt = require("bcrypt");
const db = require("../config/database");

async function resetPassword() {
    const email = "admin@example.com";
    const newPassword = "MyPortfolio2026!";

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
        "UPDATE users SET password = ? WHERE email = ?",
        [hashedPassword, email]
    );

    console.log("Password updated successfully.");

    process.exit();
}

resetPassword();