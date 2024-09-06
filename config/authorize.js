const user = require('../models/users')

function restrictTo(roles){
    return function (req, res, next){
        if(!req.user) return res.status(400).redirect('/api/auth/login');
        if(!roles.includes(req.user.userType)) return res.status(400).end('Not Authorized');

        next();
    }
}

module.exports = restrictTo