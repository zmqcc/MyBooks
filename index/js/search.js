define(function(){
    // 模拟搜索框placeholder效果
    var defaultValue = $("#search .search .search-bar input[type='text']").val();
    $("#search .search .search-bar input[type='text']").on("focus",function(){
        if($(this).val() == defaultValue){
            $(this).val("");
        };
    }).on("blur",function(){
        if($(this).val() == ""){
            $(this).val(defaultValue);
        }
    });

    $("#search .search .search-bar span").hover(function(){
        // 滑过span显示下拉框
        $("#search .search .search-bar ol").show().hover(function(){
            // 滑过下拉框显示
            $(this).show().children("li").hover(function(){
                // 滑过li显示样式
                $(this).siblings().css({
                    background: "",
                    color: ""
                })
                .end().css({
                    background: "#f5f5f5",
                    color: "#e00"
                });
                $(this).click(function(){
                    // 点击li切换内容
                    $("#search .search .search-bar span").html($(this).html())
                    // 点击li切换class
                    $(this).siblings().removeClass("on")
                    .end().addClass("on")
                    // 点击li隐藏ol
                    $("#search .search .search-bar ol").hide()
                })
            },function(){
                $(this).css({
                    background: "",
                    color: ""
                });
            });
        },function(){
            // 离开下拉框隐藏
            $(this).hide();
        });
    },function(){
        // 离开span隐藏下拉框
        $("#search .search .search-bar ol").hide();
    });

    // 信息板滚动
    $(".info-box").banner({
        items:$(".info-box div"),
        direction:"col"
    });
})