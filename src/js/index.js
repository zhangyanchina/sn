$(function () {
   // 轮播图
   //  获取元素
   //  图片ul：
    var imgUl = $('.sn_banner>ul:first');
    // 轮播图宽度：
    var width = $('.sn_banner').width();
    // 点：
    var lis = $('.sn_banner>ul:last').find('li');
    
    var index=1;

    var moveFun = function () {
        imgUl.animate({
            'transform':'translateX('+ (-index)*width+'px)'
        },200,'linear',function () {
            if(index>=9){
                index=1;
                imgUl.css({
                    'transform':'translateX('+ (-index)*width+'px)'
                });
            }else if(index<=0){
                index=8;
                imgUl.css({
                    'transform':'translateX('+ (-index)*width+'px)'
                });
            }
            // console.log(index-1);
            lis.removeClass('now').eq(index-1).addClass('now');
        });
    };

    var timeId = setInterval(function () { 
        index++;
        moveFun();


    },3000);

    // 触摸：
    imgUl.on('swipeRight',function () {
        index--;
        moveFun();
    }).on('swipeLeft',function () {
       index++;
       moveFun();
    });
    
    
    
});