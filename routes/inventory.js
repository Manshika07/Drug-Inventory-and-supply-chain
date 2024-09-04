const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.end('list of drugs')
})

module.exports = router