define(function(){
    $("#floor-8 div.float-left .f8-box ol li").mouseover(function(){
        $(this).siblings().removeClass("te")
        .end().addClass("te");
        $("#floor-8 div.float-left .f8-box div.display article").removeClass("te")
        .eq($(this).index()).addClass("te");
    });
});