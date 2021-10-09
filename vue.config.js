module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: config => {
    config.devtool = "source-map";
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: {
          quality: 90
      },
      optipng: {
          enabled: false
      },
      pngquant: {
          quality: [0.85, 0.9]
      },
      disable: false
      })
      .end();
  },
  //git测试
    //git测试1
    //git测试2
  //release
  devServer: {
    open: true, //自动打开浏览器
    proxy: {
      //只适用于开发环境
      "/api": {//告诉node只有/api开头的接口才用代理http://localhost:3000/api/1
        target: "http://localhost:3000/", //后端的接口地址
        changeOrigin: true, //开启本地虚拟服务器
        pathRewrite: {//去掉请求路径中的/api(真实路径中没有/api)http://localhost:3000/1
          "^/api": "", //这里即为重写后的地址，baseURL里的地址要换成这个
        },
      },
    },
  },
};
