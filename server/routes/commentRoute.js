const express = require("express");

const router = express.Router();


const {
    getComments,
    createComment
} = require("../controllers/commentController");



router.get(
    "/:blogId",
    getComments
);


router.post(
    "/",
    createComment
);



module.exports = router;

//End of the code