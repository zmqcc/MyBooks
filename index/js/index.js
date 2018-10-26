require.config({
    paths: {
        "jquery": "../../libs/jquery",
        "cookie": "../../libs/cookie",
        "init":"init"
    },
    shim: {
        "init": {
            deps: ["jquery"]
        }
    }
});

require(["jquery","cookie","init"]);