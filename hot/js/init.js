require.config({
    baseUrl:"../index/js/",
    paths: {
        "jQuery.banner": "../../libs/jQuery.banner.1.0",
        "topBar":"topBar",
        "search":"search",
    },
    shim: {
        "search": {
            deps: ["jQuery.banner"]
        }
    }
});

require(["topBar","search"]);