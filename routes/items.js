// routes/items.js
const express = require('express')
const router = express.Router()
const itemController = require('../controllers/item')
const { upload } = require('../middleware/uploadMiddleware')
const { adminAuth } = require('../middleware/adminAuth')

// Define routes for CRUD operations on items
router.post('/', upload.single('image'), itemController.createItem)
router.get('/', itemController.getAllItems)
router.get('/create', itemController.getCreateForm)
router.get('/:id/edit', itemController.getEditForm)
router.get('/category/:id', itemController.getItemsByCategory)
router.get('/:id', itemController.getItemById)
router.put('/:id', upload.single('image'), itemController.updateItem)
router.delete('/:id', adminAuth, itemController.deleteItem)
router.delete('/:id/delete-image', adminAuth, itemController.deleteImage)

module.exports = router