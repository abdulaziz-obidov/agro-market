const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getProductById } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
  .get(getProducts)
  .post(protect, authorize('farmer', 'admin'), createProduct);

router.route('/:id').get(getProductById);

module.exports = router;
