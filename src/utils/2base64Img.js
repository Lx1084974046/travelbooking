module.exports = {
    base64Img : (path) => {            //图片转换base64  , 异步处理
        function getBase64Image(img) {               		//转码格式方法
           var canvas = document.createElement("canvas"); 	// 创建一个canvas
            canvas.width = img.width;               		// 设置对应的宽高
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");      		// 二维绘图环境
            ctx.drawImage(img, 0, 0, img.width, img.height);                            // 将图片画在画布上
            var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();    // 获取到图片的格式
            var dataURL = canvas.toDataURL("image/" + ext);                             // 得到base64 编码的 dataURL 
            return dataURL; 
        }
        return new Promise(function(resolve, reject) {      //使用Promise进行异步处理
            let image = new Image();
                 //解决图片跨域问题
            image.crossOrigin = '';
                //获取传入的图片路径
            image.src = path;
                //图片加载完后的回调函数,调用转码函数
            image.onload = function(){ 
                resolve(getBase64Image(image))   	//回调函数返回base64值
            }    
        })  
      }
}
