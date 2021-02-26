import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.prototype.axios = axios;  
Vue.config.productionTip = false;
//localStorage永久性存储电脑盘中，需手动删除(服务器重启会删除缓存)
//设置定时清除的缓存
Storage.prototype.setExpire=(key, value) =>{
  let obj={
      data:value,
      time:Date.now(),
      expire:300000    //设置过期时间
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
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
