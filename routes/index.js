var express = require('express')
var router = express.Router()
const itemRoutes = require('./items')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/items')
})

// Mount item routes
router.use('/items', itemRoutes)

module.exports = router