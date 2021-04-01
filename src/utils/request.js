import axios from "axios";
const instance = axios.create({
    // 创建axios实例，在这里可以设置请求的默认配置  创建一个新的axios实例
  timeout: 30000, // 设置超时时间10s
  baseURL: "/api",
})
// 文档统一设置post请求头。(post请求一般才需要设置)
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

  /** 添加请求拦截器 **/
instance.interceptors.request.use(
    config => {
      if (config.method === "get") {
        // 添加时间戳参数，防止浏览器（IE）对get请求的缓存
        config.params = {
          ...config.params,
          t: new Date().getTime()
        };
      }
      return config;
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  //统一封装get请求
  export const get = (url,params) => {
      return new Promise((resolve,reject) => {
        instance({
            method:"get",
            url,
            params
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
      })
  }

  //统一封装post请求
  export const post = (url,data) => {
    return new Promise((resolve,reject) => {
        instance({
            method:"post",
            url,
            data
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
      })
  }

    //统一封装put请求
    export const put = (url,data) => {
        return new Promise((resolve,reject) => {
            instance({
                method:"put",
                url,
                data
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
          })
      }

      //统一封装delete请求
  export const deletes = (url,data) => {
    return new Promise((resolve,reject) => {
        instance({
            method:"delete",
            url,
            data
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
      })
  }