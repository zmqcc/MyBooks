define(function(){
    // 分类框
    $("#floor-1 .book-class ul li").hover(function(){
        if($(this).index() != $("#floor-1 .book-class ul li").length - 1){
            $(this).addClass("te");
            // 二级菜单添加class和鼠标事件
            $("#floor-1 .second ul").eq($(this).index()).addClass("te").hover(function(){
                $(this).addClass("te");
                $("#floor-1 .book-class ul li").eq($(this).index()).addClass("te");
            },function(){
                $(this).removeClass("te");
                $("#floor-1 .book-class ul li").eq($(this).index()).removeClass("te");
            });
        };
    },function(){
        $(this).removeClass("te");
        $("#floor-1 .second ul").eq($(this).index()).removeClass("te");
    })

    // banner轮播
    $(".banner").banner({
        items:$(".banner a"),
        prev:$(".banner #prev"),
        next:$(".banner #next"),
        list:$(".banner .list"),
        delay:4000
    });

    // 新书展示
    $("#floor-1 .top .summary .new-book .new-book-box .box-t span").mouseover(function(){
        $(this).siblings().removeClass("te")
        .end().addClass("te");
        $("#floor-1 .top .summary .new-book .new-book-box article").eq($(this).index()).siblings().removeClass("te")
        .end().addClass("te");
    });

    // 选项卡
    $("#floor-1 .top .summary .new-book .hot h5 b").mouseover(function(){
        $(this).siblings().removeClass("te")
        .end().addClass("te");
        $("#floor-1 .top .summary .new-book .hot article").eq($(this).index()).siblings().removeClass("te")
        .end().addClass("te");
    });
    // 列表
    $("#floor-1 .top .summary .new-book .hot ul li").mouseover(function(){
        $(this).siblings().removeClass("te")
        .end().addClass("te");
    });
});