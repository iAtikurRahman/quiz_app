const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const authController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if the email is already registered
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      user = new User({
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await user.save();

      res.json({ message: 'Registration successful' });
    } catch (err) {
      console.error('Registration failed:', err.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the email exists in the database
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Store user session or token
      req.session.userId = user._id;

      res.json({ message: 'Login successful' });
    } catch (err) {
      console.error('Login failed:', err.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  logout: (req, res) => {
    // Clear the session or token
    req.session.destroy();

    res.json({ message: 'Logout successful' });
  },
};

module.exports = authController;
