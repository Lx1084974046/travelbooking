module.exports = {
    base64Img : (path) => {            //图片转换base64  , 异步处理
        function getBase64Image(image) {               		//转码格式方法
            //图片压缩
            let canvas = document.createElement("canvas"),
            context = canvas.getContext("2d"),
            imageWidth = image.width / 2, //压缩后图片的大小
            imageHeight = image.height / 2,
            data = "";
            canvas.width = imageWidth;
            canvas.height = imageHeight;
            context.drawImage(image, 0, 0, imageWidth, imageHeight);
            data = canvas.toDataURL("image/jpeg");
            return data;
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
