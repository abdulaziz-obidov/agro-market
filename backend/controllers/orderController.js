const { Order } = require('../models/Order');
const { User } = require('../models/User');

const createOrder = async (req, res, next) => {
  try {
    const { items, total_price } = req.body;

    if (!items || items.length === 0) {
      res.status(400);
      throw new Error("Savat bo'sh, buyurtma yaratib bo'lmaydi");
    }

    const order = await Order.create({
      items,
      total_price,
      buyer_id: req.user.id,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { buyer_id: req.user.id }
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User, as: 'buyer', attributes: ['full_name', 'phone'] }]
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      if (req.body.cancel_reason) {
        order.cancel_reason = req.body.cancel_reason;
      }
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Buyurtma xatoligi: topilmadi');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getMyOrders, getOrders, updateOrderStatus };
