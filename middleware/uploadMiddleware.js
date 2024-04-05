// services/uploadMiddleware.js
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files are allowed!'), false)
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter
})

async function uploadToCloudinary(file) {
    if (!file) return null

    try {
        const result = await cloudinary.uploader.upload(file.path, {
            width: 300, height: 300, crop: 'fill', gravity: 'auto'
        })

        fs.unlinkSync(file.path)

        return result.secure_url
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error)
        return null
    }
}

module.exports = { upload, uploadToCloudinary }