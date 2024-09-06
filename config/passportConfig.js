const passport = require("passport");
const User = require("../models/users");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const initializingPassport = (passport) => {
  passport.use(
    new localStrategy({
      usernameField: "email",
      passwordField: "password"
    }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false);

        return done(null, user);
      } catch (e) {
        return done(e, false);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findById(id);
        done(null, user);
    }catch(error) {
        done(error, false)
    }
  })
};


function isLoggedIn(req, res, next) {
  if (req.user) return next();
  res.redirect("/api/auth/login");
}

module.exports = {
  initializingPassport,
  isLoggedIn
};
