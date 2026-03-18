const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { User } = require('./User');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  items: {
    type: DataTypes.JSONB, // Mahsulotlar ID si va miqdori saqlanadi
    allowNull: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
  cancel_reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: true,
});

Order.belongsTo(User, { as: 'buyer', foreignKey: 'buyer_id' });
User.hasMany(Order, { foreignKey: 'buyer_id' });

module.exports = { Order };
