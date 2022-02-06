var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/',async function (req, res, next) {
    
    res.render('home', { layout: 'layouts/full-page'});
});


module.exports = router;