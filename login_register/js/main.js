// 针对一个个单按
$("p.pos input").keyup(function(){
    if($(this).val() != ""){
        $("p.pos del").eq($(this).parent().index()).show();
    }else{
        $("p.pos del").eq($(this).parent().index()).hide();
    };
});
// 获得交点
$("p.pos input").focus(function(){
    $("p.pos u").eq($(this).parent().index()).show();
});

// 点击小X清空
$("p.pos del").click(function(){
    $(this).siblings("input").val("").trigger("keyup")
    .end().hide()
    .siblings("u").hide();
});

// 四位验证码
function randomCode(a,b){
    return Math.round(Math.random() * (a - b) + b);
};
function justify(){
    var code = "";
    for(var i = 0; i < 4; i ++){
        var ascii;
        switch(randomCode(0,2)){
            case 0: ascii = randomCode(48,57); break;
            case 1: ascii = randomCode(65,90); break;
            case 2: ascii = randomCode(97,122); break;
        };
        code += String.fromCharCode(ascii);
    };
    $("main>div p.justify b").html(code);
    return code;
};
// 页面加载显示验证码
var code = justify();

// 点击验证码或换一换更换验证码
$("main>div p.justify").children("b,s").click(function(){
    code = justify();
    code = "^" + code + "$";
    just = new RegExp(code,"i");
    if(just.test($(this).val())){
        $("p.pos u").eq($(this).parent().index()).html("验证码正确").css({
            color: "green"
        });
        justOn = true;
    }else{
        $("p.pos u").eq($(this).parent().index()).html("不区分大小写，验证码不正确").css({
            color: ""
        });
        justOn = false;
    };
});

// 验证输入的验证码
code = "^" + code + "$";
var just = new RegExp(code,"i");
var justOn;

$("p.justify input").keyup(function(){
    if(just.test($(this).val())){
        $("p.pos u").eq($(this).parent().index()).html("验证码正确").css({
            color: "green"
        });
        justOn = true;
    }else{
        $("p.pos u").eq($(this).parent().index()).html("不区分大小写，验证码不正确").css({
            color: ""
        });
        justOn = false;
    };
});