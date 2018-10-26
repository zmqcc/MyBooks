//	cookie的相关对象方法
var cook = {
//	设置cookie
	"set":function(key, value, options){
		if(options){
			var time = options.time;
			var path = options.path ? options.path : "";
		}
		var d = new Date();
		d.setDate(d.getDate() + time);
		document.cookie = key + "=" + value + ";expires=" + d + ";path=" + path;
	},

//	得到cookie
	"get":function(key){
		var arr = document.cookie.split("; ");
		var val = null;
		for(var i = 0; i < arr.length; i++){
			if(arr[i].split("=")[0] === key){
				val = arr[i].split("=")[1];
				break;
			};
		};
		return val;
	},

//	删除cookie
	"del":function(key){
		cook.set(key,1,{
			time:-1,
			path:"/"
		});
	},
};