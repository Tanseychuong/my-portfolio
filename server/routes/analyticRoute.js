const express = require("express");

const router = express.Router();


const {
    getAnalytics,
    trackVisitor
} = require("../controllers/analyticController");


// Save visitor activity
router.post(
    "/track",
    trackVisitor
);


// Dashboard analytics
router.get(
    "/",
    getAnalytics
);


module.exports = router;

// End of the code