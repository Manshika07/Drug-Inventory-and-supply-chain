const express = require('express')

const router = express.Router();

const {isLoggedIn} = require('../config/passportConfig')
router.get('/', isLoggedIn, (req, res) => {
    res.render('profile', {
      user: req.user});
  });
  

module.exports = router;