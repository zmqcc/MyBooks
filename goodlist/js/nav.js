define(function(){
    $("#book-nav .book-class").hover(function(){
        $("#floor-1").show().hover(function(){
            $(this).show();
        },function(){
            $(this).hide();
        });
    },function(){
        $("#floor-1").hide();
    });
});