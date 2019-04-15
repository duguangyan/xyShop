var express = require('express');
var router = express.Router();
var request = require('request');
var crypto = require('crypto');
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



router.get('/wx', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天

    let nowUrl = req.url;

    var createNonceStr = function () {
        return Math.random().toString(36).substr(2, 15);
    };
    var createTimestamp = function () {
        return parseInt(new Date().getTime() / 1000) + '';
    };
    var raw = function (args) {
        var keys = Object.keys(args);
        keys = keys.sort();
        var newArgs = {};
        keys.forEach(function (key) {
            newArgs[key.toLowerCase()] = args[key];
        });
        var string = '';
        for (var k in newArgs) {
            string += '&' + k + '=' + newArgs[k];
        }
        string = string.substr(1);
        return string;
    };
    /**
     *@synopsis 签名算法
     *
     * @param jsapi_ticket 用于签名的 jsapi_ticket
     * @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
     *
     * @returns
     */
    var sign = function (jsapi_ticket, url) {
        var ret = {
            jsapi_ticket: jsapi_ticket,
            nonceStr: createNonceStr(),
            timestamp: createTimestamp(),
            url: url
        };
        var string = raw(ret);
        jsSHA = require('jssha');
        shaObj = new jsSHA(string, 'TEXT');
        ret.signature = shaObj.getHash('SHA-1', 'HEX');
        return ret;
    };



    //获取accessToken
    request(
        "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf7a4c10a689f5ad1&secret=5a1783bb805369d7cfe8786f35b48d24",
        function(error, response, body) {

            let access_token = JSON.parse(body).access_token;
            // return res.end(JSON.parse(body).access_token);
            request(
                "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+access_token+"&type=jsapi",
                function(error, response, body) {
                    let ticket =  JSON.parse(body).ticket;
                    return res.send(getSignature(nowUrl,ticket));
                }
            );

        }
    );

    // 生成签名函数
    const getSignature = function(nowUrl, key) {
        let noncestr = Math.random()
            .toString(36)
            .substr(2); // 随机字符串
        let timestamp = createTimestamp(); // 获取时间戳，数值类型
        let jsapi_ticket = `jsapi_ticket=${key}&noncestr=${noncestr}&timestamp=${timestamp}&url=http://www.yidap.com`;
        // console.log(jsapi_ticket)
        jsapi_ticket = getSha1(jsapi_ticket);
        return {
            appId:"wxf7a4c10a689f5ad1",
            noncestr: noncestr,
            timestamp: timestamp,
            signature: jsapi_ticket
        };
    };

    /**
     * @sha1加密模块 (加密固定,不可逆)
     * @param str string 要加密的字符串
     * @retrun string 加密后的字符串
     * */
    const getSha1 = function(str) {
        var sha1 = crypto.createHash("sha1"); //定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
        sha1.update(str);
        var res = sha1.digest("hex"); //加密后的值d
        return res;
    };




});

module.exports = router;
