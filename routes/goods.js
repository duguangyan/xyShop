var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('goods/goods', { title: '商品页面'});
});

router.get('/detail', function(req, res, next) {
    res.render('goods/detail', { title: '商品详情'});
});


module.exports = router;
