const express = require('express')
const router = express.Router()

const { getAllProducts, getFilteredProducts } = require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/:id').get(getFilteredProducts)


module.exports = router