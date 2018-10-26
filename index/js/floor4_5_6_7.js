define(function(){
    // 右侧列表
    $(".title2 .box aside.float-right ul li").mouseover(function(){
        $(this).siblings().removeClass("te")
        .end().addClass("te");
    });

    class tabBook{
        constructor(str){
            this.selectTab = str[0];
            this.selectArticle = str[1];
            this.init();
        };
        init(){
            var that = this;
            if($(that.selectArticle).parent().children("div.more").length != 0){
                $(that.selectArticle).parent().hover(function(){
                    $(this).children("div.more").css({
                        display:"block"
                    })
                },function(){
                    $(this).children("div.more").css({
                        display:"none"
                    })
                });
            };

            $(this.selectTab).mouseover(function(){
                $(this).children("a").addClass("display")
                .end().siblings().children("a").removeClass("display");
                $(that.selectArticle).eq($(this).index()).siblings().removeClass("te")
                .end().addClass("te");
            });
        };
    };
    
    return tabBook;
})