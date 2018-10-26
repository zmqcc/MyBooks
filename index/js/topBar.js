define(function(){
    $(".top-bar-r ul>li").hover(function(){
        if($(this).index() == 2 || $(this).index() == 4){
            $(this).siblings().removeClass("te")
            .end().addClass("te")
        }
    },function(){
        $(this).removeClass("te")
    });
    // cookie获取
    function shopCount(){
        var json = cook.get("goodsAdd");
        json = JSON.parse(json);
        var str = 0;
        if(json){
            for(var i = 0; i < json.length; i ++){
                str += json[i].sum * 1;
            };
        };
        if(str){
            $(".top-bar-r ul>li:first-child i").html(str);
        }else{
            $(".top-bar-r ul>li:first-child i").html(0);
        };
    };
    shopCount();
    function Status(){
        // 保存注册登录地址
        var ele = $("#top-bar .top-bar-l b");
        var url1 = ele.next().attr("href");
        var url2 = ele.next().nextAll("a").attr("href");
        // 账户未登录则跳转登录地址
        $(".top-bar-r ul>li:nth-child(3) a").attr("href",url1);
        var json = cook.get("userStatus");
        json = JSON.parse(json);
        // 登录状态则头部显示登录用户名
        if(json){
            if(location.pathname == "/MyBooks/index.html"){
                userUrl = "userCenter/userCenter.html";
            }else{
                userUrl = "../userCenter/userCenter.html";
            };
            $(".top-bar-r ul>li:nth-child(3) a").attr("href",userUrl);
            ele.html("欢迎光临我的图书网&nbsp;尊敬的会员").next().html(json[0].userID).attr("href",userUrl).nextAll("a").html("注销").removeAttr("href").click(function(){
                if(location.pathname == "/MyBooks/userCenter/userCenter.html"){
                    $("#display").html("注销成功，正在返回主页").show();
                    setTimeout(()=>{
                        location.href = "../index.html";
                    },1000);
                };
                // 点击注销则还原状态
                $(".top-bar-r ul>li:nth-child(3) a").attr("href",url1);
                cook.del("userStatus");
                $(this).html("注册").prevAll("a").html("登录").attr("href",url1).prev().html("欢迎光临我的图书网&nbsp;请");
                var that = this;
                setTimeout(()=>{
                    $(that).attr("href",url2);
                },100);
            });
        };
    };
    Status();
});