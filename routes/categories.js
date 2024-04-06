// routes/categories.js
const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')
const { upload } = require('../middleware/uploadMiddleware')
const { adminAuth } = require('../middleware/adminAuth')

// Define routes for CRUD operations on categories
router.post('/', upload.single('image'), categoryController.createCategory)
router.get('/', categoryController.getAllCategories)
router.get('/create', categoryController.getCreateForm)
router.get('/:id/edit', categoryController.getEditForm)
router.get('/:id', categoryController.getCategoryById)
router.put('/:id', upload.single('image'), categoryController.updateCategory)
router.delete('/:id/delete-image', adminAuth, categoryController.deleteImage)
router.delete('/:id', adminAuth, categoryController.deleteCategory)

module.exports = router