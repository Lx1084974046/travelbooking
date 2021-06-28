module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: config => {
    config.devtool = "source-map";
  },
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         require("postcss-px-to-viewport")({
  //           unitToConvert: "px", // 需要转换的单位，默认为"px"
  //           viewportHeight: 736,
  //           viewportWidth: 414, //  设计稿的视口宽度
  //           unitPrecision: 5, // 单位转换后保留的精度
  //           propList: ["*"], // 能转化为vw的属性列表
  //           viewportUnit: "vw", //  希望使用的视口单位
  //           fontViewportUnit: "vw", // 字体使用的视口单位
  //           selectorBlackList: ["ignore", "tab-bar", "tab-bar-item"], // 需要忽略的CSS选择器
  //           minPixelValue: 1, // 最小的转换数值，如果为1的话，只有大于1的值会被转换
  //           mediaQuery: true, // 媒体查询里的单位是否需要转换单位
  //           replace: true, // 是否直接更换属性值，而不添加备用属性
  //           exclude: /(\/node_modules\/)|(\/src\/adminComponents\/)|(\/src\/adminView\/)/g, // 忽略某些文件夹下的文件或特定文件
  //           include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件 (include: /\/src\/mobile\//)
  //           landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
  //           landscapeUnit: "vw", // 横屏时使用的单位
  //         }),
  //       ],
  //     },
  //   },
  // },

  //git测试
<<<<<<< HEAD
    //git测试1
    //git测试2
=======
  //release
>>>>>>> release
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
