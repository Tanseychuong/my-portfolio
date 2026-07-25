const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

const {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

router.get("/", getProjects);

router.post(
    "/",
    auth,
    upload.single("image"),
    createProject
);

router.put(
    "/:id",
    auth,
    upload.single("image"),
    updateProject
);

router.delete(
    "/:id",
    auth,
    deleteProject
);

module.exports = router;