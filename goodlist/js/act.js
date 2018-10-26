define(function(){
    // a点击事件
    $("main .box li a").click(function(){
        var id = $(this).parents("li").find("img").attr("alt");
        cook.set("goodsID",id,{
            path:"/"
        });
    });

    class shopCount{
        constructor(){
            this.init();
        };
        init(){
            this.getCookie();
            this.add();
            this.shopCount();
        };
        getCookie(){
            var json = cook.get("goodsAdd");
            this.json = JSON.parse(json);
        };
        shopCount(){
            var str = 0;
            if(this.json){
                for(var i = 0; i < this.json.length; i ++){
                    str += this.json[i].sum * 1;
                };
            };
            if(str){
                $(".top-bar-r ul>li:first-child i").html(str);
            }else{
                $(".top-bar-r ul>li:first-child i").html(0);
            };
        };
        add(){
            var that = this;
            // 加入购物车
            $("main .box li p:last-child em").click(function(){
                var id = $(this).parents("li").find("img").attr("alt");
                if(cook.get("goodsAdd")){
                    var json = cook.get("goodsAdd");
                    var arr = JSON.parse(json);
                    var onOff = 1;
                    for(var i = 0; i < arr.length; i ++){
                        if(arr[i].goodsId == id){
                            onOff = 0;
                            arr[i].sum ++;
                        };
                    };
                    if(onOff){
                        arr.push({
                            goodsId:id,
                            sum:1
                        }); 
                    };
                    var json = JSON.stringify(arr);
                    cook.set("goodsAdd",json,{
                        path:"/"
                    });
                }else{
                    var arr = [];
                    arr.push({
                        goodsId:id,
                        sum:1
                    });
                    var json = JSON.stringify(arr);
                    cook.set("goodsAdd",json,{
                        path:"/"
                    });
                };
                that.getCookie();
                that.shopCount();
                new plusOne($(this).parent());
            });
        };
    };
    class plusOne{
        constructor(box){
            this.box = box;
            this.init();
        };
        init(){
            this.i = $("<i>+1</i>");
            this.box.prepend(this.i);
            this.move();
        };
        move(){
            var that = this;
            this.i.stop().animate({
                top:-36
            },function(){
                that.i.remove();
            });
        };
    };
    new shopCount();
});