// models/Patient.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Patient = sequelize.define('Patient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
  timestamps:false
});

module.exports = Patient;
