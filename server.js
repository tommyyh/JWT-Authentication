const express = require('express');
const ejs = require('ejs');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const app = express();

// Jwt
const jwtStrategy = require('./config/passport');
jwtStrategy(passport);

// Ejs
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

// Parse data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/', require('./routes/index')); // Home route
app.use('/users', require('./routes/users')); // Users route

// Port
app.listen(3000);