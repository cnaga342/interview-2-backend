// models/User.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const User = sequelize.define('users', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
    timestamps:false
});

module.exports = User;
