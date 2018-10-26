define(function(){
    $("#floor ul li").hover(function(){
        $(this).children("span").css({
            left:0,
            borderRadius:"5px 0 0 5px"
        }).stop().animate({
            left:(-$(this).children("span").width() + 34)
        })
        .end().click(function(){
            var str = "#floor-" + ($(this).index() + 2);
            if($(str).length != 0){
                var h = $(str).offset().top;
            }else{
                var h = 0;
            };
            $("html").stop().animate({
                scrollTop:h
            });
        });
    },function(){
        $(this).children("span").stop().animate({
            left:34
        });
    });
});