require.config({
    baseUrl:"../index/js/",
    paths: {
        "jQuery.banner": "../../libs/jQuery.banner.1.0",
        "topBar":"topBar",
        "search":"search",
        "floor1":"floor1",
        "nav":"../../goodlist/js/nav",
        "display":"../../shopCar/js/display",
        "act":"../../shopCar/js/act",
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

require(["display","topBar","search","floor1","nav"],function(){
    require(["act"]);
});