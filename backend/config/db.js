const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // SQl konsolga chiqishini oldini olish
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL bazasiga ulanish muvaffaqiyatli amalga oshirildi!');
  } catch (error) {
    console.error('Baza bilan bog\'lanishda xatolik:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
