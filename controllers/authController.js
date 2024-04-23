// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/user.schema');
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d" // Set token expiry to one day
      });
  
      // Send token in the response
      return res.status(200).json({ token, message: 'Login successful' });
  
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.logout = async (req, res) => {
  try {
    // Clear user session or JWT token and redirect or respond with success message
    // Example: req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
    const { email, password, role } = req.body;
  
    try {
      // Check if email, password, and role are provided
      if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email, password, and role are required' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ email, password: hashedPassword, role });
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
