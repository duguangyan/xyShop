var express = require('express');
var router = express.Router();
var request = require('request');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    res.render('users/login', { title: '登录'});
});


router.get('/register', function(req, res, next) {
    res.render('users/register', { title: '注册'});
});

router.get('/register-finish', function(req, res, next) {
    res.render('users/register-finish', { title: '注册完成'});
});
router.get('/repair-password', function(req, res, next) {
    res.render('users/repair-password', { title: '修改密码'});
});
router.get('/repair-finsh', function(req, res, next) {
    res.render('users/repair-finsh', { title: '修改密码'});
});
router.get('/repair-email', function(req, res, next) {
    res.render('users/repair-email', { title: '修改密码'});
});

// QQ登录
// router.get('/qqLogin', function(req, res, next) {
//     request('http://lv.du-u.top/', function (error, response, body) {
//         console.log('error:', error); // Print the error if one occurred
//         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//         console.log('body:', body); // Print the HTML for the Google homepage.
//         var data = JSON.parse(body);
//
//     });
// });














// QQ登录
var qqAppID = '101538056';
var qqAppkey = 'c17b8b9734052b73032eb3a6091b8200';
var qqRedirect_uri = 'http://nd.du-u.top/users/qq/login';
router.get('/qqLogin', function (req, res, next) {
    var authorization = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id='+qqAppID+'&redirect_uri='+qqRedirect_uri+'&state=233&scope=get_user_info,get_vip_info,get_vip_rich_info';
    res.redirect(authorization);
});
router.get('/qq/login', function (req, res, next) {
    //拿到code
    var code = req.query.code;
    //获取token
    var getTokenUrl = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id='+qqAppID+'&client_secret='+qqAppkey+'&code='+code+'&redirect_uri='+qqRedirect_uri;
    // res.send(getTokenUrl);
    request.get({url:getTokenUrl},function (err, httpResponse, body) {
        var str = body;
        var access_token = str.split('=')[1].split('&')[0];
        //获取用户openid
        var getMeUrl = 'https://graph.qq.com/oauth2.0/me?access_token=' + access_token;
        request.get({url:getMeUrl}, function (err, httpResponse, body) {
            //QQ返回的是字符串，不是json，也不能直接转json，日了狗
            var str = body;
            var jsonStr = str.replace('callback( ','');
            jsonStr = jsonStr.replace(' );','');
            jsonStr = JSON.parse(jsonStr);
            var qqOpenid = jsonStr['openid'];
            var qqClient_id = jsonStr['client_id'];
            //拿到两个参数以后去获取用户资料
            request.get({url:'https://graph.qq.com/user/get_user_info?access_token='+ urlencode(access_token) +'&oauth_consumer_key='+ urlencode(qqAppID) + '&openid=' + urlencode(qqOpenid)}, function (err, httpResponse, body) {
                body = JSON.parse(body);
                res.send("\
                    <h1>QQ昵称："+ body.nickname +"openid:"+ qqOpenid +"</h1>\
                    <p>![]("+body.figureurl_qq_1+")</p>\
                    <p>性别："+ body.gender+"</p>\
                    <p>地区："+body.province +","+ body.city+"</p>\
                ");
            })
        })
    })

});


// 微信登录
/* 微信授权登录参数  这个不可以复制 */
var AppID = '微信公众号APPID（测试、正式号都可以）';
var AppSecret = 'appsecret';

router.get('/wechat_login', function(req,res, next){
    // 第一步：用户同意授权，获取code
    var router = 'get_wx_access_token';
    // 这是编码后的地址
    var return_uri = 'http%3A%2F%2Fwww.yhorizon.com%2F'+router;
    var scope = 'snsapi_userinfo';
    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+return_uri+'&response_type=code&scope='+scope+'&state=STATE#wechat_redirect');

});

router.get('/get_wx_access_token', function(req,res, next) {
    // 第二步：通过code换取网页授权access_token
    var code = req.query.code;
    request.get(
        {
            url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + AppID + '&secret=' + AppSecret + '&code=' + code + '&grant_type=authorization_code',
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                //console.log(JSON.parse(body));
                var data = JSON.parse(body);
                var access_token = data.access_token;
                var openid = data.openid;
                request.get(
                    {
                        url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN',
                    },
                    function (error, response, body) {
                        if (response.statusCode == 200) {
                            // 第四步：根据获取的用户信息进行对应操作
                            var userinfo = JSON.parse(body);
                            console.log('获取微信信息成功！');
                            //其实，到这就写完了，你应该拿到微信信息以后去干该干的事情，比如对比数据库该用户有没有关联过你们的数据库，如果没有就让用户关联....等等等...
                            // 小测试，实际应用中，可以由此创建一个帐户
                            res.send("\
                                <h1>" + userinfo.nickname + " 的个人信息</h1>\
                                <p><img src='" + userinfo.headimgurl + "' /></p>\
                                <p>" + userinfo.city + "，" + userinfo.province + "，" + userinfo.country + "</p>\
                                <p>openid: " + userinfo.openid + "</p>\
                            ");
                        } else {
                            console.log(response.statusCode);
                        }
                    }
                );
            } else {
                console.log(response.statusCode);
            }
        }
    );
})
module.exports = router;
