const { Product } = require('../models/Product');
const { User } = require('../models/User');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{ model: User, as: 'farmer', attributes: ['id', 'full_name', 'email', 'phone'] }]
    });
    res.json({ products });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { title, desc, price, quantity, category, unit, imageUrl } = req.body;

    const product = await Product.create({
      title, desc, price, quantity, category, unit, imageUrl,
      farmer_id: req.user.id
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: User, as: 'farmer', attributes: ['full_name', 'phone'] }]
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Mahsulot topilmadi');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, createProduct, getProductById };
