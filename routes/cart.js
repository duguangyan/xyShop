var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('cart/cart', { title: '购物车'});
});

router.get('/pay', function(req, res, next) {
    res.render('cart/cart-pay', { title: '支付'});
});



module.exports = router;
