const express = require("express");

const router = express.Router();

const contactController =
    require("../controllers/contactController");

const auth = require("../middleware/auth");


// Public: send message
router.post(
    "/",
    contactController.sendMessage
);


// Admin: view all messages
router.get(
    "/",
    auth,
    contactController.getMessages
);


// Admin: delete a message
router.delete(
    "/:id",
    auth,
    contactController.deleteMessage
);


module.exports = router;
