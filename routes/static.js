const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {

    res.render("homepage", {
        user : req.user});
});


router.get('/track',(req,res)=>{
    res.render("index")
})

router.get('/about', (req, res) => {
    res.render("about", { user : req.user});
})

router.get('/feedback', (req, res) => {
    res.render("feedback", {
        user: req.user
    });
})
router.get('/checkin', (req, res) => {
    res.render("checkin");
})

module.exports = router;