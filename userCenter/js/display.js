define(function(){
    class display{
        constructor(){
            this.i = $("#list .box .detail p:nth-last-of-type(2) a i");
            this.span = $("#list .box .detail p:last-child span");
            this.init();
        };
        init(){
            this.getCookie();
            this.showUser();
            this.showI();
            this.spanClick();
        };
        getCookie(){
            var json = cook.get("goodsAdd");
            json = JSON.parse(json);
            this.str = 0;
            if(json){
                for(var i = 0; i < json.length; i ++){
                    this.str += json[i].sum * 1;
                };
            };
        };
        showUser(){
            var json = cook.get("userStatus");
            json = JSON.parse(json);
            $("#list .box .detail h3 i").html(json[0].userID);
        };
        showI(){
            this.i.html(`(${this.str})`);
        };
        spanClick(){
            this.span.click(function(){
                $("#display").html("注销成功，正在返回主页").show();
                setTimeout(()=>{
                    $("#top-bar .top-bar-l a:last-child").trigger("click");
                    location.href = "../index.html";
                },1000);
            });
        };
    };
    new display();
});