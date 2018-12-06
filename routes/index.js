var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {

    // request('http://lv.du-u.top/', function (error, response, body) {
    //     console.log('error:', error); // Print the error if one occurred
    //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     console.log('body:', body); // Print the HTML for the Google homepage.
    //     var data = JSON.parse(body);
    //
    // });
    res.render('index/index', { title: '首页'});
});



module.exports = router;
