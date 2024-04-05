const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  numberInStock: { type: Number, default: 0 },
  url: { type: String },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
