$(function () {
    /**
     * 首页轮播图
     * @type {Swiper}
     */
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 切换选项
        autoplay: true,
        loop: true, // 循环模式选项
        delay: 5000,//5秒切换一次

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable :true,
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })

    /**
     * 登陆页面
     */
    $(".login-in").click(function () {
        window.location.href = "/";
    })

    /**
     * 注册页面
     */
    $('.login-register').click(function () {
        window.location.href = '/users/register-finish';
    })

})