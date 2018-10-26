define(function(){
    class clickDOM{
        constructor(){
            this.init();
        };
        init(){
            this.P_M();
            this.checkBox();
            this.allCheck();
            this.del();
            this.delAll();
            this.accounts();
            this.shopCount();
        };
        // +-按钮
        P_M(){
            var that = this;
            $("#list .car .listBody ul li.count").children("s,b").click(function(e){
                that.getCookie();
                // goodsId
                var id = $(this).parents("ul").find("img").attr("alt");
                // 商品数量
                var val = $(this).siblings("input").val() * 1;
                // 单价
                var sPrice = $(this).parent().prev().html().replace(/￥/g,"");
                // 小计
                var sSum = $(this).parent().next().html().replace(/￥/g,"");
                sSum *= 1;
                // 若为+按钮
                if(e.target.tagName == "S"){
                    val += 1;
                    that.searchGoods(id,function(index){
                        that.json[index].sum = parseInt(that.json[index].sum) + 1;
                        that.setCookie();
                    });
                }else{
                    // 若为-按钮
                    val -= 1;
                    if(val > 0){
                        // 商品数大于0
                        that.searchGoods(id,function(index){
                            that.json[index].sum = parseInt(that.json[index].sum) - 1;
                            that.setCookie();
                        });
                    }else{
                        // 商品数等于0
                        that.removeAll(id,$(this));
                    };
                };
                sSum = val * sPrice;
                $(this).siblings("input").val(val);
                $(this).parent().next().html("￥" + sSum.toFixed(1));
                that.count();
                that.shopCount();
            });
        };
        // 复选框
        checkBox(){
            var that = this;
            $("#list .car .listBody ul li:first-child input").click(function(){
                that.count();
                that.watchCheck();
            });
        };
        // 全选框
        allCheck(){
            var oInput = $("#list .car .listBody ul li:first-child input");
            var that = this;
            $(".allChecked").click(function(){
                if(this.checked){
                    oInput.prop("checked",true);
                    $(".allChecked").prop("checked",true);
                }else{
                    oInput.prop("checked",false);
                    $(".allChecked").prop("checked",false);
                };
                that.count();
            });
        };
        // 删除按钮
        del(){
            var that = this;
            this.getCookie();
            $("#list .car .listBody ul li:last-child em").click(function(){
                // goodsId
                var id = $(this).parents("ul").find("img").attr("alt");
                that.removeAll(id,$(this));
                that.count();
                that.shopCount();
            });
        };
        // 删除选中
        delAll(){
            var oInput = $("#list .car .listBody ul li:first-child input");
            var that = this;
            $("#list .car .listFoot li:nth-child(2) del").click(function(){
                for(var i = 0; i < oInput.length; i ++){
                    if(oInput[i].checked){
                        that.removeAll($(oInput[i]).parents("ul").find("img").attr("alt"),$(oInput[i]))
                    };
                };
                that.shopCount();
            });
        };
        // 结算跳转
        accounts(){
            var that = this;
            $("#list .car .listFoot li:last-child").click(function(){
                $("#loading").show();
                setTimeout(()=>{
                    alert("支付成功");
                    var oInput = $("#list .car .listBody ul li:first-child input");
                    for(var i = 0; i < oInput.length; i ++){
                        if(oInput[i].checked){
                            that.removeAll($(oInput[i]).parents("ul").find("img").attr("alt"),$(oInput[i]))
                        };
                    };
                    location.href="../index.html";
                },2000);
            });
        };
        // 判断是否全选
        watchCheck(){
            var oInput = $("#list .car .listBody ul li:first-child input");
            var onOff = 1;
            for(var i = 0; i < oInput.length; i ++){
                if(!oInput[i].checked){
                    onOff = 0;
                    break;
                };
            };
            if(onOff){
                $(".allChecked").prop("checked",true);
            }else{
                $(".allChecked").prop("checked",false);
            };
        };
        // 获取/设置cookie
        getCookie(){
            var json = cook.get("goodsAdd");
            this.json = JSON.parse(json);
        };
        setCookie(){
            var str = JSON.stringify(this.json);
            cook.set("goodsAdd",str,{
                path:"/"
            });
        };
        // 检索商品,满足条件的goods,this.json[i],执行函数
        searchGoods(id,cb){
            for(var i = 0; i < this.json.length; i ++){
                if(id == this.json[i].goodsId){
                    cb(i);
                };
            };
        };
        removeAll(id,ele){
            this.removeGoodsCookie(id);
            this.removeGoodsDOM(ele);
            this.watchCheck();
        };
        // 删除cookie中的商品
        removeGoodsCookie(id){
            var that = this;
            this.searchGoods(id,function(index){
                that.json.splice(index,1);
                if(that.json.length == 0){
                    cook.del("goodsAdd");
                }else{
                    that.setCookie();
                };
            });
        };
        // 删除DOM中的商品,ele为jQuery对象
        removeGoodsDOM(ele){
            ele.parents("ul").remove();
        };
        // 计算选中的商品
        count(){
            var oInput = $("#list .car .listBody ul li:first-child input");
            // 总价
            var str1 = 0;
            // 个数
            var str2 = 0;
            for(var i = 0; i < oInput.length; i ++){
                if(oInput[i].checked){
                    str1 += $(oInput[i]).parents("ul").children("li:nth-last-child(2)").html().replace(/￥/g,"") * 1;
                    str2 += $(oInput[i]).parents("ul").find("li.count input").val() * 1;
                };
            };
            $("#list .car .listFoot li i").html(str2);
            $("#list .car .listFoot li strong").html("￥" + str1.toFixed(1));
        };
        // 购物车连接显示个数
        shopCount(){
            var oInput = $("#list .car .listBody ul li:first-child input");
            var str = 0;
            for(var i = 0; i < oInput.length; i ++){
                str += $(oInput[i]).parents("ul").find("li.count input").val() * 1;
            };
            $(".top-bar-r ul>li:first-child i").html(str);
        };
    };
    new clickDOM();
});