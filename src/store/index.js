import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "",
    no_login: true,
    lo_gin: false,
    per_son: false,
    re_gister: false,
  },
  mutations: {
    titlechange(state, value) {
      state.title = value;
    },
    no_loginchange(state, value) {
      state.no_login = value;
    },
    lo_ginchange(state, value) {
      state.lo_gin = value;
    },
    per_sonchange(state, value) {
      state.per_son = value;
    },
    re_gisterchange(state, value) {
      state.re_gister = value;
    },
  },
  actions: {},
  modules: {},
});
