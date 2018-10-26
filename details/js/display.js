define(function(){
    class show{
        constructor(options){
            this.smallImg = options.smallImg;
            this.bigImg = options.bigImg;
            this.hotList = options.hotList;
            this.showBox = options.showBox;
            this.init();
        };
        init(){
            this.getCookie();
            this.getData();
        };
        getCookie(){
            this.id = cook.get("goodsID");
        };
        getData(){
            var that = this;
            $.ajax({
                url:"../json/details.json",
                dataType:"json",
                success:function(res){
                    that.res = res;
                    that.searchData();
                    that.displayAll();
                }
            });
        };
        searchData(){
            for(var i = 0; i < this.res.length; i ++){
                if(this.id == this.res[i].goodsId){
                    this.index = i;
                };
            };
        };
        displayAll(){
            this.displayImg();
            this.displayDetails();
            this.displayHotList();
        };
        displayImg(){
            this.smallImg.attr({
                src:this.res[this.index].sSrc,
                alt:this.res[this.index].goodsId
            });
            this.bigImg.attr({
                src:this.res[this.index].bSrc,
                alt:this.res[this.index].goodsId
            });
        };
        displayDetails(){
            var str = `<h3>${this.res[this.index].name}</h3>
            <h4>作者：${this.res[this.index].writer}</h4>
            <h5>
                <span>出版社：${this.res[this.index].publisher}</span>
                <b>出版时间：${this.res[this.index].time}</b>
            </h5>
            <p>所属丛书：${this.res[this.index].attach}</p>
            <p>
                <span>开本：${this.res[this.index].book}</span>
                <b>页数：${this.res[this.index].pages}</b>
            </p>
            <p>
                <span>读者评分：</span>
                <b>${this.res[this.index].score}</b>
            </p>
            <p>
                <span>排名：${this.res[this.index].rankFrom}</span>
                <b>第${this.res[this.index].ranking}位</b>
            </p>
            <h6>
                中图价：<span>￥${this.res[this.index].price}</span>
                <b>(${this.res[this.index].discount}折)</b>
                定价：<del>￥${this.res[this.index].oldPrice}</del>
            </h6>
            <p>
                <em>加入购物车</em>
                <span>免运费政策</span>
            </p>
            <u>北京满49元免运费<br>全国满69元免运费（港澳台除外）</u>`
            this.showBox.html(str);
        };
        displayHotList(){
            var str = "";
            for(var i = 0; i < 5; i ++){
                if(i == 0){
                    str += `<li class="te">`
                }else{
                    str += `<li>`
                };
                str += `<a href="details.html">
                            <img src="images/small${this.res[i].goodsId}.jpg" alt="${this.res[i].goodsId}">
                            <div>
                                <p>${this.res[i].name}</p>
                                <p>
                                    <b>￥${this.res[i].price}</b>
                                    <del>￥${this.res[i].oldPrice}</del>
                                </p>
                            </div>
                            <s>></s>
                        </a>
                </li>`;
            };
            this.hotList.html(str);
        };
    };
    new show({
        smallImg:$("#list .box .img>p img,#list .box .img ul li img"),
        bigImg:$("#list .box .img .img-box p img"),
        hotList:$("#list .box .hot ul"),
        showBox:$("#list .box .show")
    });
});