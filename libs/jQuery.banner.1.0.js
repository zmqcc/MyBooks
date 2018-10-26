/*
    jQuery.banner

    version 1.5 (2018/07/05)

    author: Chris Lee
*/

;(function($){
    "use strict";
    $.fn.banner = function(options){
        var direction = options.direction == "col" ? "col" : "row";     //默认横向运动
        var ind = options.index == 1 || options.index == -1 ? options.index : 1;        //默认从右向左或从下向上运动
        var autoPlay = options.autoPlay != undefined ? options.autoPlay : true;     //默认自动轮播
        var delay = options.delay || 3000;          //默认持续时间3000
        var moveTime = options.moveTime || 300;     //默认运动时间300

        if(direction == "row"){         //横向初始位置
            options.items.css({
                left:options.items.eq(0).width() * ind
            }).eq(0).css({
                left:0
            });
        }else{                          //纵向初始位置
            options.items.css({
                top:options.items.eq(0).height() * ind
            }).eq(0).css({
                top:0
            });
        }

        this.LACALINFO = {
            iPlay:0,        //将要展示的
            iMove:0         //将要移动的
        };
        var that = this;

        if(options.list != undefined){              //当下部小标存在时
            options.list.children().on("click",function(){      //小标点击事件
                that.LACALINFO.iPlay = $(this).index();         //将要展示点击小标所在索引的图片
                if(that.LACALINFO.iMove < $(this).index()){     //如果小标大于将要移动的图片
                    that.move(ind);       //44行
                }else if(that.LACALINFO.iMove > $(this).index()){   //如果小标小于将要移动的图片
                    that.move(-ind);
                };
                that.changeList();      //58行
            });
        };
        
        if(options.prev != undefined && options.next != undefined){     //左右按钮存在时
            options.next.on("click",function(){             //右按钮事件
                that.justPlay(1)        //63行
                that.move(ind);
                if(options.list != undefined){              //如果存在下部小标
                    that.changeList();
                };
            });
            
            options.prev.on("click",function(){             //左按钮事件
                that.justPlay(-1)
                that.move(-ind);
                if(options.list != undefined){
                    that.changeList();
                };
            });
        };

        this.move = function(i){        //图片运动函数，接受1则向索引变大运动，接受-1则索引变小运动
            if(direction == "row"){     //横向运动
                //以下是将要移动图片运动
                options.items.eq(this.LACALINFO.iMove).stop().css({
                    left:0
                }).animate({
                    left:-options.items.eq(this.LACALINFO.iMove).width() * i
                },moveTime)
                //以下是将要展示图片运动
                .end().eq(this.LACALINFO.iPlay).stop().css({
                    left:options.items.eq(this.LACALINFO.iMove).width() * i
                }).animate({
                    left:0
                },moveTime);
                this.LACALINFO.iMove = this.LACALINFO.iPlay;
            }else{                      //纵向运动
                //以下是将要移动图片运动
                options.items.eq(this.LACALINFO.iMove).stop().css({
                    top:0
                }).animate({
                    top:-options.items.eq(this.LACALINFO.iMove).height() * i
                },moveTime)
                //以下是将要展示图片运动
                .end().eq(this.LACALINFO.iPlay).stop().css({
                    top:options.items.eq(this.LACALINFO.iMove).height() * i
                }).animate({
                    top:0
                },moveTime);
                this.LACALINFO.iMove = this.LACALINFO.iPlay;
            };
        };

        this.changeList = function(){       //改变下部小标函数
            options.list.children().eq(this.LACALINFO.iPlay).addClass("active")
            .siblings().removeClass("active");
        };
        
        this.justPlay = function(a){        //判断索引函数，接受1则为右按钮，接受-1则为左按钮
            if(a == 1){
                if(that.LACALINFO.iPlay == options.items.length -1){
                    that.LACALINFO.iPlay = 0;       //当前展示页已是最后一张，则索引变为0
                }else{
                    that.LACALINFO.iPlay ++;
                };
            }else if(a == -1){
                if(that.LACALINFO.iPlay == 0){
                    that.LACALINFO.iPlay = options.items.length -1;     //当前展示页已是0，则索引变为最后一张
                }else{
                    that.LACALINFO.iPlay --;
                };
            };
        };

        this.autoMove = function(){         //自动运动函数
            that.justPlay(1);
            that.move(ind);
            if(options.list != undefined){
                that.changeList();
            };
        };

        if(autoPlay){           //是否自动运动
            //自动轮播时按钮隐藏
            if(options.prev != undefined && options.next != undefined){
                options.next.hide();
                options.prev.hide();
            };
            this.timer = setInterval(this.autoMove,delay);
            this.hover(function(){
                clearInterval(that.timer);
                // 鼠标滑入按钮显示
                if(options.prev != undefined && options.next != undefined){
                    options.next.show();
                    options.prev.show();
                };
            },function(){
                that.timer = setInterval(that.autoMove,delay);
                // 鼠标滑出按钮隐藏
                if(options.prev != undefined && options.next != undefined){
                    options.next.hide();
                    options.prev.hide();
                };
            });
        };
        
        return $(this);
    };
})(jQuery);