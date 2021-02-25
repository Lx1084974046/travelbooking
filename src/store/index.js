import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "",
    nologin: false,
    login: false,
    person: false,
    register: false,
    dialogshow: false,
    dialogtitle: '',
    dialogcontent: '',
    dialogbutton: ''
  },
  mutations: {
    titlechange(state, value) {
      state.title = value;
    },
    nologinchange(state, value) {
      state.nologin = value;
    },
    loginchange(state, value) {
      state.login = value;
    },
    personchange(state, value) {
      state.person = value;
    },
    registerchange(state, value) {
      state.register = value;
    },
    dialogshowchange(state,value){
      state.dialogshow = value
    },
    dialogtitlechange(state,value){
      state.dialogtitle = value
    },
    dialogcontentchange(state,value){
      state.dialogcontent = value
    },
    dialogbuttonchange(state,value){
      state.dialogbutton = value
    }
  },
  actions: {},
  modules: {},
});
