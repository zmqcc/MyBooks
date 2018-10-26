require.config({
    paths: {
        "jQuery.banner": "../../libs/jQuery.banner.1.0",
        "topBar":"topBar",
        "floor":"floor",
        "search":"search",
        "floor1":"floor1",
        "floor4_5_6_7":"floor4_5_6_7",
        "floor8":"floor8"
    },
    shim: {
        "search": {
            deps: ["jQuery.banner"]
        },
        "floor1": {
            deps: ["jQuery.banner"]
        }
    }
});

require(["floor4_5_6_7","topBar","floor","search","floor1","floor8"],function(tabBook){
    var arr = [
        ["#floor-4 h3 ol li","#floor-4 .box div.float-left article"],
        ["#floor-5 h3 ol li","#floor-5 .box div.float-left article"],
        ["#floor-6 h3 ol li","#floor-6 .box div.float-left article"],
        ["#floor-7 h3 ol li","#floor-7 .box div.float-left article"]
    ];
    for(var i = 0; i < arr.length; i ++){
        new tabBook(arr[i]);
    };
});