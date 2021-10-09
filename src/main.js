import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import moment from "moment";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import './mock'

Vue.use(ElementUI);
Vue.prototype.axios = axios;  
Vue.config.productionTip = false;
//localStorage永久性存储电脑盘中，需手动删除(服务器重启会删除缓存)
//设置定时清除的缓存
Storage.prototype.setExpire=(key, value) =>{
  let obj={
      data:value,
      time:Date.now(),
      expire:6000000    //设置过期时间ms
  };
  localStorage.setItem(key,JSON.stringify(obj));
}
//获取的时候判断是否过期，如果过期再去清除该项。
Storage.prototype.getExpire= key =>{
  let val =localStorage.getItem(key);
  if(!val){
      return val;
  }
  val =JSON.parse(val);
  if(Date.now()-val.time>val.expire){
      localStorage.removeItem(key);
      return null;
  }
  return val.data;
}
// 定义时间格式全局过滤器   ***YYYY-MM-DD HH:mm:ss
Vue.filter("dateFormat", function(daraStr, pattern = "YYYY-MM-DD") {
  return moment(daraStr).format(pattern);
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
