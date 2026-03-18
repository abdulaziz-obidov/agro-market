const { User } = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { email, password, role, phone } = req.body;
    const full_name = req.body.name || req.body.full_name;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      res.status(400);
      throw new Error('Elektron pochta manzili band qilingan!');
    }

    const user = await User.create({
      full_name,
      email,
      password,
      role: role || 'buyer',
      phone
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.full_name,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error('Foydalanuvchi yaratishda xatolik yuz berdi');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user.id,
        name: user.full_name,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401);
      throw new Error('Elektron pochta yoki parol noto\'g\'ri');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('Foydalanuvchi topilmadi');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
