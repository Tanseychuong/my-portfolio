const express = require("express");

const router = express.Router();

const contactController =
    require("../controllers/contactController");


// Send message
router.post(
    "/",
    contactController.sendMessage
);


module.exports = router;