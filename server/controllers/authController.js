const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


exports.login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        const user = await User.findByEmail(email);


        if (!user) {

            return res.status(401).json({
                message: "Invalid credentials"
            });

        }


        const validPassword =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!validPassword) {

            return res.status(401).json({
                message: "Invalid credentials"
            });

        }


        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        res.json({

            token,

            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Login failed"
        });

    }

};