// 账号密码失去交点
$("p.user,p.pass").children("input").blur(function(){
    if($(this).val() != ""){
        $(this).siblings("u").hide();
    };
});

// 按钮
$("main>div p.btn input").click(function(){
    if(justOn){
        $.ajax({
            url:"http://datainfo.duapp.com/shopdata/userinfo.php",
            data:{
                status:"login",
                userID:$("p.user input").val(),
                password:$("p.pass input").val()
            },
            success:function(res){
                if(res == "0"){
                    $("section#display").show().html("用户名不存在");
                    setTimeout(()=>{
                        $("section#display").hide();
                    },1000);
                }else if(res == "2"){
                    $("section#display").show().html("用户名密码不符");
                    setTimeout(()=>{
                        $("section#display").hide();
                    },1000);
                }else{
                    $("section#display").show().html(`登录成功`);
                    res = JSON.parse(res);
                    var arr = [{"userID":res.userID}];
                    arr = JSON.stringify(arr);
                    cook.set("userStatus",arr,{
                        path:"/"
                    });
                    setTimeout(function(){
                        location.href = '../index.html';
                    },1000);
                };
            }
        });
    }else{
        $("section#display").show().html("验证码不正确");
        setTimeout(()=>{
            $("section#display").hide();
        },1000);
    };
});