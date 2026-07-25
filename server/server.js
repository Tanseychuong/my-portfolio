require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");


// Database connection
require("./config/database");


// Create Express application
const app = express();


// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// Serve uploaded files
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


// Import routes

const projectRoute = require("./routes/projectRoute");

const blogRoute = require("./routes/blogRoute");

const commentRoute = require("./routes/commentRoute");

const contactRoute = require("./routes/contactRoute");

const analyticRoute = require("./routes/analyticRoute");


// API Routes

app.use(
    "/api/projects",
    projectRoute
);


app.use(
    "/api/blogs",
    blogRoute
);


app.use(
    "/api/comments",
    commentRoute
);


app.use(
    "/api/contact",
    contactRoute
);


app.use(
    "/api/analytics",
    analyticRoute
);



// Health check route

app.get("/", (req, res) => {

    res.json({

        message:
            "Portfolio API is running",

        status:
            "success"

    });

});



// Handle unknown routes

app.use((req, res) => {

    res.status(404).json({

        message:
            "Route not found"

    });

});



// Global error handler

app.use((error, req, res, next) => {

    console.error(error);


    res.status(500).json({

        message:
            "Internal server error"

    });

});



// Start server

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    () => {

        console.log(
            `Server running on port ${PORT}`
        );

    }
);