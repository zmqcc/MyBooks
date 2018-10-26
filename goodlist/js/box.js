define(function(){
    class list{
        constructor(options){
            this.box = options.box;
            this.topPages = {};
            this.topPages.now = options.pagination.topPages.now;
            this.topPages.sum = options.pagination.topPages.sum;
            this.bottomPages = options.pagination.bottomPages;
            this.prev = options.pagination.prev;
            this.next = options.pagination.next;
            this.index = 0;
            this.count = 10;
            this.init();
        };
        
        init(){
            this.require();
        };
        
        // 请求数据
        require(){
            var that = this;
            $.ajax({
                url:"../json/goods.json",
                type:"get",
                dataType:"json",
                success:function(res){
                    that.res = res;
                    that.displayAll();
                    that.click();
                }
            });
        };

        displayAll(){
            this.displayGoods();
            this.displayPages();
        };

        // 渲染商品
        displayGoods(){
            var str = "";
            for(var i = this.count * this.index; i < this.count * (this.index + 1); i ++){
                if(this.res[i]){
                    str += `<li>
                                <a href="../details/details.html">
                                    <img src="${this.res[i].src}" alt="${this.res[i].goodsId}">
                                </a>
                                <p class="clear">
                                    <span class="float-left">${this.res[i].price}</span>
                                    <b class="float-left">(${this.res[i].discount}折)</b>
                                    <del class="float-right">${this.res[i].oldPrice}</del>
                                </p>
                                <h5><a href="../details/details.html">${this.res[i].name}</a></h5>
                                <h6>${this.res[i].writer}/${this.res[i].publisher}</h6>
                                <p class="discount">`
        
                    var arr = this.res[i].discountClass;
                    arr = arr.split(",")
                    for(var j = 0; j < arr.length; j ++){
                        switch(arr[j]){
                            case "1": str +=`<a href="../details/details.html" class="disClass1">折上9折</a>`; break;
                            case "2": str +=`<a href="../details/details.html" class="disClass2">折上8折</a>`; break;
                            case "3": str +=`<a href="../details/details.html" class="disClass3">折上7折</a>`; break;
                        };
                        
                    };
        
                    str += `</p>
                                <p>
                                    <em>加入购物车</em>
                                </p>
                            </li>`;
                }else{
                    break;
                };
            };
            this.box.html(str);
        };

        // 渲染页数
        displayPages(){
            this.maxPages = Math.ceil(this.res.length / this.count);
            this.displayTopPages();
            this.displayBottomPages();
        };
        
        displayTopPages(){
            this.topPages.now.html(this.index + 1);
            this.topPages.sum.html(this.maxPages);
        };

        displayBottomPages(){
            var str = "";
            for(var i = 0; i < this.maxPages; i ++){
                if(i == this.index){
                    str += `<span class="te">${i + 1}</span>`;
                }else{
                    str += `<span>${i + 1}</span>`;
                };
            };
            this.bottomPages.html(str);
        };

        // 点击事件
        click(){
            var that = this;
            this.prev.click(function(){
                if(that.index > 0){
                    that.index --;
                    that.displayAll();
                };
            });
            
            this.next.click(function(){
                if(that.index < that.maxPages - 1){
                    that.index ++;
                    that.displayAll();
                };
            });

            this.bottomPages.on("click","span",function(){
                that.index = $(this).html() - 1;
                that.displayAll();
            });
        };
    };

    new list({
        box:$("main .box"),
        pagination:{
            topPages:{
                now:$("#list .title p span i"),
                sum:$("#list .title p span s")
            },
            bottomPages:$("#list .pagination p"),
            prev:$("#list .pagination .prev,#list .title p .prev"),
            next:$("#list .pagination .next,#list .title p .next")
        }
    });
});