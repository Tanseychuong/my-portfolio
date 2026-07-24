const express = require("express");

const router = express.Router();

const analyticController =
    require("../controllers/analyticController");

const auth =
    require("../middleware/auth");


// Track visitor
router.post(
    "/track",
    analyticController.trackVisitor
);


// Dashboard analytics
router.get(
    "/stats",
    auth,
    analyticController.dashboardStats
);


module.exports = router;