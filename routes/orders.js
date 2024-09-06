const express = require('express')

const router = express.Router();

const drugModel = require('../models/inventory')

router.get('/', async (req, res) => {
    const drugs = await drugModel.find();
    res.render('order', {
        user : req.user,
        drugs : drugs
    });
})

module.exports = router;