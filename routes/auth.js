const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const passport = require('passport')
const localStrategy = require("passport-local");
const bcrypt = require('bcrypt');
const { isLoggedIn } = require("../config/passportConfig");

const saltRounds = 10;

passport.use(new localStrategy(userModel.authenticate()));

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {

  const hash = bcrypt.hashSync(req.body.password, saltRounds);

  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: hash
  });
  await newUser
    .save()
    .then((user) => {
      res.redirect("/api/user");
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/login", (req, res) => {
  res.end("login page");
});



router.post('/login', passport.authenticate('local', {
  failureRedirect: '/api/auth/login',
  successRedirect: '/api/user'
}), function(req, res) {});


router.get('/profile', isLoggedIn, (req, res) => {
  res.render('signup');
});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


module.exports = router;
