// controllers/category.js
const Category = require('../models/category')
const { uploadToCloudinary } = require('../middleware/uploadMiddleware')

exports.createCategory = async (req, res) => {
  try {
    let imageUrl
    if (req.file) imageUrl = await uploadToCloudinary(req.file)
    const category = new Category(createCategoryObject(req.body, imageUrl))
    await category.save()
    res.redirect('/categories')
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { adminPassword } = req.body
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      res.status(401).redirect(req.params.id + '/edit')
      return
    }
    let imageUrl
    if (req.file) imageUrl = await uploadToCloudinary(req.file)
    const category = await Category.findById(req.params.id)
    const newCategory = createCategoryObject(req.body, imageUrl || category.url)

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, newCategory, { new: true })
    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' })
    res.redirect('/categories')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteImage = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' })
        category.url = ''
        await category.save()
        res.status(200).json({ message: 'Image deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getEditForm = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    res.render('update-category-form', { category })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.render('categories', { title: 'Categories', categories })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getCreateForm = async (req, res) => {
  try {
    res.render('create-category-form')
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get a category by its ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id)
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createCategoryObject = (body, imageUrl) => {
  return {
    name: body.name,
    description: body.description,
    url: imageUrl
  }
}