// controllers/item.js
const Item = require('../models/item')
const Category = require('../models/category')
const { uploadToCloudinary } = require('../middleware/uploadMiddleware')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

exports.createItem = async (req, res) => {
  try {
    let imageUrl
    if (req.file) imageUrl = await uploadToCloudinary(req.file)
    const newItem = new Item(createItemObject(req.body, imageUrl))
    await newItem.save()
    res.redirect('/items')
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update an item
exports.updateItem = async (req, res) => {
  try {
    const { adminPassword } = req.body
    if (adminPassword !== ADMIN_PASSWORD) {
      res.status(401).redirect(req.params.id + '/edit')
      return
    }
    let imageUrl
    if (req.file) imageUrl = await uploadToCloudinary(req.file)
    const item = await Item.findById(req.params.id)
    const newItem = createItemObject(req.body, imageUrl || item.url)

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, newItem, { new: true })
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' })
    res.redirect(`/items/${req.params.id}`)
  } catch (error) {
    // res.status(500).json({ message: error.message })
  }
}

exports.getCreateForm = async (req, res) => {
  try {
    const categories = await Category.find()
    res.render('create-item-form', { categories })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteImage = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        if (!item) return res.status(404).json({ message: 'Item not found' })
        item.url = ''
        await item.save()
        res.status(200).json({ message: 'Image deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getEditForm = async (req, res) => {
  try {
    const categories = await Category.find()
    const item = await Item.findById(req.params.id)
    res.render('update-item-form', { item, categories })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getItemsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId)
    const items = await Item.find({ category: categoryId })
    res.render('categoryItems', { items, category })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
    res.render('index', { items })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get an item by its ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }
    res.render('item', { item })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const { adminPassword } = req.body
    if (adminPassword !== ADMIN_PASSWORD) {
      return res.status(401).json({
        message: 'Unauthorized access. Please check your admin password.'
      })
    }
    const deletedItem = await Item.findByIdAndDelete(req.params.id)
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' })
    }
    res.status(200).json({ message: 'Item deleted successfully' })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error })
  }
}

const createItemObject = (body, imageUrl) => {
  return {
    name: body.name,
    description: body.description,
    category: body.category,
    price: body.price,
    numberInStock: body.numberInStock,
    url: imageUrl
  }
}