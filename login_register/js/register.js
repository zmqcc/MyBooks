var userReg = /^[a-z]\w{5,15}$/i;
var userOn;

// 用户名
// 针对一个个单按
$("p.user input").keyup(function(){
    if(userReg.test($(this).val())){
        $("p.pos u").eq($(this).parent().index()).html("用户名格式正确").css({
            color: "green"
        });
        userOn = true;
    }else{
        $("p.pos u").eq($(this).parent().index()).html("建议6-16位数字、大小写字母、下划线组合，首位必须是字母").css({
            color: ""
        });
        userOn = false;
    };
});

var passReg = /^\w{6,16}$/;
var passReg1 = /\d/;
var passReg2 = /_/;
var passReg3 = /[a-z]/i;
var passOn;
var rPassOn;
var rPass = "";

// 密码
// 针对一个个单按
$("p.pass input").keyup(function(){
    var a = b = c = 0;
    if(passReg1.test($(this).val())){a = 1;};
    if(passReg2.test($(this).val())){b = 1;};
    if(passReg3.test($(this).val())){c = 1;};
    var sum = a + b + c;
    if(passReg.test($(this).val())){
        passOn = true;
        if(sum == 1){
            $("p.pos u").eq($(this).parent().index()).html("简单").css({
                color: "red"
            });
        }else if(sum == 2){
            $("p.pos u").eq($(this).parent().index()).html("适中").css({
                color: "orange"
            });
        }else if(sum == 3){
            $("p.pos u").eq($(this).parent().index()).html("困难").css({
                color: "green"
            });
        };
    }else{
        $("p.pos u").eq($(this).parent().index()).html("建议6-16位数字、大小写字母、下划线组合").css({
            color: ""
        });
        passOn = false;
    };
});

$("p.pass input").blur(function(){
    rPass = $(this).val();
    if($("p.rPass input").val() === rPass && rPass !== ""){
        $("p.pos u").eq($("p.rPass input").parent().index()).html("密码一致").css({
            color: "green"
        });
        rPassOn = true;
    }else{
        $("p.pos u").eq($("p.rPass input").parent().index()).html("密码不一致").css({
            color: ""
        });
        rPassOn = false;
    };
});

// 二次密码
$("p.rPass input").keyup(function(){
    if($(this).val() === rPass){
        $("p.pos u").eq($(this).parent().index()).html("密码一致").css({
            color: "green"
        });
        rPassOn = true;
    }else{
        $("p.pos u").eq($(this).parent().index()).html("密码不一致").css({
            color: ""
        });
        rPassOn = false;
    };
});

// 按钮
$("main>div p.btn input").click(function(){
    var btnJust = userOn && passOn && rPassOn && justOn;
    if(btnJust){
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/userinfo.php",
            data:{
                status:"register",
                userID:$("p.user input").val(),
                password:$("p.pass input").val()
            },
            success:function(res){
                if(res == "0"){
                    $("section#display").show().html("用户名重名");
                    setTimeout(()=>{
                        $("section#display").hide();
                    },1000);
                }else if(res == "2"){
                    $("section#display").show().html("网络故障，连接失败");
                    setTimeout(()=>{
                        $("section#display").hide();
                    },1000);
                }else{
                    $("section#display").show().html(`注册成功，正在跳转登录，3s...`);
                    var n = 2;
                    var timer = setInterval(function(){
                        $("section#display").html(`注册成功，正在跳转登录，${n}s...`);
                        if(n > 0){
                            n --;
                        }else{
                            clearInterval(timer);
                            location.href = 'login.html';
                        };
                    },1000);
                };
            }
        });
    }else{
        $("section#display").show().html("请按要求格式注册");
        setTimeout(()=>{
            $("section#display").hide();
        },1000);
    };
});