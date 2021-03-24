require('dotenv').config();

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');
const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: cookieExtractor = function(req) {
    let token;

    if (req && req.cookies) {
      token = req.cookies['Authorization'];
    }
    
    return token;
  }
}

// Jwt
const jwtStrategy = (passport) => {
  passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    const user = await User.findOne({ where: { id: jwt_payload.sub } });

    try {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }));
}

module.exports = jwtStrategy;