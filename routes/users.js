const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
    res.end('user Router')
})

module.exports = router;