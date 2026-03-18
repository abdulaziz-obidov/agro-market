const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
  .post(protect, authorize('buyer', 'farmer', 'admin'), createOrder)
  .get(protect, authorize('farmer', 'admin'), getOrders); 

router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/status').put(protect, authorize('farmer', 'admin'), updateOrderStatus);

module.exports = router;
