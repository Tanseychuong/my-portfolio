const multer = require("multer");

// Memory storage: files are held in memory as a buffer and
// uploaded to Vercel Blob storage by the controller. Vercel's
// serverless functions have no writable persistent disk, so we
// can't save files locally the way a traditional server would.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed."), false);
    }

};

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});