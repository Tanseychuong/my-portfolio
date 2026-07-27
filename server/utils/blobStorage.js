const { put, del } = require("@vercel/blob");


/**
 * Uploads an in-memory file buffer (from multer memoryStorage)
 * to Vercel Blob storage and returns the public URL.
 * This is a new util folder added to support the uploads and database connection
 *
 * @param {Express.Multer.File} file
 * @param {string} folder - a prefix like "projects" or "blogs"
 * @returns {Promise<string>} the public URL of the uploaded file
 */
async function uploadImage(file, folder) {

    const uniqueName =
        `${folder}/${Date.now()}-${file.originalname}`;

    const blob = await put(
        uniqueName,
        file.buffer,
        {
            access: "public",
            contentType: file.mimetype,
            addRandomSuffix: true
        }
    );

    return blob.url;

}


/**
 * Deletes a previously-uploaded image from Vercel Blob storage.
 * Safe to call with any URL; only actual Blob URLs get deleted.
 *
 * @param {string} url
 */
async function deleteImage(url) {

    if (!url) return;

    try {

        await del(url);

    } catch (error) {

        // Don't fail the request just because cleanup failed
        console.error("Failed to delete blob:", error.message);

    }

}


module.exports = {
    uploadImage,
    deleteImage
};