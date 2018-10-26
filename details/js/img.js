define(function(){
    $("#list .box .img>p").hover(function(){
        $("#list .box .img>p span").show();
        $("#list .box .img .img-box").show();
        $("#list .box .img>p").mousemove(function(e){
            // 图片内小框
            var [w,h] = [$("#list .box .img>p span").width(),$("#list .box .img>p span").height()]
            var [left,top] = [e.offsetX,e.offsetY];
            var [l,t] = [left - w/2,top - h/2];
            if(l < 0){
                l = 0;
            }else if(l > $(this).width() - w){
                l = $(this).width() - w;
            };
            if(t < 0){
                t = 0;
            }else if(t > $(this).height() - h){
                t = $(this).height() - h;
            };
            $("#list .box .img>p span").css({
                left:l,
                top:t
            })
            // 放大图
            var [boxW,boxH] = [$("#list .box .img .img-box").width(),$("#list .box .img .img-box").height()];
            var [imgW,imgH] = [$("#list .box .img .img-box p").width(),$("#list .box .img .img-box p").height()];
            var [scaleX,scaleY] = [(imgW - boxW) / ($(this).width() - w),(imgH - boxH) / ($(this).height() - h)];
            var [boxL,boxT] = [l * scaleX,t * scaleY];
            $("#list .box .img .img-box p").css({
                left:-boxL,
                top:-boxT
            })
        })
    },function(){
        $("#list .box .img>p span").hide();
        $("#list .box .img .img-box").hide();
    });

    // 免邮政策
    $("#list .box .show p:last-of-type span").hover(function(){
        $("#list .box .show>u").css("display","block");
    },function(){
        $("#list .box .show>u").hide();
    })

    // 列表
    $(".hot ul li").mouseover(function(){
        $(this).siblings().removeClass("te")
        .end().addClass("te");
    });

    $(".hot ul li").click(function(){
        var id = $(this).find("img").attr("alt");
        cook.set("goodsID",id,{
            path:"/"
        });
    });

    // 显示数量
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
    // 加入购物车
    $("#list .box .show p:last-of-type em").click(function(){
        var id = $("#list .box .img>p img").attr("alt");
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
        shopCount();
        new plusOne();
    });

    class plusOne{
        constructor(){
            this.box = $("#list .box .show p:last-of-type");
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
                top:-50
            },function(){
                that.i.remove();
            });
        };
    };
});