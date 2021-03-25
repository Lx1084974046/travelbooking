import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "",
    dialogshow: false,
    dialogtitle: '',
    dialogcontent: '',
    dialogbutton: '',
    returns: false,
    updateshow: false,
    returnlogo: false,
    queryshow:false,
    bookshow: false

  },
  mutations: {
    titlechange(state, value) {
      state.title = value;
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
    },
    dialogreturnsbuttonchange(state,value){
      state.returns = value
    },
    updateshowchange(state, value) {
      state.updateshow = value;
    },
    returnlogochange(state, value) {
      state.returnlogo = value;
    },
    queryshowchange(state,value){
      state.queryshow = value
    },
    bookshowchange(state,value){
      state.bookshow = value
    }
  },
  actions: {},
  modules: {},
});
