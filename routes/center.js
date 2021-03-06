var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('center/center', { title: '个人中心订单列表'});
});
router.get('/evaluate', function(req, res, next) {
    res.render('center/center-evaluate', { title: '个人中心评价管理'});
});
router.get('/evaluate-list', function(req, res, next) {
    res.render('center/center-evaluate-list', { title: '个人中心评价列表'});
});
router.get('/invoice', function(req, res, next) {
    res.render('center/center-invoice', { title: '个人中心发票信息'});
});
router.get('/security', function(req, res, next) {
    res.render('center/center-security', { title: '个人中心安全信息'});
});
router.get('/userinfo', function(req, res, next) {
    res.render('center/center-userinfo', { title: '个人中心用户信息'});
});
router.get('/stock', function(req, res, next) {
    res.render('center/center-stock', { title: '个人中心我的库存'});
});
router.get('/coupon', function(req, res, next) {
    res.render('center/center-coupon', { title: '个人中心我的优惠券'});
});
router.get('/address', function(req, res, next) {
    res.render('center/center-address', { title: '个人中心地址管理'});
});
router.get('/collection', function(req, res, next) {
    res.render('center/center-collection', { title: '个人中心商品收藏'});
});
router.get('/regoods', function(req, res, next) {
    res.render('center/center-regoods', { title: '个人中心退换货'});
});

module.exports = router;
