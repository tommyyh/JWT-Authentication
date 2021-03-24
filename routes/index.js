const express = require('express');
const passport = require('passport');

const router = express.Router();

// Home route
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.render('index.html');
});

router.get('/e', (req, res) => {
  res.send('fe')
});

module.exports = router;