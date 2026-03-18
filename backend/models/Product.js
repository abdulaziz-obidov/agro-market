const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { User } = require('./User'); 

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    defaultValue: 'kg'
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: true,
});

// Relationships
Product.belongsTo(User, { as: 'farmer', foreignKey: 'farmer_id' });
User.hasMany(Product, { foreignKey: 'farmer_id' });

module.exports = { Product };
