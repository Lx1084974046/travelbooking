import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name == "homeScreen") {
    store.commit("titlechange", "首页");
  } else if (to.name == "dynamic") {
    store.commit("titlechange", "发现世界");
  } else if (to.name == "travel") {
    store.commit("titlechange", "行程安排");
  } else if (to.name == "me") {
    store.commit("titlechange", "个人中心");
  }
  next();
});

export default router;
