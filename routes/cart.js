var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('cart/cart', { title: '购物车'});
});




module.exports = router;