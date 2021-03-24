require('dotenv').config();

const { Sequelize } = require('sequelize');

const db = new Sequelize('jwt', process.env.DATABASE_USER, process.env.DATABASE_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false
  }
});

module.exports = db;