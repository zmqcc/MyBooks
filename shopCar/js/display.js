define(function(){
    class display{
        constructor(options){
            this.body = options.body;
            this.showNum = options.showNum;
            this.showSum = options.showSum;
            this.init();
        };
        init(){
            this.getCookie();
            this.getData();
        };
        getCookie(){
            var json = cook.get("goodsAdd");
            this.json = JSON.parse(json);
        };
        getData(){
            var that = this;
            $.ajax({
                url:"../json/details.json",
                dataType:"json",
                success:function(res){
                    that.res = res;
                    that.displayList();
                }
            });
        };
        displayList(){
            var str = "";
            var num = 0, sum = 0;
            if(this.json){
                for(var i = 0; i < this.json.length; i ++){
                    for(var j = 0; j < this.res.length; j ++){
                        if(this.json[i].goodsId == this.res[j].goodsId){
                            num += this.json[i].sum * 1;
                            sum += (this.res[j].price * this.json[i].sum).toFixed(1) * 1;
                            str += `<ul>
                            <li><input type="checkbox" checked="checked">选择</li>
                            <li><img src="../details/${this.res[j].sSrc}" alt="${this.res[j].goodsId}"></li>
                            <li><a href="../details/details.html" title="${this.res[j].name}">${this.res[j].name}</a></li>
                            <li><del>￥${this.res[j].oldPrice}</del></li>
                            <li>￥${this.res[j].price}</li>
                            <li class="count">
                                <b>-</b>
                                <input type="text" value="${this.json[i].sum}" disabled="disabled">
                                <s>+</s>
                            </li>
                            <li>￥${(this.res[j].price * this.json[i].sum).toFixed(1)}</li>
                            <li>
                                <em>删除</em>
                            </li>
                        </ul>`;
                        };
                    };
                };
                this.body.html(str);
                this.showNum.html(num);
                this.showSum.html("￥" + sum.toFixed(1));
            };
        };
    };
    new display({
        body:$("#list .car .listBody"),
        showNum:$("#list .car .listFoot li i"),
        showSum:$("#list .car .listFoot li strong")
    });
});