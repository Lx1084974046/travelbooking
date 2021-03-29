import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path.search("home") != -1) {     //导航top显示
    store.commit("titlechange", "首页");
  } else if (to.path.search("dynamic") != -1) {
    store.commit("titlechange", "发现世界");
  } else if (to.path.search("travel") != -1) {
    store.commit("titlechange", "行程安排");
  } else if (to.path.search("me") != -1) {
    store.commit("titlechange", "个人中心");
  }
  next();
  if(from.path.search("home") != -1){
    store.commit("bookshowchange", false);
  }else if(from.path.search("me") != -1){
    store.commit("updateshowchange", false);
  }
  next();
  // if(to.name == 'nologin'){    //路由匹配
  //   store.commit('no_loginchange',true)
  //   if(store.state.lo_gin){
  //     next('/userHome/me/login');
  //   }else if(store.state.re_gister){
  //     next('/userHome/me/person')
  //     // window.location.href = 'http://localhost:8080/#/userHome/me/person'   //两种方式均可跳转
  //   }
  // }
  // next();
  // if(to.name == 'login'){
  //   store.commit('lo_ginchange',true)
  // }
  //   else if(to.name == 'register'){
  //     store.commit('re_gisterchange',true)
  //   }
  //   next();
});

// beforeRouteUpate((to,from,next) =>{
//   if(to.name == 'login'){
//     store.commit('lo_ginchange',true)
//   }
//     else if(to.name == 'register'){
//       store.commit('re_gisterchange',false)
//     }
//     next();
// });

export default router;
