require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');

// Register route
router.get('/register', (req, res) => {
  res.render('users/register.html');
});

router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    await User.create({
      email: req.body.email,
      password: hashedPassword
    });

    res.redirect('/users/login');
  } catch {
    res.redirect('/users/register');
  }
});

// Login route
router.get('/login', (req, res) => {
  res.render('users/login.html');
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  try {
    if (!user) {
      return res.redirect('/users/login');
    }
  
    if (await bcrypt.compare(req.body.password, user.password)) {
      const payload = { sub: user.id }
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res.cookie('Authorization', token, { httpOnly: true });
      res.redirect('/');
    } else {
      res.redirect('/users/login');
    }
  } catch (err) {
    res.redirect('/users/login');
    console.log(err);
  }
});

module.exports = router;